const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 

const UsersBoughtProducts = sequelize.define('userBP', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id', 
    },
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

User.hasMany(UsersBoughtProducts, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UsersBoughtProducts.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UsersBoughtProducts;
