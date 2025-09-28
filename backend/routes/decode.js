const jwt = require("jsonwebtoken");

const token = "8c0d3a5f4e9a1b7d2c8f6e9a3d1c7f4b0a6d9e2c5f7b8a1d3c6e9f0b2a4d8c7";

// Decode without verifying signature
const decoded = jwt.decode(token, { complete: true });
console.log(decoded);
