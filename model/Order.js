const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  items: [OrderItemSchema],
  totalAmount: Number,
  enum: {
    status: ["pending", "paid", "shipped", "cancelled"],
  },
  shippingAddress: {
    type: mongoose.Schema.ObjectId,
    ref: "Address",
    required: [true],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
