import express from 'express';
const router = express.Router();
import homechefauth from "./HomeChef/authroutes.js";
import userauth from "./User/authroutes.js";
import adminauth from "./admin/authroutes.js";
import menu from "./HomeChef/menuroutes.js";


router.use("/homechef/auth",homechefauth);
router.use("/homechef/menu",menu);
router.use("/user/auth",userauth);
router.use("/admin/auth",adminauth);
export default router;