const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const AuthMiddleWare = (req, res, next) => {
  const token = req.cookies.jwt;

  // 🔴 MUST handle no-token case
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized - No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== 1) {
      return res.json({ msg: "Admin Only" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).json({ err: "Error Admin" });
  }
};

module.exports = { AuthMiddleWare, isAdmin };
