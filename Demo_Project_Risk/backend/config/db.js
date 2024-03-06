require('dotenv').config()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.DB_PASSWORD, {
    host: process.env.HOST_NAME,
    port: process.env.PORT_NUMBER,
    dialect: process.env.DB_DIALECT
});

module.exports = sequelize;
