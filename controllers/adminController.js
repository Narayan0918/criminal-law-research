const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');

// Generate JWT (no changes here)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// --- START: Updated Public Registration Logic ---
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    res.status(400);
    throw new Error('Admin with that username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Check if this is the first admin ever
  const isFirstAdmin = (await Admin.countDocuments({})) === 0;

  const admin = await Admin.create({
    username,
    password: hashedPassword,
    isApproved: isFirstAdmin, // First admin is auto-approved
    role: isFirstAdmin ? 'super-admin' : 'editor', // First admin is super-admin
  });

  if (admin) {
    if (admin.isApproved) {
      // If approved (only the first admin), log them in immediately
      res.status(201).json({
        _id: admin.id,
        username: admin.username,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      // For subsequent registrations
      res.status(201).json({ message: 'Registration successful! Please wait for approval.' });
    }
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});
// --- END: Updated Public Registration Logic ---

// --- START: Updated Login Logic ---
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  // Add a check for approval status
  if (admin && !admin.isApproved) {
    res.status(403); // Forbidden
    throw new Error('Your account has not been approved yet.');
  }

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      username: admin.username,
      role: admin.role, // Send the role to the frontend
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});
// --- END: Updated Login Logic ---

// --- START: New Functions for Admin Management ---
// @desc    Get all admins
// @route   GET /api/admins
// @access  Super-admin only
const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select('-password');
  res.status(200).json(admins);
});

// @desc    Approve an admin
// @route   PUT /api/admins/:id/approve
// @access  Super-admin only
const approveAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }
  admin.isApproved = true;
  const updatedAdmin = await admin.save();
  res.status(200).json(updatedAdmin);
});

// @desc    Delete an admin
// @route   DELETE /api/admins/:id
// @access  Super-admin only
const deleteAdmin = asyncHandler(async (req, res) => {
    // Prevent a super-admin from deleting their own account
    if(req.params.id === req.admin.id.toString()) {
        res.status(400);
        throw new Error('You cannot delete your own account.');
    }
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        res.status(404);
        throw new Error('Admin not found');
    }
    await admin.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Admin removed' });
});
// --- END: New Functions for Admin Management ---

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  approveAdmin,
  deleteAdmin,
};
