import {
  JsonRpcRequest,
  WakuPublishParams,
  WakuSubscribeParams,
} from "../types";
import { assertType } from "./misc";

export function parseWakuSubscribe(
  request: JsonRpcRequest
): WakuSubscribeParams {
  const params = request.params as WakuSubscribeParams;

  assertType(params, "topic");
  assertType(params, "ttl");

  return params;
}

export function parseWakuPublish(request: JsonRpcRequest): WakuPublishParams {
  const params = request.params as WakuPublishParams;

  assertType(params, "topic");
  assertType(params, "payload");
  assertType(params, "ttl");

  return params;
}
