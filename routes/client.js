const express = require('express'); 

const router  = express.Router(); 

const { isLogged } = require('../middlewares/client');

router.use([isLogged]);

const userController = require('../controllers/client'); 

router.get('/', userController.home);
router.get('/my-party/:id', userController.myParty);
router.get('/party/edit-info/:id', userController.sendPartyData);
router.get('/my-parties', userController.myParties);
router.post('/party/add', userController.addParty);
router.put('/party/edit/:id', userController.editParty);
router.delete('/party/delete/:id', userController.deleteParty);

module.exports = router; 