const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId : Number,
    name : String,
    price : Number,
    quantity : Number
});

const CartItems = mongoose.model('CartItems', cartItemSchema);

module.exports = CartItems