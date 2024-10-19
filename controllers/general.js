const Product = require("../models/product");
const { Op } = require('sequelize');

const home = (req, res, next) => {
  res.render('pages/generalPages/index');
};

const about = (req, res, next) => {
  res.render('pages/generalPages/about');
};

const search = async (req, res, next) => {
  const products = await Product.findAll();

  if (!products) {
    //Nu a fost gasit niciun produs
  }
  res.render('pages/generalPages/search', { products: products });
};

const searchResults = async (req, res, next) => {
  const { search, maxPrice } = req.query;
  let searchConditions = {};

  if (search) {
    searchConditions.name = {
      [Op.like]: `%${search}%`
    };
  }

  // Adaugă condiția pentru `price` doar dacă `maxPrice` nu este 'empty'
  if (maxPrice && maxPrice !== 'empty') {
    searchConditions.price = {
      [Op.lte]: parseFloat(maxPrice)
    };
  }

  try {
    const products = await Product.findAll({
      where: searchConditions
    });

    if (!products) {
      // Nu a fost gasit niciun produs
    }
    
    res.render('pages/generalPages/search', { products: products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  home,
  about,
  search,
  searchResults
};

