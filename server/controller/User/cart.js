import express from "express";
import Cart from "../../models/User/cart.js";

export const addToCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const { itemId,quantity} = req.body;
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items:[]});
        }

        const existingItem = cart.items.find(item=>item.itemId.toString()=== itemId);
        if(existingItem){
            existingItem.quantity += quantity || 1;
        }
        else{
            cart.items.push({ itemId,quantity: quantity || 1});
        }
        await cart.save();
        
        const populatedCart = await Cart.findById(cart._id).populate('items.itemId');
        return res.status(200).json({message:"Item added Successfully",cart: populatedCart});
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding to cart" });
    }
}

export const getCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({userId}).populate("items.itemId");
        if(!cart || cart.items.length === 0){
            return res.status(200).json({items: [], message:"Your cart is empty"});
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error to Fetch Cart"});
    }
}

export const removeFromCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const{ itemId} = req.body;
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:"Your cart is empty"});
        }

        cart.items = cart.items.filter(item=>item.itemId.toString() !== itemId);
        await cart.save();
        
        const populatedCart = await Cart.findById(cart._id).populate('items.itemId');
        return res.status(200).json({message:"Item Removed from Cart",cart: populatedCart});
    } catch (error) {
        res.status(500).json({ message: "Error to remove item from Cart" });
    }
}