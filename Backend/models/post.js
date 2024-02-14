const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Post = sequelize.define('Post', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
});

module.exports = Post;
