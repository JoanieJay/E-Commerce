const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("CartItem", CartItemSchema);
