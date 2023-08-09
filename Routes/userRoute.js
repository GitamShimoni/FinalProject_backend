const express = require('express')
const router = express.Router();
const userController = require('../Controllers/userController')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/getUsers', userController.getAllUsers)
router.post('/updateUsers', userController.updateUser)
router.post('/isToken', userController.isToken)


module.exports = router