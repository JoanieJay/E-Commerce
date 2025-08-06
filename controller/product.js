const Product = require("../model/Product");

// Get all Products
// Routes GET /api/v1/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get single Product
// Routes GET /api/v1/product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Add Product
// Routes POST /api/v1/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Update Product
// Routes PUT /api/v1/product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        msg: `Product not found with the id of ${req.params.id}`,
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete Product
// Routes DELETE /api/v1/product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
        msg: `Product not found with the id of ${req.params.id}`,
      });
    }
    await product.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
