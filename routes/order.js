const express = require("express");

const { createOrder } = require("../controller/order");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(createOrder);
