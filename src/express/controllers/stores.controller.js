const store = require('../../models/store.model'),

    { Joi } = require('express-validation')

exports.getAllStoresValidation = {
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
exports.getAllStores = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await store.getStores(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getStoreValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        storeId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getStore = async function (req, res) {
    var results = {}
    if (req.query.storeId) {
        results = await store.getStore(req.query.storeId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addStoreValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        storeName: Joi.string(),
        verified: Joi.boolean(),
        description: Joi.string(),
        userId: Joi.string(),
        imagePath: Joi.string(),

    }

    ),
}
exports.addStore = async function (req, res) {
    var results = {}
    results = await store.addStore(req.body)
    res.json(results)
}
exports.updateStoreValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        storeName: Joi.string(),
        verified: Joi.boolean(),
        description: Joi.string(),
        userId: Joi.string(),
        imagePath: Joi.string(),

    }

    ),
}
exports.updateStore = async function (req, res) {
    var results = {}
    results = await store.updateStore(req.query.storeId, req.body)
    res.json(results)
}
exports.deleteStoreValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deleteStrore = async function (req, res) {
    var results = {}
    results = await store.deleteStore(req.query.storeId)
    res.json(results)
}
