const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please add a valid email"],
  },
  password: {
    type: String,
    minlength: [6, "Password cannot be less than 6"],
    required: [true, "Please put in password"],
  },
  role: {
    type: String,
    enum: ["admin", "client"],
  },
  // addresses:
  //   Address[
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Adrress",
  //       required: true,
  //     }
  //   ],
  // orders:
  //   Order[
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Order",
  //       required: true,
  //     }
  //   ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.signedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(15).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
