const mongoose = require('mongoose'),
  Schema = mongoose.Schema
var success, msg

const orderSchema = new Schema({
  userId: { type: String, null: false, required: true },
  cartId: { type: String, null: false, required: true },
  totalPrice: { type: Number, null: false, required: true, min: 0 },
  addressId: { type: String, null: false, required: true },
  status: { type: String, required: true, enum: ["unpaid", "ordered", "shipped", "dilivered", "returned"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },

})
orderSchema.statics.getMyOrders = async function (params) {
  var orders = await this.find(params)
  return orders
}
orderSchema.statics.addOrder = async function (params) {
  var order = await this.create(params)
  await order.save()
  return true
}
orderSchema.statics.getOrder = async function (OrderId) {
  var order = await this.findOne({ _id: orderId })
  return order
}
orderSchema.statics.updateOrder = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}
orderSchema.statics.deleteOrder = async function (OrderId) {
  var msg = await this.deleteOne(OrderId)
  console.log(`deleted ${JSON.stringify(msg)}`)
  return true
}

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel
