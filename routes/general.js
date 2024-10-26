const express = require('express'); 

const router  = express.Router(); 

const generalController = require('../controllers/general');

router.get('/', generalController.home); 
router.get('/about', generalController.about);

router.get('/party/:id', generalController.party);
router.get('/parties', generalController.parties);
// router.get('/search-results', generalController.searchResults);

module.exports = router; 