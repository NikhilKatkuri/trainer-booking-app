const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const TrainerProfile = require("../models/TrainerProfile");
const auth = require("../middleware/auth");

// create booking (user)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "user") return res.status(403).json({ message: "Only users can book" });

    const { trainerId, date, startTime, endTime } = req.body;
    const trainer = await TrainerProfile.findById(trainerId);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    // find available slot index
    const slotIndex = trainer.availability.findIndex(s =>
      s.date === date && s.startTime === startTime && s.endTime === endTime && !s.isBooked
    );
    if (slotIndex === -1) return res.status(400).json({ message: "Slot not available" });

    // Create booking
    const booking = await Booking.create({
      trainerId: trainer._id,
      userId: req.user.userId,
      date,
      startTime,
      endTime,
      status: "confirmed"
    });

    // mark slot booked
    trainer.availability[slotIndex].isBooked = true;
    trainer.availability[slotIndex].bookingId = booking._id;
    await trainer.save();

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// trainer's bookings
router.get("/trainer", auth, async (req, res) => {
  try {
    if (req.user.role !== "trainer") return res.status(403).json({ message: "Only trainers can access" });

    const profile = await TrainerProfile.findOne({ userId: req.user.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // list bookings by scanning availability bookingId refs or query Booking model
    const BookingModel = require("../models/Booking");
    const bookings = await BookingModel.find({ trainerId: profile._id }).populate("userId", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// user's bookings
router.get("/user", auth, async (req, res) => {
  try {
    const BookingModel = require("../models/Booking");
    const bookings = await BookingModel.find({ userId: req.user.userId }).populate("trainerId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
