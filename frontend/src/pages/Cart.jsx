import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'
import { Trash2, Minus, Plus } from 'lucide-react'

const Cart = () => {
  const { currency, products, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const ids in cartItems) {
        for (const size in cartItems[ids]) {
          if (cartItems[ids][size] > 0) {
            tempData.push({
              _id: ids,
              size: size,
              quantity: cartItems[ids][size],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className='mt-24 px-2 sm:px-8 max-w-5xl mx-auto'>
      <div className="text-2xl mb-6">
        <Title text1={'SHOPPING'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <p className='text-gray-400 text-sm text-center py-20'>Your cart is empty.</p>
      ) : (
        <div>
          {cartData.map((item, i) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <div
                className='py-5 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-gray-200 text-gray-700'
                key={i}
              >
                <div className='flex items-start gap-4 sm:gap-6'>
                  <img src={productData.imageUrl[0]} className='w-16 sm:w-20 object-cover border border-gray-100' alt="" />
                  <div>
                    <p className='text-sm sm:text-lg font-medium text-gray-800'>{productData.name}</p>
                    <div className="flex items-center gap-3 sm:gap-5 mt-2">
                      <p className='text-sm sm:text-base'>{currency}{productData.price}</p>
                      <p className="px-2 py-0.5 text-xs sm:text-sm border border-gray-300 bg-slate-50">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                    className='px-2 py-1.5  text-gray-500 hover:bg-gray-50 transition-colors duration-150'
                  >
                    <Minus className='w-3.5 h-3.5' />
                  </button>
                  <input
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, parseInt(e.target.value))
                    }
                    type="number"
                    min={1}
                    value={item.quantity}
                    className='w-8  border rounded-full  text-center py-1.5 px-1.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className='px-1 py-1  text-gray-500 hover:bg-gray-50 transition-colors duration-150'
                  >
                    <Plus className='w-3.5 h-3.5' />
                  </button>
                  <div>
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='px-1 py-1 text-gray-400  border border-gray-300 hover:text-red-500 transition-colors duration-150'
                >
                  <Trash2 className='w-4 h-4' />
                </button></div>
                </div>

              </div>
            )
          })}
        </div>
      )}

      <div className="flex justify-end my-16">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              disabled={cartData.length === 0}
              className="bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white px-6 py-2.5 rounded-2xl mt-4 transition-all duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart