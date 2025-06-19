const express = require('express');
const cors = require('cors');
const app = express();

// Import the local JSON data directly
const portfolioData = require('./data.json');

// Use a permissive CORS policy
app.use(cors({ origin: '*' }));

app.use(express.json());

// --- API ROUTES ---

// Test route (good to keep for debugging)
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello from the test route!" });
});

// Main data route now simply sends the imported JSON object
app.get('/api/portfolio-data', (req, res) => {
  // No async, no try/catch, no database connection needed!
  res.status(200).json(portfolioData);
});

// Vercel exports the Express app
module.exports = app;