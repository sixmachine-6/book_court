const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

// 🔐 Sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 🍪 Create & Send Token
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: "lax", // 🔥 add this
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: {
        _id: user._id,
        email: user.email,
      },
    },
  });
};

exports.signup = async (req, res) => {
  try {
    let { email } = req.body;
    console.log(email);
    // 1. Validate
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email is required",
      });
    }

    if (!email.endsWith("iitbbs.ac.in")) {
      return res.status(400).json({
        status: "fail",
        message: "College Email is required",
      });
    }
    // 2. Normalize
    email = email.toLowerCase().trim();

    // 3. Check duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists",
      });
    }

    // 4. Create user
    const newUser = await User.create({ email });

    // 5. Send token + cookie
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email } = req.body;

    // 1️⃣ Validate
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email",
      });
    }

    // 2️⃣ Normalize (same as signup)
    email = email.toLowerCase().trim();

    // 3️⃣ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found. Please sign up first.",
      });
    }

    // 4️⃣ Send token using your helper
    createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Login failed",
    });
  }
};

// protect.js
exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not logged in" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { id: decoded.id };

  next();
};

exports.logout = (req, res) => {
  try {
    // 🔥 Clear JWT cookie (if you are using cookies)
    res.cookie("jwt", "", {
      expires: new Date(0),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Logout failed",
    });
  }
};
