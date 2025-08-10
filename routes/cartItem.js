const express = require("express");

const {
  getCartItem,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controller/cartItem");

const router = express.Router();

router.route("/").post(createCartItem).get(getCartItem);

router.route("/:id").put(updateCartItem).delete(deleteCartItem);

module.exports = router;
