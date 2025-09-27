const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "TrainerProfile", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: String,
  startTime: String,
  endTime: String,
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "confirmed" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
