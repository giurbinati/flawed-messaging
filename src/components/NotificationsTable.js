import React from 'react';

const NotificationsTable = ({ notifications }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Recipient</th>
          <th>Status</th>
          <th>Campaign ID</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification, index) => (
          <tr key={index}>
            <td>{notification.type}</td>
            <td>{notification.recipient}</td>
            <td>{notification.status}</td>
            <td>{notification.campaign_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotificationsTable;