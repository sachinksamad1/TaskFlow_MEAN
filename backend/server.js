// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();

// --- Middlewares ---
// Enable CORS for all origins (adjust for production later)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// --- Simple Test Route ---
app.get('/', (req, res) => {
  res.send('TaskFlow API is running!');
});

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000; // Default to 5000 if not set

if (!MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in .env file');
  process.exit(1); // Exit if DB connection string is missing
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    // Start listening only after DB connection is successful
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// --- API Routes (will be added in Step 5) ---
// const taskRoutes = require('./routes/taskRoutes');
// app.use('/api/tasks', taskRoutes);

// backend/server.js (add these lines)
const taskRoutes = require('./routes/taskRoutes'); // Require the router
app.use('/api/tasks', taskRoutes); // Mount it under /api/tasks