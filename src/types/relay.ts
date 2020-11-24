export interface RelaySubscribeParams {
  topic: string;
  ttl: number;
}

export interface RelayPublishParams {
  topic: string;
  message: string;
  ttl: number;
}

export interface RelaySubscriptionParams {
  topic: string;
  message: string;
}

export interface RelayUnsubscribeParams {
  topic: string;
}
