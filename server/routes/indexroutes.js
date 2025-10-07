import express from 'express';
const router = express.Router();
import homechefauth from "./HomeChef/authroutes.js";
import userauth from "./User/authroutes.js";
import adminauth from "./admin/authroutes.js";
import menu from "./HomeChef/menuroutes.js";
import cart from "./User/cart.js";
import order from "./User/order.js";
import admin from "./admin/adminroutes.js";


router.use("/homechef/auth",homechefauth);
router.use("/homechef/menu",menu);
router.use("/user/auth",userauth);
router.use("/user/cart",cart);
router.use("/user/order",order);
router.use("/admin/auth",adminauth);
router.use("/admin",admin);

export default router;