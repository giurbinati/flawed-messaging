import React, { useState, useEffect } from 'react';
import NotificationsTable from './components/NotificationsTable';
import { connectToSocket } from './utils/socket';

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = connectToSocket((data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Notification Dashboard</h1>
      <NotificationsTable notifications={notifications} />
    </div>
  );
}

export default App;