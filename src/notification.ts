import axios from "axios";
import { JsonRpcRequest } from "rpc-json-utils";

import { getNotification } from "./keystore";
import { Notification } from "./types";
import { parseRelayPublish } from "./utils";

export const pushNotification = async (topic: string) => {
  const notifications = await getNotification(topic);

  if (notifications && notifications.length) {
    notifications.forEach((notification: Notification) =>
      axios.post(notification.webhook, { topic })
    );
  }
};

export const notificationMiddleware = async (
  request: JsonRpcRequest,
  cb?: any
): Promise<void> => {
  if (request.method === "relay_publish") {
    const params = parseRelayPublish(request);
    await pushNotification(params.topic);
  }
  cb(request);
};
