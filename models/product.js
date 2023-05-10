const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  price: Number,
  title: String,
  subtitle: String,
  category: String,
  tags: [String]
}, { timestamps: true, versionKey: false })

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
