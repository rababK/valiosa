const productCategory = require('../../models/productCategory.model'),

    { Joi } = require('express-validation')

exports.getAllProductCategoriesValidation = {
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
exports.getAllProductCategories = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await productCategory.getProductCategories(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getProductCategoryValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        productCategoryId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getProductCategory = async function (req, res) {
    var results = {}
    if (req.query.productCategoryId) {
        results = await productCategory.getProductCategory(req.query.productCategoryId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addProductCategoryValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        name: Joi.string(),
        userId: Joi.string(),
        imagePath: Joi.string(),
        description: Joi.string(),
        parentCategoryId: Joi.string(),
        quantity: Joi.number(),
        visible: Joi.boolean(),

    }

    ),
}
exports.addProductCategory = async function (req, res) {
    var results = {}
    results = await productCategory.addProductCategory(req.body)
    res.json(results)
}
exports.updateProductCategoryValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        name: Joi.string(),
        userId: Joi.string(),
        imagePath: Joi.string(),
        description: Joi.string(),
        parentCategoryId: Joi.string(),
        quantity: Joi.number(),
        visible: Joi.boolean(),
    }

    ),
}
exports.updateProductCategory = async function (req, res) {
    var results = {}
    results = await productCategory.updateProductCategory(req.query.productCategoryId, req.body)
    res.json(results)
}
exports.deleteProductCategoryValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deleteProductCategory = async function (req, res) {
    var results = {}
    results = await productCategory.deleteProductCategory(req.query.productCategoryId)
    res.json(results)
}
