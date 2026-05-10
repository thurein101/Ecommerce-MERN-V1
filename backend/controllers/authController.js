const mongoose = require("mongoose");
const User = require("../schema/userSchema");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userToken = require("../jwt/userToken.js");
const userSchema = require("../schema/userSchema");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phNo, address, answer } = req.body;

    if (!name) {
      return res.status(400).json({ err: "NAME REQUIRED" });
    }
    if (!email) {
      return res.status(400).json({ err: "EMAIL REQUIRED" });
    }
    if (!password) {
      return res.status(400).json({ err: "PASSWORD REQUIRED" });
    }
    if (!phNo) {
      return res.status(400).json({ err: "PhNo REQUIRED" });
    }
    if (!address) {
      return res.status(400).json({ err: "ADDRESS REQUIRED" });
    }

    //check existing registeration
    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
      return res.status(400).json({ err: "This account already exists" });
    }

    //check password
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phNo,
      address,
      answer,
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: "Server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email) {
      return res.status(400).json({ err: "Email Required" });
    }
    if (!password) {
      return res.status(400).json({ err: "Password Required" });
    }

    //email not registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "Email does not exist" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ err: "Incorrect Password" });
    }

    let token = userToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    });
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phNo: user.phNo,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server error" });
  }
};

const logoutController = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.status(200).json({ msg: "Logout Completed" });
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    //validation
    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }
    if (!answer) {
      return res.status(400).json({ msg: "Answer required" });
    }
    if (!newPassword) {
      return res.status(400).json({ msg: "New Pass required" });
    }

    //check

    const user = await User.findOne({ email, answer });

    if (!user) {
      return res.status(400).json({ msg: "Wrong password or Answer" });
    }

    const hashed = await hashPassword(newPassword);

    const forgotPassword = await User.findByIdAndUpdate(user._id, {
      password: hashed,
    });

    return res.status(200).json(forgotPassword);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const testController = (req, res) => {
  return res.status(200).json("This is good condition");
};

const updateProfileController = async (req, res) => {
  try {
    const { name, password, phNo, address } = req.body;

    // 1. User ကို အရင်ရှာမယ်
    const user = await userSchema.findById(req.user._id);

    // 2. Password validation & hashing (ရှိခဲ့ရင်)
    let hashedPassword;
    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }
      // သင်သုံးနေတဲ့ hashPassword function နဲ့ hash လုပ်ပါ
      hashedPassword = await hashPassword(password);
    }

    // 3. User ကို update လုပ်မယ်
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phNo || user.phone,
        address: address || user.address,
      },
      { new: true }, // Update ဖြစ်ပြီးသား data အသစ်ကို return ပြန်ပေးဖို့
    );

    // 4. အောင်မြင်ကြောင်း response ပြန်မယ်
    res.status(200).send(updatedUser);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      msg: e.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  logoutController,
  forgotPasswordController,
  updateProfileController
};
