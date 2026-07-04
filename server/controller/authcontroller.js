const User = require("../models/user");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { employeeId, email, password, role } =
      req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      employeeId,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  res.json({
    message: "Login Success",
  });
};

module.exports = {
  registerUser,
  loginUser,
};