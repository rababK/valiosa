const mongoose = require('mongoose'),
  Schema = mongoose.Schema
var success, msg

const productCategoriesSchema = new Schema({
  name: { type: String, null: false, required: true, minlength: 10, maxlength: 50 },
  userId: { type: String, null: false, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
  parentCategoryId: { type: String, default: null },
  quantity: { type: Number, null: false, required: true, min: 50 },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },

})

productCategoriesSchema.statics.getMyProductCategoriess = async function (params) {
  var productCategoriess = await this.find(params)
  return productCategoriess
}

productCategoriesSchema.statics.addProductCategories = async function (params) {
  var productCategories = await this.create(params)
  await productCategories.save()
  return true
}

productCategoriesSchema.statics.getProductCategories = async function (productCategoriesId) {
  var productCategories = await this.findOne({ _id: productCategoriesId })
  return productCategories
}

productCategoriesSchema.statics.updateProductCategories = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}

productCategoriesSchema.statics.deleteProductCategories = async function (productCategoriesId) {
  var msg = await this.deleteOne(productCategoriesId)
  console.log(`deleted ${JSON.stringify(msg)}`)
  return true
}

const productCategoriesModel = mongoose.model('productCategories', productCategoriesSchema)

module.exports = productCategoriesModel
