const express = require('express'); 

const router  = express.Router(); 

const { isLogged } = require('../middlewares/client');

router.use([isLogged]);

const userController = require('../controllers/client'); 

router.get('/', userController.home);
router.get('/purchase-history', userController.purchaseHistory); 
router.post('/purchase/add', userController.Boughtproduct);

module.exports = router; 