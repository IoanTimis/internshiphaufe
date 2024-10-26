const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Party = require('./party');

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  party_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Party,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('sent', 'read', 'unread'),
    allowNull: false,
    defaultValue: 'unread',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Definirea relațiilor
User.hasMany(Message, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Party.hasMany(Message, { foreignKey: 'party_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'user_id' });
Message.belongsTo(Party, { foreignKey: 'party_id' });

module.exports = Message;
