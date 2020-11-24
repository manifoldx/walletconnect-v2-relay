import { RelayPublishParams, RelaySubscribeParams } from "../types";

export function isRelayPublish(params: any): params is RelayPublishParams {
  return "message" in params && "topic" in params && "ttl" in params;
}

export function isRelaySubscribe(
  params: any
): params is RelaySubscribeParams {
  return "topic" in params && "ttl" in params;
}
