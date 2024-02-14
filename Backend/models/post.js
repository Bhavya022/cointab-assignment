const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Post = sequelize.define('Post', {
  userId: DataTypes.INTEGER,
  title: DataTypes.STRING,
  body: DataTypes.TEXT
});

module.exports = Post;
