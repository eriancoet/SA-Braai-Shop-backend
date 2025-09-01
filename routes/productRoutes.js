// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ===== GET all products =====
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    // Convert _id to id for frontend
    const formattedProducts = products.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image
    }));

    res.json(formattedProducts);
  } catch (err) {
    console.error("Error fetching products:", err.message); // log full error
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ===== Add a new product =====
router.post("/", async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "Name, price, and image are required" });
  }

  try {
    const product = new Product({ name, price, description, image });
    await product.save();

    // Return formatted product with id
    const formattedProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image
    };

    res.status(201).json(formattedProduct);
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ message: "Failed to add product" });
  }
});

export default router;
