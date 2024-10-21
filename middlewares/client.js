function isLogged(req, res, next) {
  if (!req.session.loggedInUser) {
    return res.redirect('/login');
  }
  next();
}

module.exports = {
  isLogged
};