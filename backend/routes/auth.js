// src/routes/auth.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const router = express.Router();

// =======================
// Email/Password Routes
// =======================

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email: normalizedEmail, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "120d" });
    res.json({ token, userId: user._id, name: user.name });
  } catch (err) {
    // handle duplicate key error just in case
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // If user has no password (created via Google), block password login
    if (!user.password) return res.status(400).json({ error: "Use Google login for this account" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "120d" });
    res.json({ token, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Google OAuth Routes
// =======================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase().trim();

        // Use findOneAndUpdate with upsert to avoid duplicates
        const user = await User.findOneAndUpdate(
          { email }, // query by email
          {
            $setOnInsert: {
              name: profile.displayName,
              password: Math.random().toString(36).slice(-10), // random password
            },
            $set: { googleId: profile.id }, // always set googleId
          },
          { new: true, upsert: true } // create if doesn't exist, return the new doc
        );

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);



// Google login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "120d" });
    const name = req.user.name;
    // Redirect to frontend login page with token and name
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}&name=${name}`);
  }
);

export default router;
