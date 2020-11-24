import { JsonRpcRequest } from "rpc-json-utils";
import { RelayPublishParams, RelaySubscribeParams } from "../types";
import { assertType } from "./misc";

export function parseRelaySubscribe(
  request: JsonRpcRequest
): RelaySubscribeParams {
  const params = request.params as RelaySubscribeParams;

  assertType(params, "topic");
  assertType(params, "ttl");

  return params;
}

export function parseRelayPublish(
  request: JsonRpcRequest
): RelayPublishParams {
  const params = request.params as RelayPublishParams;

  assertType(params, "topic");
  assertType(params, "message");
  assertType(params, "ttl");

  return params;
}
