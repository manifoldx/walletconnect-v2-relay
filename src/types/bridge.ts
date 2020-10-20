export interface BridgeSubscribeParams {
  topic: string;
  ttl: number;
}

export interface BridgePublishParams {
  topic: string;
  data: string;
  ttl: number;
}

export interface BridgeSubscriptionParams {
  topic: string;
  data: string;
}
