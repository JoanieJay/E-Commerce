const Category = require("../model/Category");

// Get all Categories
// Routes GET /api/v1/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get single Category
// Routes GET /api/v1/category
exports.getCategory = async (req, res) => {
  try {
    const category = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Add Product
// Routes POST /api/v1/categories
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Update Category
// Routes PUT /api/v1/category
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findByIdAndUpdate(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        msg: `Category not found with the id of ${req.params.id}`,
      });
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete Product
// Routes DELETE /api/v1/product
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        msg: `category not found with the id of ${req.params.id}`,
      });
    }
    await Category.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
