import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  total: Number,
  paymentMethod: String,
  paymentStatus: { type: String, default: "pending" },
  buyerInfo: {
    name: String,
    email: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
