const express = require("express");
const {
  getUsers,
  getUser,
  getMe,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../controller/user");
const User = require("../model/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getUsers);
router.route("/").get(getMe);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.route("/:id").get(getUser).put(updateUser);

module.exports = router;
