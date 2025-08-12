const express = require("express");

const {
  getCart,
  createCart,
  updateCart,
  clearCart,
} = require("../controller/cart");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createCart).get(getCart);

router.route("/:id").put(updateCart);

router.route("/clear").delete(clearCart);

module.exports = router;
