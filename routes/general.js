const express = require('express'); 

const router  = express.Router(); 

const generalController = require('../controllers/general');

router.get('/', generalController.home); 
router.get('/about', generalController.about);
router.get('/register', generalController.register);

router.get('/register-success', generalController.registerSuccess);
router.post('/register', generalController.registerPost);

router.get('/login', generalController.login);
router.post('/login', generalController.loginPost);
router.get('/logout', generalController.logout);

router.get('/search', generalController.search);
router.get('/search-results', generalController.searchResults);

module.exports = router; 