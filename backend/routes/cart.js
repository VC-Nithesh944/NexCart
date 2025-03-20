const express = require('express');
const router = express.Router();

const Product = require("../models/Product");
const CartItems = require("../models/CartItems");

//To get the cart items
router.get('/cart', async (req, res) => {
  try{
    const cartItems = await CartItems.find();
    res.json(cartItems);
  }catch(error){
    res.status(500).json({ message : 'Server Error'});
  }
})


//To add items to the cart checking for the item, if present increase else add new
router.post('/add-to-cart/:id' , async (req, res) => {
  try {
    
    const productId = parseInt(req.params.id);
    const product = Product.findById(productId);
  
    if (!product){
      res.status(404).json({ message : "Product not found!!"});
    }
  
     let existingItem = await CartItems.findOne({productId});
    if (existingItem){
      existingItem.quantity++;
      await existingItem.save();
    }
    else{
      existingItem = new CartItems({
        productId,
        name : product.name ,
        price : product.price,
        quantity: 1,
      });
      
      await existingItem.save();
    }
    res.json(existingItem);

  }catch(error){
    res.status(500).json({ message : 'Server Error'});
  }
})

module.exports = router;