const orderModel = require("../models/orderModel");

//Get orders API - api/v1/product
exports.getOrders = async (req, res, next) => {
  const orders = await orderModel.find({});
  res.json({
    success: true,
    orders,
    message: "Get orders working",
  });
};

//create order api/v1/order
exports.createOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = cartItems
    .reduce((acc, item) => {
      const price = Number(item.product.price) || 0; 
      const qty = Number(item.qty) || 0; 
      return acc + price * qty;
    }, 0)
    .toFixed(2);
  const status = "pending";

  const order = await orderModel.create({ cartItems, amount, status });

  res.json({
    success: true,
    order,
    message: "create order working",
  });
};
