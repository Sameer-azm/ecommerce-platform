import React, { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Search = () => {
    const {search,showSearch,setSearch,setShowSearch}=useContext(ShopContext)
    const [visisble, setVisisble] = useState(false)
    const location=useLocation();
    useEffect(()=>{
if(location.pathname.includes('collection') && showSearch){
setVisisble(true)}
else{
    setVisisble(false)
}
    },[location])
  return showSearch && visisble ? (
    <div className='bg-white text-center mt-20  '>
      
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e)=>{
            setSearch(e.target.value)
        }} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Serach here ' />
        <img src={assets.search_icon} className='w-4' alt="" /></div>
        <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt="" />
        

    </div>
  ): null
}

export default Search