const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    cartItem: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Cart Item",
      },
    ],
    total: {
      type: Number,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Cart", CartSchema);
