const express = require("express");

const {
  getCart,
  createCart,
  updateCart,
  clearCart,
  removeCartItem,
} = require("../controller/cart");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createCart).get(protect, getCart);

router.route("/:id").put(protect, updateCart).delete(protect, removeCartItem);

router.route("/clear").delete(protect, clearCart);

module.exports = router;
