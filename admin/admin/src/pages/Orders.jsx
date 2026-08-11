import React from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { toast } from 'sonner'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message);

    }
  }
  const statusHandler=async(event,orderId)=>{
try {
  const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
  if(response.data.success){
    await fetchAllOrders()
  }
} catch (error) {
  console.log(error);
  toast.error(response.data.message)
  
}
  }
  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div className="flex flex-col gap-5">
      {orders.map((order) => (
        <div
          key={order._id}
          className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr] gap-4 border rounded-lg p-5 shadow-sm bg-white ">
          {/* Parcel Icon */}
          <div className=" flex justify-center items-start">
            <img
              src={assets.parcel_icon}
              alt="Parcel"
              className="w-12"
            />
          </div>

          {/* Order Details */}
          <div>
            <p className="font-bold text-amber-400 mb-2 flex">Items</p>

            {order.items.map((item, index) => (
              <p key={index} className="text-sm  text-gray-700 w-full">
                {item.name} × {item.quantity} ({item.size})
              </p>
            ))}
          </div>
          

          <div>
            <div className=" mt-4 text-sm">
              <h1 className='font-bold text-amber-400'>Order Details:</h1>
              <p>
                {order.address.firstName} {order.address.lastName}
              </p>

              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state}
              </p>
              <p>
                {order.address.country} - {order.address.zipcode}
              </p>

              <p >Phone : {order.address.phone}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="text-sm flex flex-col gap-2 justify-center">
            <p>
              <span className="font-semibold">Amount:</span> ${order.amount}
            </p>

            <p>
              <span className="font-semibold">Method:</span>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <span className="font-semibold">Payment:</span>{" "}
              {order.payment ? "Paid" : "Pending"}
            </p>

            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center">
            <select
            onChange={()=>statusHandler(event,order._id)}
              defaultValue={order.status}
              className="border rounded px-3 py-2 w-full"
            >
              <option>Order Placed</option>
              <option>Packing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>
          </div>

        </div>
    
      ))}
    </div>)
}

export default Orders