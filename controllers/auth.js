const User = require("../models/user");
const bcrypt = require('bcryptjs');
const sanitizeHtml = require('sanitize-html');

const register = (req, res, next) => {
  res.render('pages/auth/register');
};

const registerSuccess = (req, res, next) => {
  res.render('pages/auth/register-success');
};

const  registerPost = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 8);
  const { name, email, type } = req.body;
  sanitizeHtml(name);
  sanitizeHtml(email);

  try{
    
    const user = await User.create({name, email, password, type});
    res.render('pages/auth/register-success', { user });
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
    res.render('pages/auth/login');
  }
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  const saveRedirect = req.session.redirectTo;

  if (email && password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.redirect('pages/login', { error: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.redirect('pages/login', { error: 'Invalid email or password' });
      }

      req.session.loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      };

      console.log('User logged in:', req.session.loggedInUser);

      delete req.session.redirectTo;
      if (saveRedirect) {
        res.redirect(saveRedirect);
      }
       else {
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};
  
const logout = (req, res) => {
  delete req.session.loggedInUser;
  req.session.save(function(err) {
    if (err) {
      console.error('Eroare la salvarea sesiunii:', err);
    } else {
      res.redirect('/');
    }
  });
};

module.exports = {
  register,
  registerSuccess,
  registerPost,
  login,
  loginPost,
  logout
};