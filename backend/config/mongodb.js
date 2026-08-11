import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
 console.log("connected to db");
    })}
    catch (error) {
        console.log(error)
    }}
    export default connectDB