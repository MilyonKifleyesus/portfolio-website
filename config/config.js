const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "portfolio_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://millikifleyesus:PZzRf84p2NJcX4tG@portfolio.26fxw3c.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio" ||
    "mongodb://localhost:27017/portfolio",
};

module.exports = config;
