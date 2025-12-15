const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc Register new user
 * @route POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "All fields required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ msg: "Username already taken" });

    const user = await User.create({ username, password });

    res.status(201).json({
      msg: "User registered successfully",
      username: user.username
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "All fields required" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token,
      username: user.username
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
