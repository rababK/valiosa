const addresss = require('../../models/address.model'),

    { Joi } = require('express-validation')

exports.getAllAddresssValidation = {
    headers: Joi.object(),
    params: Joi.object(
        {
            userId: Joi.string()
                .required()
        }
    ),
    query: Joi.object(
        {
            page: Joi.string(),
            perPage: Joi.string()
        }
    ),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getAllAddresss = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await address.getAddresss(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getAddressValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        addressId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getAddress = async function (req, res) {
    var results = {}
    if (req.query.addressId) {
        results = await address.getAddress(req.query.addressId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addAddressValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId:Joi.string(),
        phoneNumber: Joi.string(),
        fullAddress: Joi.string(),
        country: Joi.array(),
        state: Joi.string(),
        city: Joi.string(),
        gender: Joi.string(),
        

    }

    ),
}
exports.addAddress = async function (req, res) {
    var results = {}
    results = await address.addAddress(req.body)
    res.json(results)
}
exports.updateAddressValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId:Joi.string(),
        phoneNumber: Joi.string(),
        fullAddress: Joi.string(),
        country: Joi.array(),
        state: Joi.string(),
        city: Joi.string(),
        gender: Joi.string(),
        
    }

    ),
}
exports.updateAddress = async function (req, res) {
    var results = {}
    results = await address.updateAddress(req.query.addressId,req.body)
    res.json(results)
}
exports.deleteAddressValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deleteAddress = async function (req, res) {
    var results = {}
    results = await address.deleteAddress(req.query.addressId)
    res.json(results)
}
