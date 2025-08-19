import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());
import Usermodel from '../../models/user.js';

export const register = async(req,res)=>{
    try{
        const{name,email,password} = req.body;
        const user = await Usermodel.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }

        const hashpassword = await bcrypt.hash(password,10);
        const newuser = await Usermodel.create({
            name,
            email,
            password:hashpassword,
            role:"admin",
        }
        );
        return res.status(201).json({message:"User Created Successfully",newuser});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:"server error"},error);
    }
};

export const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await Usermodel.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match)
    {
        return res.status(400).json({message:"Invalid password"});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'2h'});
    return res.status(200).json({message:"User LoggedIn Successfully",token});
}

