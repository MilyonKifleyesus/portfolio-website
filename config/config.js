const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://millikifleyesus:PZzRf84p2NJcX4tG@portfolio.26fxw3c.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio" ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};
module.exports = {
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
};
