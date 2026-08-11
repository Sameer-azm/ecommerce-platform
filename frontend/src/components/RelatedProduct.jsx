import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({category,subCategory}) => {
    const {products}=useContext(ShopContext)
    const [related, setRelated] = useState([])
    useEffect(()=>{
if(products.length>0){
let productsCopy=products.slice();
productsCopy=productsCopy.filter(item=>
    category===item.category
)
productsCopy=productsCopy.filter(item=>
    subCategory===item.subCategory
)
setRelated(productsCopy.slice(0,5));
}
    },[products])
  return (
    <div className='my-24'>

<div className='text-2xl text-center py-2'>
    <Title text1={'RELATED'} text2={"PRODUCTS"}/>
    <div className=' gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
        {
            related.map((item,i)=>(
                <ProductItem key={item._id} id={item._id} imageUrl={item.imageUrl} name={item.name} price={item.price}/>
            ))
        }
    </div>
</div>
    </div>
  )
}

export default RelatedProduct