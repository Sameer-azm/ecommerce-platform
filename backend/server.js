import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import cloudinaryConfig from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// Connect to MongoDB
connectDB()
// Configure Cloudinary
cloudinaryConfig()

//App Configuration
const app = express()
const port = process.env.PORT || 4000

//Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
//Routes
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})