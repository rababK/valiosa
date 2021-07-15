const order = require('../../models/order.model'),

    { Joi } = require('express-validation')

exports.getAllOrdersValidation = {
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
exports.getAllOrders = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await order.getOrders(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getOrderValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        orderId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getOrder = async function (req, res) {
    var results = {}
    if (req.query.orderId) {
        results = await order.getOrder(req.query.orderId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addOrderValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId:Joi.string(),
        cartId: Joi.string(),
        totalPrice: Joi.number(),
        adressId: Joi.string(),
        status: Joi.string(),
        
    }

    ),
}
exports.addOrder = async function (req, res) {
    var results = {}
    results = await order.addOrder(req.body)
    res.json(results)
}
exports.updateOrderValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId:Joi.string(),
        cartId: Joi.string(),
        totalPrice: Joi.number(),
        adressId: Joi.string(),
        status: Joi.string(),
    }

    ),
}
exports.updateOrder = async function (req, res) {
    var results = {}
    results = await order.updateOrder(req.query.orderId,req.body)
    res.json(results)
}
exports.deleteOrderValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deleteOrder = async function (req, res) {
    var results = {}
    results = await order.deleteOrder(req.query.orderId)
    res.json(results)
}
