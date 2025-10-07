import express from 'express';
const router = express.Router();
import { 
    createOrder, 
    getUserOrders, 
    getOrderById, 
    cancelOrder,
    getChefOrders,
    updateOrderStatus
} from '../../controller/User/order.js';
import { auth } from '../../middleware/authmiddleware.js';

// User routes
router.post("/create", auth, createOrder);
router.get("/myorders", auth, getUserOrders);
router.get("/:orderId", auth, getOrderById);
router.put("/cancel/:orderId", auth, cancelOrder);

// Chef routes
router.get("/chef/orders", auth, getChefOrders);
router.put("/chef/status/:orderId", auth, updateOrderStatus);

export default router;
