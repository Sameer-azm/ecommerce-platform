import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Nav from './components/Nav'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Search from './components/Search'
import Verify from './pages/Verify'
export const backendUrl=import.meta.env.VITE_BACKEND_URL

import { Toaster, toast } from 'sonner';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='bg-white overflow-hidden ' >
     <Toaster position="top-right" richColors />
      <Nav/>
      <Search/>
      <div className='px-4 sm:px-16'>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/collection' element={<Collection/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/product/:productId' element={<Product/>}/>
  <Route path='/cart' element={<Cart/>} />
  <Route path='/place-order/' element={<PlaceOrder/>}/>
  <Route path='/orders' element={<Orders/>} />
  <Route path='/login' element={<Login/>}/>
  <Route path='/verify' element={<Verify/>}/>
</Routes>
</div>
<Footer/>
    </div>
  )
}

export default App