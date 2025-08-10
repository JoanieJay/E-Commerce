const express = require("express");

const {
  getCarts,
  getCart,
  createCart,
  deleteCart,
} = require("../controller/cart");

const router = express.Router();

router.route("/").get(getCarts).post(createCart);

router.route("/:id").get(getCart).delete(deleteCart);

module.exports = router;
