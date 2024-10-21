function isAdmin(req, res, next) {
  console.log('isAdmin', req.session.loggedInUser);
  if (!req.session.loggedInUser || req.session.loggedInUser.type !== 'admin') {
    return res.status(403).send("Access denied.");
  }
  
  next();
}

module.exports = {
  isAdmin
};