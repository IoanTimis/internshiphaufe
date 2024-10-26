const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');

const home = (req, res) => {
  res.render('pages/user/index');
};



module.exports = {
  home,
};

