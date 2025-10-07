import mongoose from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['homechef','user','admin']
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    // For home chefs
    chefProfile: {
        bio: String,
        specialties: [String],
        rating: {
            type: Number,
            default: 0
        },
        totalOrders: {
            type: Number,
            default: 0
        }
    }
},{timestamps:true});

const Usermodel = mongoose.model("User",user);
export default Usermodel;