const { Conversation, Message } = require('../models');

exports.getConversationMessages = async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await Message.findAll({ where: { conversation_id: id }, order: [['index', 'ASC']] });
        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getConversations = async (req, res) => {
    const user_id = req.user.uid;

    try {
        const conversations = await Conversation.findAll({ where: { user_id: user_id }, order: [['uid', 'ASC']] });
        res.json(conversations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
