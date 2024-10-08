const sanitizeHtml = require('sanitize-html');
const usersBoughtProducts = require('../models/usersBoughtProducts');

const home = async (req, res, next) => {
  const userId = req.session.loggedInUser.id;

  try {
    const products = await usersBoughtProducts.findAll({
      where: {
        userId,
      },
    });

    if (!products) {
      return res.status(404).send('Products not found'); // Nu ai cumparat niciun produs
    }
    res.render('pages/user/products', {products: products});
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const success = async (req, res, next) => {
  const userId = req.session.loggedInUser.id;
  const { name, price } = req.body;
  sanitizeHtml(name);
  sanitizeHtml(price);

  try {
    const product = await usersBoughtProducts.create({name, price , userId});

    if (!product) {
      return res.status(404).send('Error adding product to user bought products');
    }
    
    res.status(201).json(product);
  }
  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }

};

module.exports = {
  home,
  success
};

