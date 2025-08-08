const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  slug: String,
  products: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
});

CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
