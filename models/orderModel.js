const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({
    cartItems:Array,
    amount:String,
    status:String,   
    createdAt:Date
});

const orderModel = mongoose.model('Order',OrderSchema);

module.exports = orderModel;




