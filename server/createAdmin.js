const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createNewAdmin = async () => {
  try {
    console.log("Creating new admin user...");

    // Delete existing admin user
    await User.deleteOne({ email: "admin@portfolio.com" });
    console.log("Deleted existing admin user");

    // Hash password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("admin123456", salt);

    // Create new admin user
    const adminUser = new User({
      name: "Portfolio Admin",
      email: "admin@portfolio.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ New admin user created successfully!");
    console.log("Email: admin@portfolio.com");
    console.log("Password: admin123456");
    console.log("Role: admin");

    // Test the user
    const testUser = await User.findOne({ email: "admin@portfolio.com" });
    const isPasswordValid = await testUser.comparePassword("admin123456");
    console.log("Password test:", isPasswordValid ? "✅ Valid" : "❌ Invalid");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createNewAdmin();
