function isLogged(req, res, next) {
  if (!req.session.loggedInUser) {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  isLogged
};