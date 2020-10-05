export interface BridgeSubscribeParams {
  topic: string;
  ttl: number;
}

export interface BridgePublishParams {
  topic: string;
  payload: string;
  ttl: number;
}

export interface BridgeSubscriptionParams {
  topic: string;
  payload: string;
}
