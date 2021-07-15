const mongoose = require('mongoose'),
  Schema = mongoose.Schema
var success, msg

const addressSchema = new Schema({
  userId: { type: String, null: false, required: true },
  phoneNumber: { type: String, null: false, required: true, maxlength: 10 },
  fullAddress: { type: String, null: false, required: true, maxlength: 50 },
  country: { type: String, maxlength: 50 },
  state: { type: String, maxlength: 50 },
  city: { type: String, maxlength: 50 },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },

})
addressSchema.statics.getMyAddresss = async function (params) {
  var addresss = await this.find(params)
  return addresss
}
addressSchema.statics.addAddress = async function (params) {
  var address = await this.create(params)
  await address.save()
  return true
}
addressSchema.statics.getAddress = async function (AddressId) {
  var address = await this.findOne({ _id: addressId })
  return address
}
addressSchema.statics.updateAddress = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}
addressSchema.statics.deleteAddress = async function (AddressId) {
  var msg = await this.deleteOne(AddressId)
  console.log(`deleted ${JSON.stringify(msg)}`)
  return true
}

const addressModel = mongoose.model('Address', addressSchema)

module.exports = addressModel
