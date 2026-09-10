const MenuItem = require("../models/MenuItem");
const cloudinary = require("../config/cloudinary");

// Create Menu Item - Admin Only
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Check required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Name, description, price and category are required"
      });
    }

    let image = "";

    // Upload image to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "restaurant-menu"
        }
      );

      image = result.secure_url;
    }

    // Create menu item
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      image
    });

    res.status(201).json({
      message: "Menu item created successfully",
      menuItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Get All Menu Items - Public
const getMenuItems = async (req, res) => {
  try {
    console.log("GET /api/menu called");

    const menuItems = await MenuItem.find().lean();

    console.log("Menu items found:", menuItems.length);

    return res.status(200).json(menuItems);

  } catch (error) {
    console.error("GET MENU ERROR:", error);

    return res.status(500).json({
      message: "Failed to load menu items",
      error: error.message
    });
  }
};


// Get Single Menu Item by ID - Public
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.status(200).json(menuItem);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Update Menu Item - Admin Only
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    // Update name
    if (req.body.name) {
      menuItem.name = req.body.name;
    }

    // Update description
    if (req.body.description) {
      menuItem.description = req.body.description;
    }

    // Update price
    if (req.body.price) {
      menuItem.price = req.body.price;
    }

    // Update category
    if (req.body.category) {
      menuItem.category = req.body.category;
    }

    // Update availability
    if (req.body.available !== undefined) {
      menuItem.available = req.body.available;
    }

    // Upload new image to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "restaurant-menu"
        }
      );

      menuItem.image = result.secure_url;
    }

    await menuItem.save();

    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Delete Menu Item - Admin Only
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.status(200).json({
      message: "Menu item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
};