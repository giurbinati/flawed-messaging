const processor = require('./processor'); // La logica di elaborazione
const { connectToQueue } = require('./queue'); // Connessione a Redis (coda)

const startProcessor = async () => {
  await connectToQueue();
  processor.startProcessing(); // Avvia la logica di elaborazione
};

startProcessor().catch((err) => console.error('Error starting processor:', err));