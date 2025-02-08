const connectToSocket = (callback) => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  
    return socket;
  };
  
  export { connectToSocket };