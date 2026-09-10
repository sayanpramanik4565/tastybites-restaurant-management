const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Create Order
router.post("/", protect, createOrder);

// Get My Orders
router.get("/my-orders", protect, getMyOrders);

// Get All Orders - Admin
router.get("/all", protect, adminOnly, getAllOrders);

// Update Order Status - Admin
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;