// seed.js
import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config(); // load .env variables
const MONGO_URI = process.env.MONGO_URI;

const products = [
  {
    name: "Braai Wood Pack",
    description: "Perfect hardwood pack for braais, locally cut and grown.",
    price: 150,
    image: "https://images.pexels.com/photos/22254/pexels-photo.jpg",
  },
  {
    name: "Charcoal 5kg",
    description: "Premium charcoal for longer braais, produced locally.",
    price: 120,
    image: "https://images.pexels.com/photos/1148633/pexels-photo-1148633.jpeg",
  },
  {
    name: "Classic Beef Biltong",
    description: "Premium air-dried beef strips, traditional South African flavor.",
    price: 120.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Spicy Chilli Biltong",
    description: "Beef biltong with a spicy chili kick for the adventurous eater.",
    price: 130.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Droëwors",
    description: "Traditional dried South African sausage, perfect for snacking.",
    price: 90.0,
    image: "https://images.pexels.com/photos/15309268/pexels-photo-15309268.jpeg"
  },
  {
    name: "Game Biltong Mix",
    description: "A mix of kudu, springbok, and ostrich biltong.",
    price: 150.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Cheese & Herb Biltong",
    description: "Savory biltong infused with cheese and herbs.",
    price: 140.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Smoked Beef Biltong",
    description: "Beef biltong lightly smoked for a rich, aromatic flavor.",
    price: 125.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Spicy Droëwors",
    description: "Dried sausage with a spicy seasoning blend.",
    price: 95.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Garlic Biltong",
    description: "Classic beef biltong with a garlic twist.",
    price: 130.0,
    image: "https://images.pexels.com/photos/5237010/pexels-photo-5237010.jpeg"
  },
  {
    name: "Braaibroodjie Pack",
    description: "Ready-to-grill braaibroodjies packs.",
    price: 50.0,
    image: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg"
  },
  {
    name: "Premium Game Droëwors",
    description: "High-quality dried game sausage mix.",
    price: 160.0,
    image: "https://images.pexels.com/photos/15309268/pexels-photo-15309268.jpeg"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Product.deleteMany(); // clear old products
    await Product.insertMany(products); // insert new products

    console.log("🌱 Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding products:", err);
    process.exit(1);
  }
};

seedProducts();
