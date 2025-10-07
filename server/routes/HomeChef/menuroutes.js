import express from 'express';
import multer from 'multer';
const router = express.Router();
import { addItem,getItems,getItemsById,updateItem,deleteItem } from '../../controller/HomeChef/menu.js';
import {auth} from '../../middleware/authmiddleware.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post("/items/addItem",auth,upload.single('image'),addItem);
router.get("/items/getItems",getItems);
router.get("/items/myItems",auth,getItemsById); // Get logged-in chef's items
router.get("/items/getItemsById/:chefId",getItemsById);
router.put("/items/updateItem/:id",auth,upload.single('image'),updateItem);
router.delete("/items/deleteItem/:id",auth,deleteItem)
export default router;