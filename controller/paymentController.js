import { Payment } from "../models/paymentModel.js";
import crypto from "crypto"
import {instance} from "./../server.js";


export const checkout = async(req,res) =>{
    const options = {
        amount:Number(req.body.amount * 100),
        currency:"INR",
    }

    const order = await instance.orders.create(options);

    res.status(200).json({
        success:true,
        order
    })
}


export const paymentVerification = async(req,res) =>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const exprectedSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

    const isAuthentic = exprectedSignature === razorpay_signature
    if(isAuthentic){
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })
        res.redirect(
            `https://654e7ec34389ab0db60f602d--remarkable-flan-4bbf59.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
        )
    }else{
        res.status(400).json({
            success:false
        })
    }
}

