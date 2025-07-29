const mongoose = require("mongoose");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const checkCurrentUser = async () => {
  try {
    console.log("🔍 Checking current users in database...");

    // Get the User model
    const User = require("./models/User");

    // Find all users
    const users = await User.find({});

    console.log(`📊 Found ${users.length} users:`);
    console.log("=".repeat(50));

    users.forEach((user, index) => {
      console.log(`${index + 1}. User Details:`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Name: ${user.name}`);
      console.log(`   🔑 Role: ${user.role}`);
      console.log(`   📅 Created: ${user.created}`);
      console.log("   " + "-".repeat(30));
    });

    if (users.length === 0) {
      console.log("❌ No users found in database!");
      console.log("\n💡 To create an admin user:");
      console.log("1. Go to: http://localhost:5173/signup");
      console.log("2. Use email: admin@portfolio.com");
      console.log("3. Use password: admin123456");
      console.log("4. This will automatically create an admin user");
    } else {
      console.log("\n✅ Users found!");
      console.log("\n🔐 To login as admin:");
      console.log("1. Go to: http://localhost:5173/signin");
      console.log("2. Use one of the admin emails above");
      console.log("3. Use the password you created");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

checkCurrentUser();
