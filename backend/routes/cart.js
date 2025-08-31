import express from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Get current user's cart and user info
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.productId");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      cart: user.cart || [],
      name: user.name || "",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add/update a product in the cart
router.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity, name, price, image } = req.body;

  if (!productId) return res.status(400).json({ error: "Product ID required" });

  try {
    const user = await User.findById(req.userId);

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.qty = quantity; // update quantity
    } else {
      user.cart.push({ productId, qty: quantity, name, price, image });
    }

    await user.save();

    res.json({
      cart: user.cart,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove product from cart
router.post("/remove", authMiddleware, async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
    await user.save();

    res.json({
      cart: user.cart,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
