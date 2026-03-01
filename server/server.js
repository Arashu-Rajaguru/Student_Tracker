// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // MUST be at the top

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: "http://localhost:5173", // React (Vite) frontend
  credentials: true
}));

app.use(express.json()); // to read JSON body

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* =========================
   MONGODB CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
  });

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

console.log("ENV CHECK:", process.env.MONGO_URI);

