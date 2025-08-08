const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Please add a title"],
      maxlength: [30, "Title should not be more than 30 words"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
    },
    images: {
      type: String,
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
