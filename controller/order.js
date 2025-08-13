const Order = require("../model/Order");
const Cart = require("../model/Cart");

// Add an Order
// Routes  POST /api/order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ success: false, msg: "Cart is empty" });
    }
    if (!cart.cartItem && !cart.cartItem.length === 0) {
      return res.status(400).json({ success: false, msg: "No items in cart" });
    }
    const orderData = {
      userId: userId,
      items: cart.cartItem,
      totalAmount: cart.total,
      shippingAddress: req.body.shippingAddress,
      status: "pending",
      createdAt: Date.now(),
    };
    const newOrder = Order.create(orderData);
    await Cart.findOneAndDelete(cart.items);
    cart.total = 0;
    await cart.save();
    return res.status(200).json({
      success: true,
      msg: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
