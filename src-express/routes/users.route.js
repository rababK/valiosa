const express = require('express'),
  router = express.Router()//,
// security = require('../security')
const userController = require('../controllers/users.controller')
// { validate, ValidationError, Joi } = require('express-validation'),
const authorize = require('../dependencies/authorize'),
  { validate } = require('express-validation')

router.get('/session', authorize.authJWT, validate(userController.getSessionValidation, {}, {}), userController.getSession)
// validate(userController.loginValidation, {}, {})
router.post('/login', authorize.authJWT, validate(userController.loginValidation, {}, {}), userController.login)
router.post('/logout', authorize.authJWT, validate(userController.doLogoutValidation, {}, {}), userController.doLogout)
router.post('/verify', authorize.authJWT, validate(userController.doVerifyNameValidation, {}, {}), userController.doVerifyName)
router.post('/signup', authorize.authJWT, validate(userController.doSignupValidation, {}, {}), userController.doSignup)

router.post('/reset', authorize.authJWT, validate(userController.doResetValidation, {}, {}), userController.doReset)
router.post('/doVerifyPhone', authorize.authJWT, validate(userController.doVerifyPhoneValidation, {}, {}), userController.doVerifyPhone)
router.post('/doSendCode', authorize.authJWT, validate(userController.doSendCodeValidation, {}, {}), userController.doSendCode)
/*
router.post('/login',authorize.authJWT,validate(userController.loginValidation, {}, {}), clientsPassengers.login)
router.post('/checkSignup',authorize.authJWT,validate(userController.checkSignupValidation, {}, {}), clientsPassengers.checkSignup)
router.post('/signup',authorize.authJWT,validate(userController.signupValidation, {}, {}), clientsPassengers.signup)
router.post('/verify',authorize.authJWT,validate(userController.verifyValidation, {}, {}), clientsPassengers.verify)
router.post('/reset',authorize.authJWT,validate(userController.resetValidation, {}, {}), clientsPassengers.reset)
*/
// personal center
// basic information
router.get('/doGetAllUsers', authorize.authJWT, validate(userController.doGetAllUsersValidation, {}, {}), userController.doGetAllUsers)
router.get('/doGetMyPersonalInfo', authorize.authJWT, validate(userController.doGetMyPersonalInfoValidation, {}, {}), userController.doGetMyPersonalInfo)
router.post('/doChangePassword', authorize.authJWT, validate(userController.doChangePasswordValidation, {}, {}), userController.doChangePassword)
router.post('/doSavePersonalInfo', authorize.authJWT, validate(userController.doSavePersonalInfoValidation, {}, {}), userController.doSavePersonalInfo)
// password and phone change and others to be added here

// messages
router.post('/doMessageUser', authorize.authJWT, validate(userController.doMessageUserValidation, {}, {}), userController.doMessageUser)
router.get('/doGetMessages', authorize.authJWT, validate(userController.doGetMessagesValidation, {}, {}), userController.doGetMessages)
// router.get('/doGetNotifications',authorize.authJWT,validate(userController.doGetNotificationsValidation, {}, {}), userController.doGetNotifications)
// router.get('/doGetAlerts',authorize.authJWT, validate(userController.doGetAlertsValidation, {}, {}),userController.doGetAlerts)
// notifications
router.post('/addNotification', authorize.authJWT, validate(userController.addNotificationValidation, {}, {}), userController.addNotification)
router.post('/readNotification', authorize.authJWT, validate(userController.readNotificationValidation, {}, {}), userController.readNotification)
router.get('/getAllMyNotifications', authorize.authJWT, validate(userController.getAllMyNotificationsValidation, {}, {}), userController.getAllMyNotifications)
router.get('/getMyNewNotifications', authorize.authJWT, validate(userController.getMyNewNotificationsValidation, {}, {}), userController.getMyNewNotifications)
module.exports = router