const redis = require('redis');

let queueClient;

const connectToQueue = async () => {
  queueClient = redis.createClient({ host: 'http://localhost:3000' });
  queueClient.on('connect', () => {
    console.log('Connected to Redis queue');
  });
};

module.exports = { connectToQueue };