const mongoose = require('mongoose'),
  Schema = mongoose.Schema

var success, msg

const paymentMethodSchema = new Schema({
  userId : { type: String, null: false, required: true },
  methodName: { type: String,  minlength: 5, maxlength: 50 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})


paymentMethodSchema.statics.getPaymentMethod = async function (params) {
  var paymentMethod = await this.findOne({ _id: params._id })
  return paymentMethod
}

paymentMethodSchema.statics.addPaymentMethod = async function (params) {
  var paymentMethod = await this.create(params)
  await paymentMethod.save()
  return true
}

paymentMethodSchema.statics.updatePaymentMethod = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}

paymentMethodSchema.statics.deletePaymentMethod = async function (params) {
  await this.deleteOne(params._id)
  return true
}

const paymentMethodModel = mongoose.model('PaymentMethod', paymentMethodSchema)

module.exports = paymentMethodModel
