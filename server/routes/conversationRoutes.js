const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/conversation/:id', authenticateToken, conversationController.getConversationMessages);
router.get('/conversations', authenticateToken, conversationController.getConversations)

module.exports = router;
