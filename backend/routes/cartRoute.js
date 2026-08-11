import express from 'express'
import {addToCart,getUserCart,updateCart} from "../controllers/cartController.js"
import authuser from '../middleware/authuser.js'
  
const cartRouter=express.Router()

// cartRouter.post('/add',authuser,addToCart)
cartRouter.post('/add', authuser, addToCart);
cartRouter.post('/update',authuser,updateCart)
cartRouter.get('/user',authuser,getUserCart)

export default cartRouter