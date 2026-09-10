const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Admin only - Get all users
router.get("/", protect, adminOnly, getAllUsers);

// Admin only - Update user role
router.put("/:id", protect, adminOnly, updateUserRole);

// Admin only - Delete user
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;