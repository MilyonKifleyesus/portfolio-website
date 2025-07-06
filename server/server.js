import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import contactRoutes from "./server/routes/contactRoutes.js";
import projectRoutes from "./server/routes/projectRoutes.js";
import qualificationRoutes from "./server/routes/qualificationRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import authRoutes from "./server/routes/authRoutes.js";

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
import config from "../config/config.js";

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

// Routes - tell server what to do for differnt URLS
app.use("/api/contact", contactRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/qualification", qualificationRoutes);
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
        </ul>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
