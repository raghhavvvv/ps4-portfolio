const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
  title: String,        // e.g., "Bachelor of Science in Computer Science"
  school: String,
  description: String,
  imageUrl: String,     // URL to the school logo
});

module.exports = mongoose.model('Education', EducationSchema);