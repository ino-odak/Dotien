const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Conversation = require('./conversation');

const Message = sequelize.define('Message', {
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Conversation,
            key: 'uid',
        },
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(16384),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Message;
