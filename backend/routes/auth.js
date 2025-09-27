const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const TrainerProfile = require("../models/TrainerProfile");

// register (user or trainer). For trainer, profile object can be provided.
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email & password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });

    if (role === "trainer" && profile) {
      await TrainerProfile.create({ userId: user._id, ...profile });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role, userId: user._id });
    console.log("tokenn",token)
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
