import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import axios from 'axios'
import { toast } from 'sonner'


const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, deliver_fees, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: '',
    state: "",
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))

  }
  const submitHandler = async (event) => {
    event.preventDefault();

    try {

      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {

          const quantity = cartItems[itemId][size];

          if (quantity > 0) {
            const product = structuredClone(
              products.find((p) => p._id === itemId)
            );

            if (product) {
              product.size = size;
              product.quantity = quantity;
              orderItems.push(product);
            }
          }
        }
      }

      console.log(orderItems);

      console.log(orderItems);

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliver_fees,
        paymentMethod: method
      };
      switch (method) {
        //cod
        case 'cod':
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token: token } })
          console.log(backendUrl + "/api/order/place");
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else
            toast.error(response.data.message)
          break;

          case 'stripe':
            const responseStripe=await axios.post(backendUrl+"/api/order/stripe",orderData,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url}=responseStripe.data
              window.location.replace(session_url)
            }
            else{
              toast.error(responseStripe.data.message)
            }
            break;
        default:
          break;
      }
      console.log(orderData);

      // await axios.post(
      //   backendUrl + "/api/order/place",
      //   orderData,
      //   { headers: { token } }
      // );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className='mt-24 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* {left side -Delivery  details} */}
      <div className='w-full flex flex-col gap-4 sm:max-w[480px]'>
        <div className="text-2xl sm:text-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="email" placeholder="Email" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="text" placeholder="Street Address" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="number" placeholder="Zip Code" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="border border-gray-300 px-3.5 py-2 rounded w-full" type="number" placeholder="Phone Number" />


      </div>
      {/* {right side -Order summary} */}
      <div className='w-full flex flex-col gap-4 sm:max-w[480px]'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className=''>
          <Title text1={'Payment'} text2={'Method'} />
          <div className="flex flex-col gap-3  lg:flex-row">
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${method === 'stripe' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" />
            </div>
            {/* <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${method === 'razorpay' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" />
            </div> */}
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${method === 'cod' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <p className='text-sm'>Cash on Delivery</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button type='submit' className="bg-orange-300 text-white px-6 py-2 rounded-2xl mt-4">Place Order</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder