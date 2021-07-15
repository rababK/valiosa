const express = require('express'),
    router = express.Router(),
    productController = require('../controllers/products.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllProducts/:storeId', authorize.authJWT, validate(productController.getAllProductsValidation, {}, {}), productController.getAllProducts)
router.get('/getProduct', authorize.authJWT, validate(productController.getProductValidation, {}, {}), productController.getProduct)
router.post('/addProduct', authorize.authJWT, validate(productController.addProductValidation, {}, {}), productController.addProduct)
router.put('/updateProduct', authorize.authJWT, validate(productController.updateProductValidation, {}, {}), productController.updateProduct)
router.delete('/deleteProduct', authorize.authJWT, validate(productController.deleteProductValidation, {}, {}), productController.deleteProduct)

module.exports = router
