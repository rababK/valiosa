const express = require('express'),
    router = express.Router(),
    cartController = require('../controllers/carts.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllCarts', authorize.authJWT, validate(cartController.getAllCartsValidation, {}, {}), cartController.getAllCarts)
router.get('/getCart', authorize.authJWT, validate(cartController.getCartValidation, {}, {}), cartController.getCart)
router.post('/addCart', authorize.authJWT, validate(cartController.addCartValidation, {}, {}), cartController.addCart)
router.put('/updateCart', authorize.authJWT, validate(cartController.updateCartValidation, {}, {}), cartController.updateCart)
router.delete('/deleteCart', authorize.authJWT, validate(cartController.deleteCartValidation, {}, {}), cartController.deleteCart)

module.exports = router
