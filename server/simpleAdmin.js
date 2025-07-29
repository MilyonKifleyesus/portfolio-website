const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createSimpleAdmin = async () => {
  try {
    console.log("Creating simple admin user...");

    // Create a simple user schema for testing
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
    });

    const User = mongoose.model("User", userSchema);

    // Delete existing admin
    await User.deleteOne({ email: "admin@portfolio.com" });

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123456", 12);

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: "admin@portfolio.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created!");
    console.log("Email: admin@portfolio.com");
    console.log("Password: admin123456");

    // Test login
    const foundUser = await User.findOne({ email: "admin@portfolio.com" });
    const isValid = await bcrypt.compare("admin123456", foundUser.password);
    console.log("Password test:", isValid ? "✅ Valid" : "❌ Invalid");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createSimpleAdmin();
