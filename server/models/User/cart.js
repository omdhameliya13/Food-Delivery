import mongoose from "mongoose";

const cart = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    items :[{
        itemId :{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Menu",          
        },
        quantity:{
            type:Number,
            default:1,
        }
    }]
});

const Cart = mongoose.model("Cart",cart);
export default Cart;