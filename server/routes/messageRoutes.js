const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/send_message', authenticateToken, messageController.sendMessage);
router.get('/get_messages/:conversation_id', authenticateToken, messageController.getMessages);

module.exports = router;
