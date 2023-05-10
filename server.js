const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
const ProductInfo = require('./models/productinfo')
const controller = require("./controller/auth.controller");
const tansactionController = require("./controller/tansaction.controller");

const logger = require('morgan')
const MONGODB_URI = "mongodb+srv://francemessi:france090@cluster0.d1xg1o6.mongodb.net/resfullAPI?retryWrites=true&w=majority"
const PORT = process.env.PORT || 9000
var bodyParser = require('body-parser')
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(
  () => {

    console.log("Hello succ");
  },
  err => {
    console.log("gggggg");
  }
);

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})
const cors = require('cors');
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://www.google.com/']
// }));
// app.use(cors({
//   origin: '*'
// }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(logger('short'))
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})
app.get('/productsinfo', async (req, res) => {
  const productsinfo = await ProductInfo.find({})
  res.json(productsinfo)
})

app.get('/productsinfo/:id', async (req, res) => {
  const { id } = req.params
  const productsinfo = await ProductInfo.findById(id)
  res.json(productsinfo)
})
app.get('/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
    const productinfo = await ProductInfo.findOne({ _product: id })

    res.json({ product, productinfo })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/products', async (req, res) => {
  const payload = req.body
  console.log(payload);
  console.log(req.body);

  try {
    const product = new Product(payload)
    await product.save()
    const productInfo = new ProductInfo({
      description: payload.description,
      barcode: payload.barcode,
      weight: payload.weight,
      _product: product._id
    })
    await productInfo.save()
    res.status(201).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/products/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  try {
    const product = await Product.findByIdAndUpdate(id, { $set: payload })
    res.json(product)
  } catch (error) {
    res.status(400).json(error)
  }
})
app.put('/productsinfo/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  try {
    const productInfo = await ProductInfo.findByIdAndUpdate(id, { $set: payload })
    res.json(productInfo)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error)
  }
})
app.delete('/productsinfo/:id', async (req, res) => {
  const { id } = req.params

  try {
    await ProductInfo.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post(
  "/api/auth/signup",
  // [
  //   verifySignUp.checkDuplicateUsernameOrEmail,
  //   verifySignUp.checkRolesExisted
  // ],
  controller.signup
);

app.post("/api/auth/signin", controller.signin);
app.get("/api/auth/signin", controller.signin);

app.post("/api/auth/signout", controller.signout);

app.post("/api/user/:userId/transaction", tansactionController.createTransaction);
app.get("/api/user/:userId/transaction", tansactionController.getTransactions);
app.get("/api/user/:userId/transaction/:transactionId", tansactionController.getTransactionDetail);


app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})

