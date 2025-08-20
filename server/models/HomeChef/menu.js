import mongoose from "mongoose";

const menu = new mongoose.Schema({
    chefId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    available: { 
        type: Boolean,
        default: true,
    },
    date: { 
        type: Date, 
        default: Date.now,
    }
,});

const Menu = mongoose.model("Menu",menu);

export default Menu;