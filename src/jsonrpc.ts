import { INVALID_REQUEST, METHOD_NOT_FOUND, PARSE_ERROR } from "rpc-json-utils";

import { pushNotification } from "./notification";
import { setSub, getSub, setPub, getPub } from "./keystore";
import {
  JsonRpcRequest,
  Subscription,
  Socket,
  SocketData,
  Logger,
  JsonRpcResult,
  JsonRpcError,
  JsonRpcMiddleware,
} from "./types";
import {
  formatJsonRpcError,
  formatJsonRpcRequest,
  formatJsonRpcResult,
  getError,
  isJsonRpcRequest,
  isBridgePublish,
  parseBridgePublish,
  parseBridgeSubscribe,
  payloadId,
} from "./utils";

async function socketSend(
  socket: Socket,
  request: JsonRpcRequest | JsonRpcResult | JsonRpcError,
  logger: Logger
) {
  if (socket.readyState === 1) {
    const message = JSON.stringify(request);
    socket.send(message);
    logger.info({ type: "outgoing", message });
  } else {
    if (isJsonRpcRequest(request)) {
      const params = request.params;
      if (isBridgePublish(params)) {
        await setPub(params);
      }
    }
  }
}

async function handleSubscribe(
  socket: Socket,
  request: JsonRpcRequest,
  logger: Logger
) {
  const params = parseBridgeSubscribe(request);
  const topic = params.topic;

  const subscriber = { topic, socket };

  await setSub(subscriber);

  const pending = await getPub(topic);

  if (pending && pending.length) {
    await Promise.all(
      pending.map((payload: string) =>
        socketSend(
          socket,
          formatJsonRpcRequest("bridge_subscription", { topic, payload }),
          logger
        )
      )
    );
  }
}

async function handlePublish(
  socket: Socket,
  request: JsonRpcRequest,
  logger: Logger
) {
  const params = parseBridgePublish(request);
  const subscribers = await getSub(params.topic);

  // TODO: assume all payloads are non-silent for now
  await pushNotification(params.topic);

  if (subscribers.length) {
    await Promise.all(
      subscribers.map((subscriber: Subscription) =>
        socketSend(subscriber.socket, request, logger)
      )
    );
  } else {
    await setPub(params);
  }

  socketSend(socket, formatJsonRpcResult(request.id, true), logger);
}

async function jsonRpcServer(
  socket: Socket,
  data: SocketData,
  logger: Logger,
  middleware?: JsonRpcMiddleware
): Promise<void> {
  const message = String(data);

  if (!message || !message.trim()) {
    socketSend(
      socket,
      formatJsonRpcError(payloadId(), getError(INVALID_REQUEST)),
      logger
    );
    return;
  }

  logger.info({ type: "incoming", message });

  try {
    let request: JsonRpcRequest | undefined;

    try {
      request = JSON.parse(message);
    } catch (e) {
      // do nothing
    }

    if (typeof request === "undefined") {
      socketSend(
        socket,
        formatJsonRpcError(payloadId(), getError(PARSE_ERROR)),
        logger
      );
      return;
    }

    if (middleware) {
      middleware(request);
    }

    switch (request.method) {
      case "bridge_subscribe":
        await handleSubscribe(socket, request, logger);
        break;
      case "bridge_publish":
        await handlePublish(socket, request, logger);
        break;
      default:
        socketSend(
          socket,
          formatJsonRpcError(payloadId(), getError(METHOD_NOT_FOUND)),
          logger
        );
        return;
    }
  } catch (e) {
    console.error(e);
    socketSend(socket, formatJsonRpcError(payloadId(), e.message), logger);
  }
}

export default jsonRpcServer;
