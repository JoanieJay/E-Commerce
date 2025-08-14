const express = require("express");

const {
  createOrder,
  getMyOders,
  getOrdersById,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controller/order");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getMyOders);
router.route("/admin").get(protect, authorize("admin"), getOrders);
router.route("/admin/:id").put(protect, authorize("admin"), updateOrderStatus);
router.route("/:id").get(protect, getOrdersById);
router.route("/:id/cancel").put(protect, cancelOrder);

module.exports = router;
