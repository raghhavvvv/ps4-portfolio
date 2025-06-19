const express = require('express');
const cors = require('cors');
const app = express();

// Use a permissive CORS policy
app.use(cors({ origin: '*' }));

app.use(express.json());

// --- API ROUTES ---

// Test route (good to keep for debugging)
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello from the test route!" });
});

// Vercel exports the Express app
module.exports = app;