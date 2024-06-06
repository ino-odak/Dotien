const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Conversation = require('./conversation');
const Message = require('./message');

User.hasMany(Conversation, { foreignKey: 'user_id' });
Conversation.belongsTo(User, { foreignKey: 'user_id' });

Conversation.hasMany(Message, { foreignKey: 'conversation_id' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });

module.exports = {
    User,
    Conversation,
    Message,
    sequelize,
};
