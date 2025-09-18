import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"; // ✅ make sure file is named cartRoutes.js

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/cart", cartRoutes); // ✅ new cart routes

// Server listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
