import express from "express"
import dotenv from "dotenv";
import cors from 'cors';

//dotenv configuration
dotenv.config({
    path:"./config/config.env"
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

//middlewares
import payment from './routes/paymentRoute.js'
app.use("/api",payment);
app.get("/api/getkey",(req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
})



export default app;