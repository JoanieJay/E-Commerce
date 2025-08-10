const CartItem = require("../model/CartItem");

// Add CartItem
// Routes POST /api/cartItem
exports.createCartItem = async (req, res) => {
  try {
    req.body.product = req.params.productId;
    const cartItem = await CartItem.create(req.body);
    res.status(201).json({ success: true, data: cartItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get CartItem
// Routes POST /api/cartItem
exports.getCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.find().populate("Product").exec();
    res
      .status(200)
      .json({ success: true, count: cartItem.length, data: cartItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Update Cart
// Routes PUT /api/:itemId
exports.updateCartItem = async (req, res) => {
  try {
    let cartItem = await CartItem.findByIdAndUpdate(req.params.id);
    if (!cartItem) {
      res.status(404).json({
        success: false,
        msg: `cartitem not found with the id of ${req.params.id}`,
      });
    }
    cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: cartItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete cartItem
// Routes DELETE /api/cartItem
exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      res.status(404).json({
        success: false,
        msg: `Cartitem not found with the id of ${req.params.id}`,
      });
    }
    await cartItem.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
