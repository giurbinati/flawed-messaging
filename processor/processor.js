const redis = require('redis');
const { sendNotificationToExternalService } = require('./mockApi');
const { retryWithBackoff, circuitBreaker } = require('./utils');

const queue = redis.createClient();

// Logica di elaborazione della notifica
const processNotification = async (notification) => {
  try {
    await sendNotificationToExternalService(notification);
    console.log('Notification sent:', notification);
  } catch (err) {
    console.error('Failed to send notification:', err);
    throw err;
  }
};

const startProcessing = () => {
  queue.on('message', async (channel, message) => {
    const notification = JSON.parse(message);

    const result = await retryWithBackoff(() => processNotification(notification));
    if (result.error) {
      circuitBreaker.notifyFailure();
    }
  });

  queue.subscribe('notificationsQueue');
};

module.exports = { startProcessing };