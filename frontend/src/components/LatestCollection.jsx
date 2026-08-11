import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useState } from 'react'
import ProductItem from './ProductItem'
import { motion } from "framer-motion";

const LatestCollection = () => {
    const {products}= useContext(ShopContext)
    const [latestProducts, setlatestProducts] = useState([])

    useEffect(()=>{
        setlatestProducts(products.slice(0,10))
    },[products])
  return (
    <div 
    className='my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut",delay:0.2 }}
  viewport={{ once: true }}
  className="font-cormorant-garamond w-3/4 m-auto text-center text-xs md:text-base"
>
  Discover our latest collection, carefully curated to bring you fresh styles,
  premium quality, and timeless designs.
</motion.p>
        </div>
<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-2'>
{
    latestProducts.map((item,index)=>(
      <ProductItem key={item._id} id={item._id} imageUrl={item.imageUrl} name={item.name} price={item.price} />
    ))
}
</div>

    </div>
  )
}

export default LatestCollection