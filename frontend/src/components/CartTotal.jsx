import React from 'react'
import Title from './Title'
import{ useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency,deliver_fees,getCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
<div className="text-2xl">
    <Title text1={"Cart"} text2={"Total"} />
</div>
<div className="flex flex-col gap-2 mt-2 text-sm" >
    <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{currency}{getCartAmount()}.00</p>
    </div>
    <hr/>
    <div className="flex justify-between">
        <p>Delivery Fee</p>
        <p>{currency}{getCartAmount()===0 ? 0 : deliver_fees}.00</p>
    </div>
    <hr/>
    <div className="flex justify-between font-medium text-base">
        <p>Total Amount</p>
        <p>{currency}{getCartAmount()===0 ? 0 : getCartAmount() + deliver_fees}.00</p>
    </div>
</div>
    </div>
  )
}

export default CartTotal