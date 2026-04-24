import * as OneSignal from 'onesignal-node';

const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID || '';
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_REST_API_KEY || '';

const client = new OneSignal.Client(ONESIGNAL_APP_ID, ONESIGNAL_API_KEY);

/**
 * Sends a Push Notification to all subscribed users
 */
export async function sendPushNotification(title: string, message: string, url?: string) {
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.warn("OneSignal credentials missing. Skipping notification.");
    return;
  }

  const notification = {
    contents: {
      'en': message,
      'te': message, // Telugu fallback
    },
    headings: {
      'en': title,
      'te': title,
    },
    url: url || process.env.NEXT_PUBLIC_BASE_URL,
    included_segments: ['All'],
  };

  try {
    const response = await client.createNotification(notification);
    console.log("Push Notification Sent Successfully:", response.body);
    return response;
  } catch (error) {
    console.error("OneSignal Notification Failed:", error);
    throw error;
  }
}
