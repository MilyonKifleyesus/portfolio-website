const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdminUser = async () => {
  try {
    console.log("🔧 Setting up admin user...");

    // Get the User model
    const User = require("./models/User");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@portfolio.com" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists!");
      console.log("📧 Email:", existingAdmin.email);
      console.log("🔑 Role:", existingAdmin.role);
      console.log("👤 Name:", existingAdmin.name);
      console.log("\n🎯 You can now login with:");
      console.log("   Email: admin@portfolio.com");
      console.log("   Password: admin123456");
      return;
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123456", salt);

    const adminUser = new User({
      name: "Admin User",
      email: "admin@portfolio.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@portfolio.com");
    console.log("🔑 Password: admin123456");
    console.log("👤 Role: admin");
    console.log("\n🎯 You can now login and access the admin dashboard!");
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
