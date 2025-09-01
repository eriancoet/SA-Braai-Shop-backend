import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get current user info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ name: user.name, email: user.email, cart: user.cart });
  } catch (err) {
    console.error("GET /me error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user's cart
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.productId");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.cart || []);
  } catch (err) {
    console.error("GET /cart error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Add/update a single item in the cart
router.post("/cart/item", authMiddleware, async (req, res) => {
  try {
    const { productId, qty, name, price, image } = req.body;
    if (!productId || !qty) return res.status(400).json({ error: "Product ID and quantity are required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.qty = qty;
    } else {
      user.cart.push({ productId, qty, name, price, image });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error("POST /cart/item error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Remove product from cart
router.post("/cart/remove", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Product ID is required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.json(user.cart);
  } catch (err) {
    console.error("POST /cart/remove error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Save checkout info
router.post("/checkout", authMiddleware, async (req, res) => {
  const { name, email, address, city, country, postalCode } = req.body;

  if (!name || !email || !address || !city || !country || !postalCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    user.email = email;
    user.address = address;
    user.city = city;
    user.country = country;
    user.postalCode = postalCode;

    await user.save();
    res.json({ message: "Checkout info saved", user });
  } catch (err) {
    console.error("POST /checkout error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
