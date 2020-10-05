import axios from "axios";

import { getNotification } from "./keystore";
import { JsonRpcRequest, Notification } from "./types";
import { parseBridgePublish } from "./utils";

export const pushNotification = async (topic: string) => {
  const notifications = await getNotification(topic);

  if (notifications && notifications.length) {
    notifications.forEach((notification: Notification) =>
      axios.post(notification.webhook, { topic })
    );
  }
};

export const notificationMiddleware = async (
  request: JsonRpcRequest,
  cb?: any
): Promise<void> => {
  if (request.method === "bridge_publish") {
    const params = parseBridgePublish(request);
    await pushNotification(params.topic);
  }
  cb(request);
};
