const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const auth = require('./middleware/auth')


router.post('/registration', userController.registration)


router.post('/login', userController.loginUser)


router.get('/logout',userController.logoutUser)


router.post('/changePassword/:userId',auth.authentication, userController.ChangePassword)


router.post('/forgot' , userController.forgotPassword)


router.post('/resetPassword',userController.resetPassword)








module.exports = router