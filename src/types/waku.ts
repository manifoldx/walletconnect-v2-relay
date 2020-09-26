export interface WakuSubscribeParams {
  topic: string;
  ttl: number;
}

export interface WakuPublishParams {
  topic: string;
  payload: string;
  ttl: number;
}

export interface WakuSubscriptionParams {
  topic: string;
  payload: string;
}
