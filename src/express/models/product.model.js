const mongoose = require('mongoose'),
    Schema = mongoose.Schema
var success, msg

const productSchema = new Schema({

    name: { type: String, null: false, required: true, minlength: 5, maxlength: 50 },
    content: { type: String, null: false, required: true },
    slug: { type: String, null: false, required: true },
    userId: { type: String, null: false, required: true },
    productCategoryId: { type: String, null: false, required: true },
    storeId: { type: String, null: false, required: true },
    keywords: { type: Array, required: true },
    price: { type: Number, null: false, required: true, min: 0 },
    stack: { type: Number, null: false, required: true, min: 0 },
    imagePath: { type: String, required: true },
    imagePaths: { type: Array, required: true },
    visible: { type: Boolean, default: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },

})

productSchema.statics.getMyProducts = async function (params) {
    var products = await this.find(params)
    return products
}

productSchema.statics.addProduct = async function (params) {
    var product = await this.create(params)
    await product.save()
    return true
}

productSchema.statics.getProduct = async function (productId) {
    var product = await this.findOne({ _id: productId })
    return product
}

productSchema.statics.updateProduct = async function (params) {
    var id = params._id
    delete params._id
    await this.updateOne({ _id: id }, { $set: params })
    return true
}

productSchema.statics.deleteProduct = async function (productId) {
    var msg = await this.deleteOne(productId)
    console.log(`deleted ${JSON.stringify(msg)}`)
    return true
}

const productModel = mongoose.model('product', productSchema)

module.exports = productModel
