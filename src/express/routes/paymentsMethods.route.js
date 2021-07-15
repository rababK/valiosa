const express = require('express'),
    router = express.Router(),
    paymentMethodController = require('../controllers/paymentsMethods.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllPaymentsMethods', authorize.authJWT, validate(paymentMethodController.getAllPaymentsMethodsValidation, {}, {}), paymentMethodController.getAllPaymentsMethods)    
router.get('/getPaymentMethod', authorize.authJWT, validate(paymentMethodController.getPaymentMethodValidation, {}, {}), paymentMethodController.getPaymentMethod)
router.post('/addPaymentMethod', authorize.authJWT, validate(paymentMethodController.addPaymentMethodValidation, {}, {}), paymentMethodController.addPaymentMethod)
router.put('/updatePaymentMethod', authorize.authJWT, validate(paymentMethodController.updatePaymentMethodValidation, {}, {}), paymentMethodController.updatePaymentMethod)
router.delete('/deletePaymentMethod', authorize.authJWT, validate(paymentMethodController.deletePaymentMethodValidation, {}, {}), paymentMethodController.deletePaymentMethod)

module.exports = router
