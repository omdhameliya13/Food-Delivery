import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryType: {
        type: String,
        enum: ['delivery', 'pickup'],
        required: true
    },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    contactNumber: {
        type: String,
        required: true
    },
    specialInstructions: {
        type: String,
        default: ''
    },
    estimatedDeliveryTime: {
        type: Date
    },
    chefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
