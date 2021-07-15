const express = require('express'),
    router = express.Router(),
    productCategoryController = require('../controllers/productsCategories.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllProductCategories', authorize.authJWT, validate(productCategoryController.getAllProductCategoriesValidation, {}, {}), productCategoryController.getAllProductCategories)
router.get('/getProductCategory', authorize.authJWT, validate(productCategoryController.getProductCategoryValidation, {}, {}), productCategoryController.getProductCategory)
router.post('/addProductCategory', authorize.authJWT, validate(productCategoryController.addProductCategoryValidation, {}, {}), productCategoryController.addProductCategory)
router.put('/updateProductCategory', authorize.authJWT, validate(productCategoryController.updateProductCategoryValidation, {}, {}), productCategoryController.updateProductCategory)
router.delete('/deleteProductCategory', authorize.authJWT, validate(productCategoryController.deleteProductCategoryValidation, {}, {}), productCategoryController.deleteProductCategory)

module.exports = router
