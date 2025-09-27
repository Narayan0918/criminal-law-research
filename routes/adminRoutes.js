const express = require("express");
const router = express.Router();
module.exports = router;
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  approveAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const { protect, isSuperAdmin } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Super-admin only routes
router.route("/").get(protect, isSuperAdmin, getAllAdmins);
router.route("/:id").delete(protect, isSuperAdmin, deleteAdmin);
router.route("/:id/approve").put(protect, isSuperAdmin, approveAdmin);

module.exports = router;
