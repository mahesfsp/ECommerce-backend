const express = require("express");
const { getOrders, createOrder } = require("../controllers/orderController");


const router = express.Router();

router.route("/orders").get(getOrders);
router.route("/order").post(createOrder);



module.exports = router;
