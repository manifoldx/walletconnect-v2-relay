import {
  JsonRpcError,
  JsonRpcRequest,
  JsonRpcResult,
  WakuPublishParams,
  WakuSubscriptionParams,
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

export function isWakuPublish(params: any): params is WakuPublishParams {
  return "payload" in params && "topic" in params && "ttl" in params;
}
