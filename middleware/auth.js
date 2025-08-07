const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: "Not Authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ msg: "Not Authorized, No Token" });
  }
};

module.exports = { protect };
