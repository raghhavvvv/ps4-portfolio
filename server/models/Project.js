const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  description: String,
  technologies: [String],
  imageUrl: String,
  liveUrl: String,
  repoUrl: String,
});

module.exports = mongoose.model('Project', ProjectSchema);