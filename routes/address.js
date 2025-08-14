const express = require("express");

const {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/address");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, addAddress).get(protect, getAddress);

router.route("/:id").put(protect, updateAddress).delete(protect, deleteAddress);

module.exports = router;
