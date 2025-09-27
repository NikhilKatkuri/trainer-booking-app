const mongoose = require("mongoose");

const AvailabilitySlotSchema = new mongoose.Schema({
  date: String,         // "YYYY-MM-DD"
  startTime: String,    // "09:00"
  endTime: String,      // "09:30"
  isBooked: { type: Boolean, default: false },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", default: null }
});

const TrainerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  bio: String,
  expertise: [String],
  hourlyRate: Number,
  phone: String,
  location: String,
  availability: [AvailabilitySlotSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TrainerProfile", TrainerProfileSchema);
