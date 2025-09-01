import express from "express";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Place order
router.post("/checkout", auth, async (req, res) => {
  try {
    const { cart, total, paymentMethod, buyerInfo } = req.body;

    const order = new Order({
      userId: req.userId,
      cart,
      total,
      paymentMethod,
      buyerInfo,
      paymentStatus: "pending",
    });

    await order.save();
    res.json({ message: "Order created", orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
