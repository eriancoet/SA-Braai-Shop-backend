// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new product
router.post("/", async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const product = new Product({ name, price, description, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
