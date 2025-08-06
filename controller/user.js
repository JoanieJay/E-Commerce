const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
exports.getMe = async (req, res) => {
  try {
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, process.env.JWT_EXPIRE);
    };
  } catch (err) {}
};
// Register a user
// Routes POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "Please provide all fields" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      token: generateToken(user._id),
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Login a user
// Routes POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
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
