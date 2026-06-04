var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController.js');

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);

router.get('/register', authController.renderRegister);
router.post('/register', authController.register);

module.exports = router;
