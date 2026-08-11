import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'

const Nav = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] bg-sand-dark justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className='bg-amber-300 text-black px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>LogOut</button>
    </div>
  )
}

export default Nav