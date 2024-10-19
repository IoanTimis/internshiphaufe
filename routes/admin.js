const express = require('express'); 

const router  = express.Router(); 

const { isAdmin } = require('../middlewares/admin');

router.use([isAdmin]);

const adminController = require('../controllers/admin'); 

router.get('/admin', adminController.home);
router.get('/admin/about', adminController.about);
router.get('/admin/dashboard', adminController.dashboard);

router.get('/users', adminController.users);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

router.get('/products', adminController.products);
router.put('/products/:productId', adminController.updateProduct);
router.delete('/products/:productId', adminController.deleteProduct);

module.exports = router;