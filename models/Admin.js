const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // We will store a hashed password, not plain text
});

module.exports = mongoose.model('Admin', AdminSchema);