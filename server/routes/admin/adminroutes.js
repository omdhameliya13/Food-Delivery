import express from 'express';
const router = express.Router();
import {
    getAllOrders,
    getAllMenus,
    getAllUsers,
    getAllChefs,
    getDashboardStats,
    deleteUser,
    updateOrderStatus
} from '../../controller/admin/admincontroller.js';
import { auth } from '../../middleware/authmiddleware.js';

// Admin monitoring routes
router.get("/orders", auth, getAllOrders);
router.get("/menus", auth, getAllMenus);
router.get("/users", auth, getAllUsers);
router.get("/chefs", auth, getAllChefs);
router.get("/dashboard", auth, getDashboardStats);
router.delete("/users/:userId", auth, deleteUser);
router.put("/orders/:orderId/status", auth, updateOrderStatus);

export default router;
