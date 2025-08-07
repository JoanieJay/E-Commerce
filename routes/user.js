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
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getUsers);
router.route("/me").get(protect, getUser).put(protect, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
