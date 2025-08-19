import express from 'express';
const router = express.Router();
import homechef from "./HomeChef/authroutes.js";
import user from "./User/authroutes.js";
import admin from "./admin/authroutes.js";
router.use("/homechef",homechef);
router.use("/user",user);
router.use("/admin",admin);
export default router;