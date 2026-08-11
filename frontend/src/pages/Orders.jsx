import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast, Toaster } from 'sonner'

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData=async()=>{
    try {
    if(!token){
      return null
    }

    const response=await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
    console.log(response.data);
    if(response.data.success){
      let allOrdersItem=[]
      response.data.orders.map((order)=>{
        order.items.map((item)=>{
      item['status']=order.status
      item['payment']=order.payment
      item['paymentMethod']=order.paymentMethod
      item['date']=order.date
      allOrdersItem.push(item)
        })
      }); setOrderData(allOrdersItem.reverse());
    }
    
    } catch (error) {
  console.log(error);
  toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16 mt-12'>
      <div className="text-2xl text-center">
        <Title text1={'Your'} text2={'Orders'} />
      </div>

      <div>
        {
          orderData.map((item, i) => (
            <div key={i} className='flex flex-col md:flex-row gap-4 md:justify-between md:items-center border-t  py-4 text-gray-700'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.imageUrl[0]} className='w-16 sm:w-20' alt="" />
                <div >
                  <p className='font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className='text-lg font-bold'>{currency}{item.price.toFixed(2)}.00</p>
                    <p className='text-lg font-bold'>quantity: {item.quantity}</p>
                    <p className='text-lg font-bold'>Size: {item.size}</p>
                  </div>
                  <div>
                    <p className='mt-2'>Date : <span>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-2'>Payment : <span>{item.paymentMethod}</span></p>
                   
                  </div>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                 <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:font-medium'>{item.status}</p>
              </div>
             < button onClick={loadOrderData} className='bg-orange-300 text-white px-4 py-2 rounded-2xl'>Track Order</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders