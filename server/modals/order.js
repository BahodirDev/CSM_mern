const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types
const Order = new Schema({
    products: [{ type: ObjectId, ref: "Product" }],
    payment: {},
    buyer: { type: ObjectId, ref: "User" },
    status: { 
        type: String, 
        default: "Not proccessing",
        enum: ["Delivered",'Not proccessing', "Proccessing", "Registered"],
        }
}, { timestamps: true });

module.exports = model('Order', Order);
