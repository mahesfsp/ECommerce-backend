const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// Get orders API - api/v1/orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
      message: "Get orders working",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create order - api/v1/order
exports.createOrder = async (req, res, next) => {
  try {
    const cartItems = req.body;

    // Calculate total amount
    const amount = cartItems
      .reduce((acc, item) => {
        const price = Number(item.product.price) || 0;
        const qty = Number(item.qty) || 0;
        return acc + price * qty;
      }, 0)
      .toFixed(2);

    const status = "pending";

    // Create order in database
    const order = await orderModel.create({ cartItems, amount, status });

    // Update product stock
    for (const item of cartItems) {
      const product = await productModel.findById(item.product._id);

      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product._id}` });
      }

      // Check if stock is available
      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      // Deduct the stock
      product.stock = product.stock - item.qty;
      await product.save();
    }

    res.json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
