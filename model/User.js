const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email"],
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
  //   addresses: Address[],
  //   orders: Order[],
});

module.exports = mongoose.model("User", UserSchema);
