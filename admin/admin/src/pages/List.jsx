import React from 'react'
import { useEffect,useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'sonner'
import { currency } from '../App'
import axios from 'axios'

const List = ({token}) => {
  const [list, setList] = useState([])
  const fetchLIst=async()=>{
try{
const response=await fetch(backendUrl+'/api/product/list', {
      headers: {
        token: token || localStorage.getItem('token')
      }
    })
const data=await response.json()
console.log(data.products);
if(data.success){
  setList(data.products)
}
else{
  toast.error(data.message)
}
}
catch(err){
  console.log(err);
  toast.error("Error fetching product list")
}
  }
  const removeProduct=async(id)=>{
    try{
const response=await axios.post(backendUrl+'/api/product/remove',{id},{
      headers: {
        token: token || localStorage.getItem('token')
      }
    })
    if(response.data.success){
      toast.success('Product Deleted Successfully')
      fetchLIst()
    }
    else{
      toast.error(response.data.message)
    }
    }
  catch(err){
    console.log(err);
    toast.error("Error deleting product")
  }}
  useEffect(()=>{
    fetchLIst()
  },[])
  return (
    <>
<p className='text-2xl font-bold mb-4'>Product List</p>
<div className='flex flex-col gap-2'>
  <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-gray-100 py-1 px-2 border text-sm rounded-md'>
  {/* list table title */}
  <b>Image</b>
  <b>Name</b>
  <b>Category</b>
  <b>Price</b>
  <b>Action</b>
</div>

{/* product list */}
{
  list.map((item,index)=>(
  <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border text-sm rounded-md'>
<img src={item.imageUrl?.[0]} alt={item.name} className='w-12  object-cover rounded-md' />
<b>{item.name}</b>
<b>{item.category}</b>
<p className='text-xs'>{currency}{item.price.toFixed(2)}</p>
<p onClick={() => {removeProduct(item._id)}} className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</p>
  </div>
  ))
}
</div>
    </>
  )
}
export default List