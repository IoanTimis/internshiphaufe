const express = require('express'); 

const router  = express.Router(); 

const { isAdmin } = require('../middlewares/admin');

router.use([isAdmin]);

const adminController = require('../controllers/admin'); 


router.get('/', adminController.dashboard);

router.get('/users', adminController.users);
router.put('/user/update/:user_id', adminController.updateUser);
router.delete('/user/delete/:user_id', adminController.deleteUser);

router.get('/products', adminController.products);
router.post('/product/add', adminController.addProduct);
router.put('/product/update/:productId', adminController.updateProduct);
router.delete('/product/delete/:productId', adminController.deleteProduct);

module.exports = router;