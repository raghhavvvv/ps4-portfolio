require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected...'))
  .catch(err => console.error(err));

app.get('/api/portfolio-data', async (req, res) => {
  try {
    const [projects, experiences, education] = await Promise.all([
      Project.find(),
      Experience.find(),
      Education.find()
    ]);
    
    // Send all data back in a structured object
    res.json({ projects, experiences, education });

  } catch (err) {
    console.error('❌ ERROR in /api/portfolio-data route:', err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🖥️ Server running on port ${PORT}`));