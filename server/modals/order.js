import { Schema, model } from 'mongoose';
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

export default model('Order', Order);
