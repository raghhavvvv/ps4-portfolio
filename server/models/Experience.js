const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  title: String,        // e.g., "Software Engineer Intern"
  company: String,
  description: String,
  imageUrl: String,     // URL to the company logo
});

module.exports = mongoose.model('Experience', ExperienceSchema);