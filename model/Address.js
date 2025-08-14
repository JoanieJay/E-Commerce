const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  label: String,
  street: {
    type: String,
    required: [true, "Add a string"],
  },
  city: {
    type: String,
    required: [true, "Add a city"],
  },
  state: {
    type: String,
    required: [true, "Add a state"],
  },
  country: {
    type: String,
    required: [true, "Add a country"],
  },
  zipcode: {
    type: String,
    required: [true, "Add a zipcode"],
  },
  isDefault: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Address", AddressSchema);
