const mongoose = require('mongoose'),
  Schema = mongoose.Schema

var success, msg

const cartSchema = new Schema({
  userId   :{ type: String, null: false, required: true },
  count    :{ type: Number },
  createdAt:{ type: Date, default: Date.now() },
  updatedAt:{ type: Date, default: Date.now() },
})


cartSchema.statics.getCart = async function (params) {
  var cart = await this.findOne({ _id: params._id })
  return cart
}

cartSchema.statics.addCart = async function (params) {
  var cart = await this.create(params)
  await cart.save()
  return true
}

cartSchema.statics.updateCart = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}

cartSchema.statics.deleteCart = async function (params) {
  await this.deleteOne(params._id)
  return true
}

const cartModel = mongoose.model('Cart', cartSchema)

module.exports = cartModel
