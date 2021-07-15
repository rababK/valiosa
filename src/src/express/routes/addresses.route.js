const express = require('express'),
    router = express.Router(),
    addressController = require('../controllers/addresses.controller'),
    authorize = require('../dependencies/authorize'),
    { validate } = require('express-validation')

router.get('/getAllAddresses', authorize.authJWT, validate(addressController.getAllAddressesValidation, {}, {}), addressController.getAllAddresses)
router.get('/getAddress', authorize.authJWT, validate(addressController.getAddressValidation, {}, {}), addressController.getAddress)
router.post('/addAddress', authorize.authJWT, validate(addressController.addAddressValidation, {}, {}), addressController.addAddress)
router.put('/updateAddress', authorize.authJWT, validate(addressController.updateAddressValidation, {}, {}), addressController.updateAddress)
router.delete('/deleteAddress', authorize.authJWT, validate(addressController.deleteAddressValidation, {}, {}), addressController.deleteAddress)

module.exports = router
