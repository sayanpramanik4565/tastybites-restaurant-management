const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// Create Order - Logged in User
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Check items
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required"
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Check menu items and calculate total
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);

      if (!menuItem) {
        return res.status(404).json({
          message: "Menu item not found"
        });
      }

      if (!menuItem.available) {
        return res.status(400).json({
          message: `${menuItem.name} is not available`
        });
      }

      const quantity = item.quantity || 1;

      totalAmount += menuItem.price * quantity;

      orderItems.push({
        menuItem: menuItem._id,
        quantity,
        price: menuItem.price
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Get My Orders - Logged in User
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).populate("items.menuItem", "name price image");

    res.status(200).json({
      message: "Orders fetched successfully",
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Get All Orders - Admin Only
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuItem", "name price");

    res.status(200).json({
      message: "All orders fetched successfully",
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Update Order Status - Admin Only
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Ready",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};