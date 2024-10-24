const { DataTypes, Model, Op } = require('sequelize'); 
const sequelize = require('../config/database');
const User = require('./user'); 

const Product = sequelize.define('product', {
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

User.hasMany(Product, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'user_id' });

Product.searchProducts = async (search, maxPrice) => {
  let searchConditions = {};

  if (search) {
    searchConditions.name = {
      [Op.like]: `%${search}%`
    };
  }

  if (maxPrice && maxPrice !== 'empty') {
    searchConditions.price = {
      [Op.lte]: parseFloat(maxPrice)
    };
  }

  return await Product.findAll({
    where: searchConditions
  });
};

module.exports = Product;
