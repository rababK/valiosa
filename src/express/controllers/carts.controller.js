const carts = require('../../models/cart.model'),

    { Joi } = require('express-validation')

exports.getAllCartsValidation = {
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
exports.getAllCarts = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await cart.getCarts(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getCartValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        cartId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getCart = async function (req, res) {
    var results = {}
    if (req.query.cartId) {
        results = await cart.getCart(req.query.cartId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addCartValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId:Joi.string(),
        count: Joi.number(),
        

    }

    ),
}
exports.addCart = async function (req, res) {
    var results = {}
    results = await cart.addCart(req.body)
    res.json(results)
}
exports.updateCartValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId:Joi.string(),
        count: Joi.number(),
    }

    ),
}
exports.updateCart = async function (req, res) {
    var results = {}
    results = await cart.updateCart(req.query.cartId,req.body)
    res.json(results)
}
exports.deleteCartValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deleteCart = async function (req, res) {
    var results = {}
    results = await cart.deleteCart(req.query.cartId)
    res.json(results)
}
