const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testAuth = async () => {
  try {
    console.log("Testing authentication...");

    // Find admin user
    const adminUser = await User.findOne({ email: "admin@portfolio.com" });

    if (!adminUser) {
      console.log("❌ Admin user not found!");
      return;
    }

    console.log("✅ Admin user found:");
    console.log("   Email:", adminUser.email);
    console.log("   Name:", adminUser.name);
    console.log("   Role:", adminUser.role);
    console.log("   Created:", adminUser.created);

    // Test password
    const testPassword = "admin123456";
    const isPasswordValid = await adminUser.comparePassword(testPassword);

    if (isPasswordValid) {
      console.log("✅ Password is valid");
    } else {
      console.log("❌ Password is invalid");
    }

    // List all users
    const allUsers = await User.find({});
    console.log("\n📋 All users in database:");
    allUsers.forEach((user) => {
      console.log(`   - ${user.email} (${user.role})`);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

testAuth();
