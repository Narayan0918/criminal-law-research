const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true }, // Will hold HTML from rich-text editor
  author: { type: String, required: true, default: 'Admin' },
  tags: [{ type: String, trim: true }],
  isPublished: { type: Boolean, default: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Blog', BlogSchema);