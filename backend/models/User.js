import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  qty: { type: Number, required: true, default: 1 },
  image: { type: String, default: "" },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },
  googleId: { type: String },
  cart: { type: [cartItemSchema], default: [] }, // default empty array
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  postalCode: { type: String, default: "" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
