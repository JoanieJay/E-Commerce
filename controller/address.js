const Address = require("../model/Address");

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    let address = await Address.findOne({ userId });
    if (address) {
      return res
        .status(400)
        .json({ success: false, msg: "User already has an address" });
    }
    const { label, street, city, state, country, zipcode, isDefault } =
      req.body;
    if (
      !label ||
      !street ||
      !city ||
      !state ||
      !country ||
      !zipcode ||
      !isDefault
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    address = {
      userId: userId,
      label: req.body.label,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
      isDefault: req.body.isDefault,
    };

    const newAddress = await Address.create(address);
    return res.status(201).json({ success: true, data: newAddress });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get Address
// Routes GET /api/address
exports.getAddress = async (req, res) => {
  try {
    const address = await Address.find();
    res
      .status(200)
      .json({ success: true, count: address.length, data: address });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Address
// Routes PUT /api/address/:id
exports.updateAddress = async (req, res) => {
  try {
    let address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({
        success: false,
        msg: `Address not found with the id of ${req.params.id}`,
      });
    }
    address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({ success: true, data: address });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Delete address
// Routes DELETE /api/address/:id
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      res.status(404).json({
        success: false,
        msg: `Address not found with the id of ${req.params.id}`,
      });
    }
    await address.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
