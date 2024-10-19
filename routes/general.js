const express = require('express'); 

const router  = express.Router(); 

const generalController = require('../controllers/general');

router.get('/', generalController.home); 
router.get('/about', generalController.about);

router.get('/search', generalController.search);
router.get('/search-results', generalController.searchResults);

module.exports = router; 