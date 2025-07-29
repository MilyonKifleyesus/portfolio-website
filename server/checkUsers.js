const mongoose = require("mongoose");
const config = require("../config/config.js");

mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const checkUsers = async () => {
  try {
    console.log("Checking users in database...");

    // Get the User model
    const User = require("./models/User");

    // Find all users
    const users = await User.find({});

    console.log(`Found ${users.length} users:`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${user.created}`);
      console.log("   ---");
    });

    if (users.length === 0) {
      console.log("No users found in database!");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

checkUsers();
