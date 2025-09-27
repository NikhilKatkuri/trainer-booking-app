const express = require("express");
const router = express.Router();
const TrainerProfile = require("../models/TrainerProfile");
const auth = require("../middleware/auth");

// list trainers (public)
router.get("/", async (req, res) => {
  try {
    const trainers = await TrainerProfile.find().populate("userId", "name email");
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// get by id
router.get("/:id", async (req, res) => {
  try {
    const trainer = await TrainerProfile.findById(req.params.id).populate("userId", "name email");
    if (!trainer) return res.status(404).json({ message: "Not found" });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// create/update profile (trainer only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "trainer") return res.status(403).json({ message: "Only trainers can create profiles" });

    const payload = req.body; // bio, expertise, hourlyRate, phone, location, availability
    let profile = await TrainerProfile.findOne({ userId: req.user.userId });
    if (profile) {
      // update
      Object.assign(profile, payload);
      await profile.save();
    } else {
      profile = await TrainerProfile.create({ userId: req.user.userId, ...payload });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
