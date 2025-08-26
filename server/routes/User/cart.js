import express from 'express';
const Router = express.Router();
import { addToCart,getCart,removeFromCart } from '../../controller/User/cart.js';
import { auth } from '../../middleware/authmiddleware.js';

Router.post("/addToCart",auth,addToCart);
Router.get("/getCart/:userId",auth,getCart);
Router.post("/removeFromCart",auth,removeFromCart)

export default Router;