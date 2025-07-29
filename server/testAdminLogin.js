const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testAdminLogin = async () => {
  try {
    console.log("Testing admin login...");

    // Get the User model
    const User = require("./models/User");

    // Check if admin user exists
    const adminUser = await User.findOne({ email: "admin@portfolio.com" });

    if (!adminUser) {
      console.log("❌ Admin user not found! Creating one...");

      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123456", salt);

      const newAdmin = new User({
        name: "Admin User",
        email: "admin@portfolio.com",
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      console.log("✅ Admin user created successfully!");
      console.log("Email: admin@portfolio.com");
      console.log("Password: admin123456");
      console.log("Role: admin");
    } else {
      console.log("✅ Admin user found!");
      console.log("Email:", adminUser.email);
      console.log("Role:", adminUser.role);

      // Test password
      const isPasswordValid = await bcrypt.compare(
        "admin123456",
        adminUser.password
      );
      console.log("Password valid:", isPasswordValid);

      if (isPasswordValid) {
        // Generate token
        const token = jwt.sign(
          { userId: adminUser._id },
          process.env.JWT_SECRET || "portfolio_secret_key",
          { expiresIn: "7d" }
        );

        console.log("✅ Login successful!");
        console.log("Token generated:", token.substring(0, 50) + "...");
      } else {
        console.log("❌ Password is incorrect!");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

testAdminLogin();
