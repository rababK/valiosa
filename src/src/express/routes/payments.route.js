const express = require('express'),
    router = express.Router(),
    paymentController = require('../controllers/payments.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllPayments', authorize.authJWT, validate(paymentController.getAllPaymentsValidation, {}, {}), paymentController.getAllPayments)    
router.get('/getPayment', authorize.authJWT, validate(paymentController.getPaymentValidation, {}, {}), paymentController.getPayment)
router.post('/addPayment', authorize.authJWT, validate(paymentController.addPaymentValidation, {}, {}), paymentController.addPayment)
router.put('/updatePayment', authorize.authJWT, validate(paymentController.updatePaymentValidation, {}, {}), paymentController.updatePayment)
router.delete('/deletePayment', authorize.authJWT, validate(paymentController.deletePaymentValidation, {}, {}), paymentController.deletePayment)

module.exports = router
