const express = require("express");
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../controller/user");
const User = require("../model/User");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(authorize("admin"), getUser);
router.route("/me").get(protect, getUser).put(protect, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
