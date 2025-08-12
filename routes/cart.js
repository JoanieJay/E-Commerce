const express = require("express");

const {
  getCart,
  createCart,
  updateCart,
  clearCart,
} = require("../controller/cart");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createCart);

router.route("/:id").get(getCart).put(updateCart).delete(clearCart);

module.exports = router;
