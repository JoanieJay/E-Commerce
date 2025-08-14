const Order = require("../model/Order");
const { Cart } = require("../model/Cart");

// Add an Order
// Routes  POST /api/order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, msg: "Cart does not exist" });
    }
    if (cart.cartItem.length === 0) {
      return res.status(400).json({ success: false, msg: "No items in cart" });
    }
    const orderData = {
      userId: userId,
      items: cart.cartItem,
      totalAmount: cart.total,
      //   shippingAddress: req.body.shippingAddress,
      status: "pending",
      createdAt: Date.now(),
    };
    const newOrder = await Order.create(orderData);
    // if (orderData) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "Order already exists" });
    // }
    // await Cart.findOneAndDelete({ user: req.user });
    return res.status(201).json({
      success: true,
      msg: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get an Order
// Routes  POST /api/order
exports.getMyOders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get Order by id
// Routes  POST /api/order/:id
exports.getOrdersById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ success: true, data: "Order not found" });
    }
    if (order.userId != userId && req.user.role != "admin") {
      return res
        .status(400)
        .json({ success: true, data: "Not authorized to view this order" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get all orders
// Routes  POST /api/order/:id
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Update orders
// Routes  PUT /api/order/admin/:id
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ success: false, msg: "Order not found" });
    }
    if (!status) {
      return res
        .status(400)
        .json({ success: false, msg: "Please add a status" });
    }
    if (order.status === status) {
      return res.status(400).json({
        success: false,
        msg: "New status cannot be the same as previous the one",
      });
    }
    order.status = newStatus;
    await order.save();

    return res.status(200).json({
      success: true,
      msg: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Cancel orders
// Routes  PUT /api/order/admin/:id
exports.cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  const order = await Order.findById(orderId);
  try {
    if (!order) {
      return res.status(400).json({ success: false, msg: "Order not found" });
    }
    if (order.status != "pending") {
      return res
        .status(400)
        .json({ success: false, msg: "Order cannot be cancelled" });
    }
    if (order.userId != userId && req.user.role != "admin") {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }
    order.status = "cancelled";
    await order.save();

    return res
      .status(200)
      .json({ success: true, msg: "Order cancelled successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
