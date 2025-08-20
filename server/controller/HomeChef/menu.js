import express from 'express';
import menu from '../../models/HomeChef/menu.js'
const app = express();
app.use(express.json());

export const addItem = async(req,res)=>{
    try {
        const {chefId,name,description,price,available,date} = req.body;
        const newitem = await menu.create({
            chefId,
            name,
            description,
            price,
            available,
            date
        });
        return res.status(200).json({message:"Item Added Successfully",newitem});
    } catch (error) {
        return res.status(500).json({message:"error to add Item",error});
    }
}