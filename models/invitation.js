const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 
const Party = require('./party');

const Invitation = sequelize.define('invitation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  party_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Party,
      key: 'id',
    },
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

Party.hasMany(Invitation, { foreignKey: 'party_id' });
User.hasMany(Invitation, { foreignKey: 'user_id' });
Invitation.belongsTo(Party, { foreignKey: 'party_id' });
Invitation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Invitation;
