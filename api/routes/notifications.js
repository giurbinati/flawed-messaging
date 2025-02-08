const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Redis = require('ioredis');
const Joi = require('joi');

const router = express.Router();
const redis = new Redis({ host: "redis", port: 6379 });

// Schema di validazione
const schema = Joi.object({
    type: Joi.string().valid("email", "sms").required(),
    recipient: Joi.string().required(),
    message: Joi.string().required(),
    campaign_id: Joi.string().uuid().required()
});

// Rotta per ricevere notifiche
router.post('/v1/notifications', async (req, res) => {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const notification = {
        id: uuidv4(),
        ...value,
        status: "queued",
        timestamp: new Date()
    };

    await redis.lpush("notifications", JSON.stringify(notification));

    res.status(202).json({ message: "Notification queued", notification });
});

module.exports = router;