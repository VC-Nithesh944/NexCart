const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/product/:id", async (req, res) => {
  try{
    const productId = parseInt(req.params.id);
    const product = await Product.findById(productId);

    if(!product) {
      res.status(404).json({ message: 'Product not found!'});
    }
    res.json(product);
  } catch(error){
    res.status(500).json({message : 'Server Error'});
  }
  
  
});

router.post("/add", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
});

module.exports = router;
