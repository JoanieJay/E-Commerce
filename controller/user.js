const User = require("../model/User");

// Users and Authentication

// Get all Users
// Routes GET /api/users/admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single user
// Routes GET /api/user/:id/admin
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get me
// Routes PUT /api/user/me
exports.getMe = async (req, res) => {};
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
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login a user
// Routes POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, msg: "Please an email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ success: false, msg: "Invalid credentials" });
    }
    const isMatch = await User.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    const token = user.signedToken();
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
// Routes PUT /api/user/me
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        msg: `User not found with the id of ${req.params.id}`,
      });
    }
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
