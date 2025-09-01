import mongoose from "mongoose";
import User from "./models/User.js"; // adjust path if needed

const MONGO_URI = "mongodb://127.0.0.1:27017/test"; // replace with your DB

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cleanup = async () => {
  try {
    // 1. Remove duplicates keeping the first
    const duplicates = await User.aggregate([
      {
        $group: {
          _id: "$email",
          ids: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    for (let dup of duplicates) {
      // keep the first id, remove the rest
      const [keep, ...remove] = dup.ids;
      await User.deleteMany({ _id: { $in: remove } });
      console.log(`Removed duplicates for ${dup._id}: ${remove.length} deleted`);
    }

    // 2. Ensure unique index exists
    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log("Unique index on email ensured.");

    console.log("Cleanup complete.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanup();
