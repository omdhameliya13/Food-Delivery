import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import indexroutes from './routes/indexroutes.js';
dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Serve static files (images)
app.use('/uploads', express.static('uploads'));

app.use("/api/v1",indexroutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{app.listen(process.env.PORT,()=>{console.log(`Server started on PORT : ${process.env.PORT}`)}),console.log("MongoDB Connected")})
.catch((error)=>{console.log(error.message())});

