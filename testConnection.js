import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/test";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
