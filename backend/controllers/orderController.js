 import orderModel from "../models/orderModel.js";
 import userModel from "../models/userModel.js";
import Stripe from 'stripe'

//globla variales
const currency='usd'
const deliveryCharge=10

//gateway initialize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)



 //placing order using COD 
 const placeOrder =async(req,res)=>{
    try{
       const userId = req.userId;
 const {items,amount,address}=req.body;
 const orderData={
    userId,items,amount,  address,paymentMethod:"COD",payment:false,
    date:Date.now()
 }
 const newOrder=new orderModel(orderData)
 await newOrder.save()

 await userModel.findByIdAndUpdate(userId,{cartData:{}})
 res.json({success:true,message:"order plced"})
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
 }

 
  //placing order using Stripe 
  const placeOrderStripe =async(req,res)=>{
try {
        const userId = req.userId;
 const {items,amount,address}=req.body;
 const {origin}=req.headers;
  const orderData={
    userId,
    items,
    amount, 
   address,
   paymentMethod:"Stripe",
   payment:false,
   date:Date.now()
 }
 const newOrder=new orderModel(orderData)
 await newOrder.save()

 const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery fee
line_items.push({
  price_data: {
    currency: currency,
    product_data: {
      name: "Delivery Fee",
    },
    unit_amount: deliveryCharge * 100,
  },
  quantity: 1,
});
   const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",

            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,

            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

res.json({success:true,session_url:session.url})


} catch (error) {
     res.json({
            success: false, message: error.message,
        });
}
  }

//verfy stripe
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.userId;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });

      res.json({
        success: true,
        message: "Payment Successful",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};  


  //placing order using razorpay
  const placeOrderRazorpay =async(req,res)=>{

  }

// all orders data for Admin panel
const allOrders =async(req,res)=>{
try {
   const orders=await orderModel.find({})
   res.json({success:true,orders})
} catch (error) {
   console.log(error);
res.json({success:false,message:error.message})
   
}
}

//user order data for frontend
const userOrders =async(req,res)=>{
try {
   const userId=req.userId
   const orders=await orderModel.find({userId})
   res.json({success:true,orders})
}  catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//updating order status for Admin panel
const updateStatus =async(req,res)=>{
try {
   const {orderId,status}=req.body
   await orderModel.findByIdAndUpdate(orderId,{status});
   res.json({success:true,message :"Status updATED"})
} catch (error) {
   console.error(error);
        res.json({ success: false, message: error.message });
    
}
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}
