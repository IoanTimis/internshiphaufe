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

  try {
    const products = await Product.searchProducts(search, maxPrice);

    if (products.length === 0) {
      //Todo: add message to the view
      // return res.render('pages/generalPages/search', { products: [], message: 'Nu au fost gasite produse.' });
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

