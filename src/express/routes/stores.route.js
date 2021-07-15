const express = require('express'),
    router = express.Router(),
    storeController = require('../controllers/stores.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllStores', authorize.authJWT, validate(storeController.getAllStoresValidation, {}, {}), storeController.getAllStores)
router.get('/getStore', authorize.authJWT, validate(storeController.getStoreValidation, {}, {}), storeController.getStore)
router.post('/addStore', authorize.authJWT, validate(storeController.addStoreValidation, {}, {}), storeController.addStore)
router.put('/updateStore', authorize.authJWT, validate(storeController.updateStoreValidation, {}, {}), storeController.updateStore)
router.delete('/deleteStore', authorize.authJWT, validate(storeController.deleteStoreValidation, {}, {}), storeController.deleteStore)

module.exports = router
