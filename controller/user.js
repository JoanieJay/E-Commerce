const User = require("../model/User");

// Users and Authentication

// Get all Users
// Routes GET /api/users/admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ success: true, count: users.length, data: users });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get single user
// Routes GET /api/auth
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ success: true, data: req.user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Register a user
// Routes POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    const token = user.signedToken();
    return res.status(200).json({ success: true, token, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Login a user
// Routes POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please an email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const token = user.signedToken();
    return res.status(200).json({ success: true, token, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Logout User
// Routes POST /api/auth/logout
exports.logoutUser = async (req, res) => {
  res
    .status(200)
    .json({ success: true, data: {}, message: "User logout successful" });
};

// Update user
// Routes PUT /api/auth/me
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.user;
    let user = await User.findByIdAndUpdate(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `User not found with the id of ${userId}`,
      });
    }
    user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
