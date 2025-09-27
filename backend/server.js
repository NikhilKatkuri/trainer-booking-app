require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const trainerRoutes = require("./routes/trainers");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

app.listen(PORT, HOST, () => {
  const ip = require("./tools/ip");
  console.log("Server running on");
  console.log(`http://localhost:${PORT}`);
  ip.getIpAddress()
    .then((ip) => {
      console.log(`http://${ip}:${PORT}`);
    })
    .catch((err) => {
      console.error("Could not retrieve IP address:", err);
    });
});
