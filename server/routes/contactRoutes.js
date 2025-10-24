const express = require('express');
const { sendMessage, getMessages } = require('../controllers/contactController');
const router = express.Router();

// ✅ Route to send message (POST)
router.post('/', sendMessage);

// ✅ Route to get all messages (GET)
router.get('/', getMessages);

module.exports = router;
