const e = require("express");
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const sanitizeHtml = require('sanitize-html');


const home = (req, res, next) => {
  res.render('pages/index');
};

const about = (req, res, next) => {
  res.render('pages/about');
};

const register = (req, res, next) => {
  res.render('pages/register');
};

const registerSuccess = (req, res, next) => {
  res.render('pages/register-success');
};

const  registerPost = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 8);
  const { name, email, type } = req.body;
  sanitizeHtml(name);
  sanitizeHtml(email);

  try{
    
    const user = await User.create({name, email, password, type});
    res.render('pages/register-success', { user });
  }
  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};



const login = (req, res, next) => {
  if (req.session.loggedInUser) {
    return res.redirect('/');
  }else{
    res.render('pages/login');
  }
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  const saveRedirect = req.session.redirectTo;

  if (email && password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.render('pages/login', { error: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.render('pages/login', { error: 'Invalid email or password' });
      }

      req.session.loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      };

      delete req.session.redirectTo;
      if (saveRedirect) {
        res.redirect(saveRedirect);
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};
  
const logout = (req, res, next) => {
  delete req.session.loggedInUser;
  req.session.save();
  res.redirect('/');
};

const search = async (req, res, next) => {
  const products = await Product.findAll();

  if (!products) {
    //Nu a fost gasit niciun produs
  }
  res.render('pages/search', { products: products });
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
    
    res.render('pages/search', { products: products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  home,
  about,
  register,
  registerSuccess,
  registerPost,
  login,
  loginPost,
  logout,
  search,
  searchResults
};

