// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String } // optional: link to product image
});

const Product = mongoose.model("Product", productSchema);

export default Product;
