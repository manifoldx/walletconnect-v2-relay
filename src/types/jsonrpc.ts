import * as rpcJsonUtils from "rpc-json-utils";

export type JsonRpcRequest = rpcJsonUtils.JsonRpcRequest;

export type JsonRpcResult = rpcJsonUtils.JsonRpcResult;

export type JsonRpcError = rpcJsonUtils.JsonRpcError;

export type ErrorResponse = rpcJsonUtils.ErrorResponse;

export type JsonRpcMiddleware = (
  request: JsonRpcRequest,
  cb?: any
) => Promise<void>;
