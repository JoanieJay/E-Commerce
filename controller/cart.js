const Cart = require("../model/Cart");
const Product = require("../model/Product");

// Add Cart
// Routes POST /api/cart
exports.createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ success: false, msg: "Please add a productId and quantity" });
  }
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      msg: `Product not found with the id of ${productId}`,
    });
  }
  let price = product.price;
  const user = req.user;
  let userCart = await Cart.findOne({ user });
  console.log(userCart);
  const cartItem = { productId, quantity, price };
  if (userCart) {
    const existingProduct = userCart.cartItem.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      userCart.cartItem.push(cartItem);
    }
    userCart.total = userCart.cartItem.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    await userCart.save();
  } else {
    userCart = await Cart.create({ user, cartItem, total: quantity });
  }
  return res.status(201).json({ success: true, data: userCart });
};

// Get single Cart
// Routes GET /api/cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return res.status(404).json({ success: false, msg: "Cart empty" });
  }
  return res.status(200).json({ success: true, data: cart });
};
// Update Cart
// Routes GET /api/cart
exports.updateCart = async (req, res) => {
  // let userCart = await Cart.findOne({ user });
  // // let itemId = await Cart.
  return res.status(200).json({ success: true, data: "cart" });
};
// Clear Cart
// Routes GET /api/cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user });
    return res.status(200).json({ success: true, msg: "Cart cleared" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

// Delete cart
// Routes DELETE /api/cart
exports.removeCart = async (req, res) => {
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
