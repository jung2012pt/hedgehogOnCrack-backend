const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productInfoSchema = new Schema({


  
  description: String,
  barcode: String,
  weight: Number,
  _product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }

}, { timestamps: true, versionKey: false })

const ProductInfoModel = mongoose.model('ProductInfo', productInfoSchema)

module.exports = ProductInfoModel
