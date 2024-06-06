const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Conversation = sequelize.define('Conversation', {
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Conversation;
