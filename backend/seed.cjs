const mongoose = require("mongoose");
const Product = require("./models/Product"); // adjust path if needed

const products = [
  {
    name: "Braai Wood Pack",
    description: "Perfect hardwood pack for braais",
    price: 150,
    image: "https://example.com/braaiwood.jpg"
  },
  {
    name: "Charcoal 5kg",
    description: "Premium charcoal for longer braais",
    price: 120,
    image: "https://example.com/charcoal.jpg"
  }
];

mongoose.connect("mongodb+srv://eriancoet:jam69nuT!@jobportal.jo5x9br.mongodb.net/")
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await Product.deleteMany(); // clear old products
    await Product.insertMany(products);
    console.log("🌱 Products seeded successfully");
    process.exit();
  })
  .catch(err => console.error(err));
