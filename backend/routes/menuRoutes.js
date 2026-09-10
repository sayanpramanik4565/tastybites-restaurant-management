const express = require("express");

const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");


// Public - Get all menu items
router.get("/", getMenuItems);


// Public - Get single menu item
router.get("/:id", getMenuItemById);


// Admin only - Create menu item with image
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createMenuItem
);


// Admin only - Update menu item with image
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateMenuItem
);


// Admin only - Delete menu item
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMenuItem
);


module.exports = router;