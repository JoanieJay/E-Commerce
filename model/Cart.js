const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: Number,
});

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    cartItem: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
