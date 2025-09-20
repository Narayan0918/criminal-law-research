const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true, default: 'Online' }, // Can be a physical address or a virtual link
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);