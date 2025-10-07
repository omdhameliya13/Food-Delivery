import express from 'express';
import menu from '../../models/HomeChef/menu.js'
const app = express();
app.use(express.json());

export const addItem = async(req,res)=>{
    try {
        const {name,description,price,available,date} = req.body;
        const image = req.file ? req.file.filename : null;
        const chefId = req.user.id;
        const newitem = await menu.create({
            chefId,
            name,
            image,
            description,
            price,
            available,
            date
        });
        return res.status(200).json({message:"Item Added Successfully",newitem});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Item name already exists for this chef" });
        }
        return res.status(500).json({message:"error to add Item",error});
    }
}

export const getItems = async(req,res)=>{
    try {
        const items = await menu.find();
        if(!items)
        {
            return res.status(404).json({message:"Item not found"});
        }
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({message:"Server error"});
    }
}

export const getItemsById = async(req,res)=>{
    try {
        // If chefId is in params, use it; otherwise use logged-in chef's ID
        const chefId = req.params.chefId || req.user?.id;
        
        if (!chefId) {
            return res.status(400).json({message:"Chef ID required"});
        }
        
        const items = await menu.find({chefId});
        return res.status(200).json(items);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
}

export const updateItem = async(req,res)=>{
    try {
        const {name,description,price,available,date} = req.body;
        const updateData = {name,description,price,available,date};
        if(req.file){
            updateData.image = req.file.filename;
        }
        const itemUpdate = await menu.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!itemUpdate){
            return res.status(404).json({message:"Item not found"});
        }
        return res.status(200).json({message:"Item Updated",itemUpdate});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error to Update Item"});
    }
}

export const deleteItem = async(req,res)=>{
    try{
        const item = await menu.findByIdAndDelete(req.params.id);
        if(!item){
            return res.status(404).json({message:"No Item Found"});
        }
        return res.status(200).json({message:"Item Deleted"});
    }
    catch(error){
        return res.status(500).json({ message: 'Error to Delete Item',error });
    }
};