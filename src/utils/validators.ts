import {
  JsonRpcError,
  JsonRpcRequest,
  JsonRpcResult,
  BridgePublishParams,
  BridgeSubscribeParams,
} from "../types";

export function isJsonRpcRequest(
  payload: JsonRpcRequest | JsonRpcResult | JsonRpcError
): payload is JsonRpcRequest {
  return "method" in payload;
}

export function isJsonRpcResult(
  payload: JsonRpcRequest | JsonRpcResult | JsonRpcError
): payload is JsonRpcResult {
  return "result" in payload;
}

export function isJsonRpcError(
  payload: JsonRpcRequest | JsonRpcResult | JsonRpcError
): payload is JsonRpcError {
  return "error" in payload;
}

export function isBridgePublish(params: any): params is BridgePublishParams {
  return "payload" in params && "topic" in params && "ttl" in params;
}

export function isBridgeSubscribe(params: any): params is BridgeSubscribeParams {
  return "topic" in params && "ttl" in params;
}
