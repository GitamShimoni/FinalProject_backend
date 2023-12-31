const express = require('express')
const router = express.Router();
const userController = require('../Controllers/userController')
const middleware = require('../Middleware/middleware')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/getUsers', userController.getAllUsers)
router.post('/updateUsers',  userController.updateUser)
router.post('/deleteUser',  userController.deleteUser)
router.post('/isToken', userController.isToken)



module.exports = router