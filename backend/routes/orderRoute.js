import express from "express";
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe} from "../controllers/orderController.js"
import adminauth from '../middleware/adminauth.js'
import authuser from '../middleware/authuser.js'
const orderRouter=express.Router()
//Admin
orderRouter.post('/list',adminauth,allOrders)
orderRouter.post('/status',adminauth,updateStatus)

//payment features
orderRouter.post('/place',authuser,placeOrder)
orderRouter.post('/razorpay',authuser,placeOrderRazorpay)
orderRouter.post('/stripe',authuser,placeOrderStripe)

//user features
orderRouter.post('/userorders',authuser,userOrders)

//verifyStripe
orderRouter.post("/verifyStripe", authuser, verifyStripe);

export default orderRouter;