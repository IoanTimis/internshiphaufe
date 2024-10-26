const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 
const Party = require('./party');

const Reservation = sequelize.define('reservation', {
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

Party.hasMany(Reservation, { foreignKey: 'party_id' });
User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(Party, { foreignKey: 'party_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Reservation;
