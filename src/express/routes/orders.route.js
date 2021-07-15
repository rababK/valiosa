const express = require('express'),
    router = express.Router(),
    orderController = require('../controllers/orders.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllOrders', authorize.authJWT, validate(orderController.getAllOrdersValidation, {}, {}), orderController.getAllOrders)
router.get('/getOrder', authorize.authJWT, validate(orderController.getOrderValidation, {}, {}), orderController.getOrder)
router.post('/addOrder', authorize.authJWT, validate(orderController.addOrderValidation, {}, {}), orderController.addOrder)
router.put('/updateOrder', authorize.authJWT, validate(orderController.updateOrderValidation, {}, {}), orderController.updateOrder)
router.delete('/deleteOrder', authorize.authJWT, validate(orderController.deleteOrderValidation, {}, {}), orderController.deleteOrder)

module.exports = router
