const redis = require('redis');

let queueClient;

const connectToQueue = async () => {
  queueClient = redis.createClient({ host: 'redis', port: 6379 });
  queueClient.on('connect', () => {
    console.log('Connected to Redis queue');
  });
};

module.exports = { connectToQueue };