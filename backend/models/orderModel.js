import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

  userId :{ type: String,required: true},
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Order Placed' },
  paymentMethod: { type: String, required: true },
  payment: { type: String, default: 'pending' },
  date: { type: Date, required: true },
  address :{ type: Object, required: true},
})
const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default orderModel;