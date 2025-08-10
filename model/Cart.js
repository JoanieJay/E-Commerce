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
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
