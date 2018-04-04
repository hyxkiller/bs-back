const express = require('express');
const router = express.Router();
const userController = require('../controller/user')


router.post('/users/signUp', userController.signUp)
router.post('/users/signIn', userController.signIn)
router.get('/users/islogin',userController.isLogin)
router.get('/users/logout',userController.logout)

module.exports = router;