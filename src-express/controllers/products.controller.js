const product = require('../../models/product.model'),

    { Joi } = require('express-validation')

exports.getAllProductsValidation = {
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
exports.getAllProducts = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await product.getProducts(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getProductValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        productId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getProduct = async function (req, res) {
    var results = {}
    if (req.query.productId) {
        results = await product.getProduct(req.query.productId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addProductValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        name:Joi.string(),
        content: Joi.string(),
        slug: Joi.string(),
        userId: Joi.string(),
        productCategoryId: Joi.string(),
        storeId: Joi.string(),
        keywords: Joi.array(),
        price: Joi.number(),
        stack: Joi.number(),
        imagePath: Joi.string(),
        imagePaths: Joi.array(),
        visible: Joi.boolean(),
        description: Joi.string(),
    }

    ),
}
exports.addProduct = async function (req, res) {
    var results = {}
    results = await product.addProduct(req.body)
    res.json(results)
}
exports.updateProductValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        name:Joi.string(),
        content: Joi.string(),
        slug: Joi.string(),
        userId: Joi.string(),
        productCategoryId: Joi.string(),
        storeId: Joi.string(),
        keywords: Joi.array(),
        price: Joi.number(),
        stack: Joi.number(),
        imagePath: Joi.string(),
        imagePaths: Joi.array(),
        visible: Joi.boolean(),
        description: Joi.string(),
    }

    ),
}
exports.updateProduct = async function (req, res) {
    var results = {}
    results = await product.updateProduct(req.query.productId,req.body)
    res.json(results)
}
exports.deleteProductValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deleteProduct = async function (req, res) {
    var results = {}
    results = await product.deleteProduct(req.query.productId)
    res.json(results)
}
