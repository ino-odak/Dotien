const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME || 'Dotien';
const username = process.env.DB_USER || 'user';
const password = process.env.DB_PASSWORD || 'password';
const host = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
