const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const contactRoutes = require('./server/routes/contactRoutes');
const projectRoutes = require('./server/routes/projectRoutes');
const qualificationRoutes = require('./server/routes/qualificationRoutes');
const userRoutes = require('./server/routes/userRoutes');
const authRoutes = require('./server/routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import config
const config = require('./config/config.js');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build
app.use(express.static(path.join(__dirname, 'client/dist')));

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB database: Portfolio");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// API Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to My Portfolio Backend API</h1>
    <p>Server is running successfully on port ${PORT}</p>
    <h3>Available Endpoints:</h3>
    <ul>
        <li>GET /api/contacts - Get all contacts</li>
        <li>POST /api/contacts - Create new contact</li>
        <li>GET /api/contacts/:id - Get contact by ID</li>
        <li>PUT /api/contacts/:id - Update contact by ID</li>
        <li>DELETE /api/contacts/:id - Delete contact by ID</li>
        <li>DELETE /api/contacts - Delete all contacts</li>
        
        <li>GET /api/projects - Get all projects</li>
        <li>POST /api/projects - Create new project</li>
        <li>GET /api/projects/:id - Get project by ID</li>
        <li>PUT /api/projects/:id - Update project by ID</li>
        <li>DELETE /api/projects/:id - Delete project by ID</li>
        <li>DELETE /api/projects - Delete all projects</li>
        
        <li>GET /api/qualifications - Get all qualifications</li>
        <li>POST /api/qualifications - Create new qualification</li>
        <li>GET /api/qualifications/:id - Get qualification by ID</li>
        <li>PUT /api/qualifications/:id - Update qualification by ID</li>
        <li>DELETE /api/qualifications/:id - Delete qualification by ID</li>
        <li>DELETE /api/qualifications - Delete all qualifications</li>
        
        <li>GET /api/users - Get all users</li>
        <li>POST /api/users - Create new user</li>
        <li>GET /api/users/:id - Get user by ID</li>
        <li>PUT /api/users/:id - Update user by ID</li>
        <li>DELETE /api/users/:id - Delete user by ID</li>
        <li>DELETE /api/users - Delete all users</li>
        
        <li>POST /api/auth/signup - User signup</li>
        <li>POST /api/auth/signin - User signin</li>
        <li>POST /api/auth/signout - User signout</li>
    </ul>
  `);
});

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", PORT);
});