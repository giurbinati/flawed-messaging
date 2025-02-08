const redis = require('redis');
const { sendNotificationToExternalService } = require('./mockApi'); // Funzione per inviare la notifica al mock-api
const { retryWithBackoff, circuitBreaker } = require('./utils'); // Utilità per retry e circuit breaker

const queue = redis.createClient(); // Crea client Redis

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

// Funzione che avvia il loop per processare le notifiche
const startProcessing = () => {
  queue.on('message', async (channel, message) => {
    const notification = JSON.parse(message);

    // Retry con backoff esponenziale e gestione del circuito
    const result = await retryWithBackoff(() => processNotification(notification));
    if (result.error) {
      circuitBreaker.notifyFailure();
    }
  });

  queue.subscribe('notificationsQueue'); // Si iscrive alla coda Redis
};

module.exports = { startProcessing };