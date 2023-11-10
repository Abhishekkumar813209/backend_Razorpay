import app from "./app.js";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";
//database connection
connectDB();



app.get("/",(req,res)=>{
    res.send(`<h1> Hello World</h1>`)
})

export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})

const port = process.env.PORT;
app.listen(5000,()=>{
    console.log(`Server connected at 5000`)
})