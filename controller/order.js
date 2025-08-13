const Order = require("../model/Order");

// Add an Order
// Routes  POST /api/order
exports.createOrder = async (req, res) => {
  return res.status(200).json({ success: true, msg: "Hello there" });
};
