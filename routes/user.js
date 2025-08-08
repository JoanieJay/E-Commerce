const express = require("express");
const {
  getUsers,
  getUser,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotPassword,
} = require("../controller/user");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, authorize("admin"), getUsers);
router.route("/:id").get(protect, authorize("admin"), getUserById);
router.route("/me").get(protect, getUser).put(protect, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
