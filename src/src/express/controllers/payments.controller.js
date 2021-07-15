const payment = require('../../models/payment.model'),

    { Joi } = require('express-validation')

exports.getAllPaymentsValidation = {
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
exports.getAllPayments = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await payment.getPayments(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getPaymentValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        paymentId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getPayment = async function (req, res) {
    var results = {}
    if (req.query.paymentId) {
        results = await payment.getPayment(req.query.paymentId)
    }

    else {
        res.status(400) // wrong requirements
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addPaymentValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId: Joi.string(),
        storeId: Joi.string(),
        orderId: Joi.string(),
        totalAmount: Joi.number(),
        pymentMethodId: Joi.string(),

    }

    ),
}
exports.addPayment = async function (req, res) {
    var results = {}
    results = await payment.addPayment(req.body)
    res.json(results)
}
exports.updatePaymentValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId: Joi.string(),
        storeId: Joi.string(),
        orderId: Joi.string(),
        totalAmount: Joi.number(),
        pymentMethodId: Joi.string(),
    }

    ),
}
exports.updatePayment = async function (req, res) {
    var results = {}
    results = await payment.updatePayment(req.query.paymentId, req.body)
    res.json(results)
}
exports.deletePaymentValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deletePayment = async function (req, res) {
    var results = {}
    results = await payment.deletePayment(req.query.paymentId)
    res.json(results)
}
