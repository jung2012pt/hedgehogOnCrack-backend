const config = require("../config/auth.config");
const TransactionModel = require("../models/transaction");
// const User = db.user;
// const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createTransaction = (req, res) => {
    console.log(req.body);
    const transaction = new TransactionModel({
        _user: req.body.userId,
        _product: req.body.productId
    });


    transaction.save((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send(transaction);
    });

};

exports.getTransactions = async (req, res) => {
    let userId = req.params.userId
    const transaction = await TransactionModel.find({
        _user: userId,
    }).populate('_user _product')
    .sort( { createdAt: -1 } )
    return res.status(200).send(transaction);
};

exports.getTransactionDetail = async (req, res) => {
    let transactionId = req.params.transactionId


    try {
        const transaction = await TransactionModel.findById(transactionId).populate('_user _product')
        return res.status(200).send(transaction);
    } catch (err) {
        this.next(err);
    }
};