const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  slug: String,
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
