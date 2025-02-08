const redis = require('redis');

let queueClient;

const connectToQueue = async () => {
  queueClient = redis.createClient({ host: 'localhost' }); // Connessione a Redis (configura se necessario)
  queueClient.on('connect', () => {
    console.log('Connected to Redis queue');
  });
};

module.exports = { connectToQueue };