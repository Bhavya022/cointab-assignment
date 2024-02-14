const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cointab', 'root', 'bhavya22', {
  host: 'localhost',
  dialect: 'mysql' // or any other dialect such as 'postgres', 'sqlite', 'mssql', etc.
});

module.exports = sequelize;
