const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const eventController = require('./controller/eventController')
const auth = require('./middleware/auth')


router.post('/registration', userController.registration)


router.post('/login', userController.loginUser)


router.get('/logout',userController.logoutUser)


router.post('/changePassword/:userId',auth.authentication, userController.ChangePassword)


router.post('/forgot' , userController.forgotPassword)


router.post('/resetPassword',userController.resetPassword)

// event apis

router.post('/createEvent/:userId' , auth.authentication, eventController.createEvent )


router.post('/invite/:userId/:eventId',auth.authentication, eventController.inviteUser)


router.get('/list', eventController.listEventbyFilter )

router.post('/update/:userId/:eventId', auth.authentication, eventController.upadateEvent)

router.get('/event/:eventId', auth.authentication, eventController.getEvent)








module.exports = router