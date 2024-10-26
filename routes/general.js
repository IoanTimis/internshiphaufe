const express = require('express'); 

const router  = express.Router(); 

const { isLogged } = require('../middlewares/client');

const generalController = require('../controllers/general');

router.get('/', generalController.home); 
router.get('/about', generalController.about);

router.get('/party/:id', generalController.party, isLogged);
router.get('/parties', generalController.parties, isLogged);
// router.get('/search-results', generalController.searchResults);

module.exports = router; 