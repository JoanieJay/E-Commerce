const mongoose = require("mongoose");
const { CartItemSchema } = require("./Cart");

// const OrderItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   productId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  items: [CartItemSchema],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "cancelled"],
    default: "pending",
  },
  shippingAddress: {
    type: mongoose.Schema.ObjectId,
    ref: "Address",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
