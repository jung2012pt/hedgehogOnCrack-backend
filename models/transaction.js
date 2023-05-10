const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transacTionSchema = new Schema({



    description: String,
    //   description: String,
    //   weight: Number,
    _product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


}, { timestamps: true, versionKey: false })

const TransactionModel = mongoose.model('Transaction', transacTionSchema)

module.exports = TransactionModel
