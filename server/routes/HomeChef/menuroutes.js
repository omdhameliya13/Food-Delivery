import express from 'express';
const router = express.Router();
import { addItem } from '../../controller/HomeChef/menu.js';

router.post("/addItem",addItem);

export default router;