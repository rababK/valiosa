const paymentMethod = require('../../models/paymentMethod.model'),

    { Joi } = require('express-validation')

exports.getAllPaymentMethodsValidation = {
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
exports.getAllPaymentMethods = async function (req, res) {
    var results = {}
    if (req.query.page && req.query.perPage) {
        results = await paymentMethod.getPaymentMethods(req.query.page, req.query.perPage)
    }
    else {
        res.status(400) // wrong requirementMethods
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.getPaymentMethodValidation = {
    headers: Joi.object(),
    params: Joi.object({
        userId: Joi.String().required()
    }),
    query: Joi.object({
        paymentMethodId: Joi.string(),
    }),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.getPaymentMethod = async function (req, res) {
    var results = {}
    if (req.query.paymentMethodId) {
        results = await paymentMethod.getPaymentMethod(req.query.paymentMethodId)
    }

    else {
        res.status(400) // wrong requirementMethods
        results.success = false
        results.msg = "wrong inputs"
    }
    res.json(results)
}
exports.addPaymentMethodValidation = {
    headers: Joi.object(),
    params: Joi.object({ userId: Joi.String().required() }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId: Joi.string(),
        methodName: Joi.string(),


    }

    ),
}
exports.addPaymentMethod = async function (req, res) {
    var results = {}
    results = await paymentMethod.addPaymentMethod(req.body)
    res.json(results)
}
exports.updatePaymentMethodValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object({
        userId: Joi.string(),
        methodName: Joi.string(),
    }

    ),
}
exports.updatePaymentMethod = async function (req, res) {
    var results = {}
    results = await paymentMethod.updatePaymentMethod(req.query.paymentMethodId, req.body)
    res.json(results)
}
exports.deletePaymentMethodValidation = {
    headers: Joi.object(),
    params: Joi.object({
        params: Joi.object({ userId: Joi.String().required() }),
    }),
    query: Joi.object(),
    cookies: Joi.object(),
    signedCookies: Joi.object(),
    body: Joi.object(),
}
exports.deletePaymentMethod = async function (req, res) {
    var results = {}
    results = await paymentMethod.deletePaymentMethod(req.query.paymentMethodId)
    res.json(results)
}
