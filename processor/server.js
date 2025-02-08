const processor = require('./processor');
const { connectToQueue } = require('./queue');

const startProcessor = async () => {
  await connectToQueue();
  processor.startProcessing();
};

startProcessor().catch((err) => console.error('Error starting processor:', err));