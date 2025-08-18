import express from 'express';
const router = express.Router();
import homechef from "./HomeChef/authrouter.js";
router.use("/homechef",homechef);

export default router;