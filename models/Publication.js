const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  authors: [{ type: String, required: true }],
  abstract: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  link: { type: String, required: true }, // Link to the PDF or external site
}, { timestamps: true });

module.exports = mongoose.model('Publication', PublicationSchema);