const mongoose = require('mongoose'),
  Schema = mongoose.Schema

var success, msg

const paymentSchema = new Schema({
  userId: { type: String, null: false, required: true },
  storeId: { type: String, null: false, required: true },
  orderId: { type: String, null: false, required: true },
  totalAmount: { type: Number },
  paymentMethodId: { type: String, minlength: 5, maxlength: 50 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})


paymentSchema.statics.getPayment = async function (params) {
  var payment = await this.findOne({ _id: params._id })
  return payment
}

paymentSchema.statics.addPayment = async function (params) {
  var payment = await this.create(params)
  await payment.save()
  return true
}

paymentSchema.statics.updatePayment = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}

paymentSchema.statics.deletePayment = async function (params) {
  await this.deleteOne(params._id)
  return true
}

const paymentModel = mongoose.model('Payment', paymentSchema)

module.exports = paymentModel
