const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // --- START: New Fields ---
  role: {
    type: String,
    enum: ['super-admin', 'editor'],
    default: 'editor',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  // --- END: New Fields ---
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
