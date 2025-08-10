const Cart = require("../model/Cart");

// Add Cart
// Routes POST /api/cart
exports.createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({ success: true, data: cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get all carts
// Routes GET /api/carts
exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ success: true, count: carts.length, data: carts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get single Cart
// Routes GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.product");
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete cart
// Routes DELETE /api/cart
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      res.status(404).json({
        success: false,
        msg: `Cart not found with the id of ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
