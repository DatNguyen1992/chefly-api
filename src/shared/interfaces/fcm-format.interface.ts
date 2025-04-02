import {
  AndroidConfig,
  ApnsConfig,
  DataMessagePayload,
  FcmOptions,
  NotificationMessagePayload,
  WebpushConfig,
} from 'firebase-admin/messaging';

export interface FCMMessageFormat {
  data?: DataMessagePayload;
  notification?: NotificationMessagePayload;
  token?: string;
  tokens?: string[];
  android?: AndroidConfig;
  apns?: ApnsConfig;
  webpush?: WebpushConfig;
  fcm_options?: FcmOptions;
}
