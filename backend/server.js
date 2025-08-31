// server.js
import 'dotenv/config'; // automatically loads .env

import path from "path";
import { fileURLToPath } from "url";



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cartRoutes from "./routes/cart.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import payfastRoutes from "./payfast.js";
import contactRoutes from "./routes/contactRoutes.js";

// Passport strategy (uses env vars)
import "./passport.js"; // MUST come after dotenv/config



const app = express();
// Needed because you're using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET || "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/contact", contactRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err.message));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payfast", payfastRoutes);
app.use("/api/users/cart", cartRoutes);


// Serve React frontend
app.use(express.static(path.join(__dirname, "frontend/build")));

// Handle all other routes with React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
