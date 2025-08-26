import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexroutes from './routes/indexroutes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1",indexroutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{app.listen(process.env.PORT,()=>{console.log(`Server started on PORT : ${process.env.PORT}`)}),console.log("MongoDB Connected")})
.catch((error)=>{console.log(error.message())});

