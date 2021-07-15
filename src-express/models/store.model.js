const mongoose = require('mongoose'),
  Schema = mongoose.Schema

var success, msg

const storeSchema = new Schema({
  storeName: { type: String, minlength: 5, maxlength: 50 },
  verified: { type: Boolean, default: false },
  description: { type: String, minlength: 5, maxlength: 50 },
  userId: { type: String, null: false, required: true },
  imagePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})


storeSchema.statics.getStore = async function (params) {
  var store = await this.findOne({ _id: params._id })
  return store
}

storeSchema.statics.addStore = async function (params) {
  var store = await this.create(params)
  await store.save()
  return true
}

storeSchema.statics.updateStore = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}

storeSchema.statics.deleteStore = async function (params) {
  await this.deleteOne(params._id)
  return true
}

const storeModel = mongoose.model('Store', storeSchema)

module.exports = storeModel
