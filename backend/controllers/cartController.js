import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        //   console.log("Inside addToCart");
        //   console.log("BODY:", req.body);
          const userId = req.userId;
        const {  itemId, size } = req.body;
        //   console.log("userId:", userId);
        // console.log("itemId:", itemId);
        // console.log("size:", size);
        const userData=await userModel.findById(userId)
        let cartData= userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Item added to cart"})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const updateCart = async (req, res) => {
    try{
        const userId = req.userId;
        const{ itemId,size,quantity}=req.body
        const userData=await userModel.findById(userId)
        let cartData= userData.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]=quantity
            }
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Cart updated"})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const getUserCart = async (req, res) => {
    try {
        console.log("Inside getUserCart");
       const userId = req.userId;
    
       console.log("User ID:", req.userId);

        const userData=await userModel.findById(userId)
        let cartData= userData.cartData
        console.log("Cart:", userData.cartData);
        res.json({success:true,cartData})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart }