const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build
app.use(express.static(path.join(__dirname, "client/dist")));

// Import config
const config = require("../config/config.js");

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to MongoDB database: Portfolio");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes - tell server what to do for different URLs
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Root route - what happens when someone visits just "/"
app.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to My Portfolio Backend API</h1>
        <p>Server is running successfully on port ${PORT}</p>
        <h3>Available Endpoints:</h3>
        <ul>
            <li>GET /api/contacts - Get all contacts</li>
            <li>GET /api/projects - Get all projects</li>
            <li>GET /api/qualifications - Get all qualifications</li>
            <li>GET /api/users - Get all users</li>
            <li>POST /api/auth - Authentication endpoints</li>
        </ul>
    `);
});

module.exports = app;
