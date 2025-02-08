const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notifications');

const app = express();

app.use(bodyParser());
app.use('/api', notificationRoutes);

module.exports = app;