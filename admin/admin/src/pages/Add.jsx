import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'sonner'
const Add = ({token}) => {

  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setsubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  const onSubmit=async(e)=>{
    e.preventDefault();
    // form submission 
     if (!image1) {
    toast.error("Please upload Image 1");
    return;
  }

  if (sizes.length === 0) {
    toast.error("Please select at least one size");
    return;
  }

  if (!price || Number(price) <= 0) {
    toast.error("Please enter a valid price");
    return;
  }
  setLoading(true);
try{
const formData=new FormData();
image1 && formData.append('image1',image1)
image2 && formData.append('image2',image2)
image3 && formData.append('image3',image3)
image4 && formData.append('image4',image4)
formData.append('name',name)
formData.append('description',description)
formData.append('price',price)
formData.append('category',category)
formData.append('subCategory',subCategory)
formData.append('bestseller',bestseller)
formData.append('featured',featured)
formData.append('sizes',JSON.stringify(sizes))
const response=await axios.post(backendUrl+'/api/product/add',formData, {
    headers: {
      token: token || localStorage.getItem('token')
    }
  })
  if(response.data.success){
  toast.success('Product Added Successfully')
  setimage1(false)
  setimage2(false)
  setimage3(false)
  setimage4(false)
  setName('')
  setDescription('')
  setPrice('')
  setCategory('Men')
  setsubCategory('Topwear')
setSizes([])
setBestseller(false)
setFeatured(false)
  }
else{
  toast.error(response.data.message)
}
}
catch(err){
  console.error('Error adding product: ', err);
}
finally{
  setLoading(false);
}
  }

  return (
    
    <form onSubmit={onSubmit} className='flex flex-col w-full items-start gap-3  ' action="">
      <p className='text-2xl font-bold mb-4'>Add Product</p>

      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' required src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>{setimage1(e.target.files[0])}} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>{setimage2(e.target.files[0])}} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>{setimage3(e.target.files[0])}} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>{setimage4(e.target.files[0])}} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value) } value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder="Type Here" required id="" />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value) } value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder="Write description Here" required id="" />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-6 sm:items-center'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value) } value={category} className='w-full px-3 py-2' name="" id="">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e)=>setsubCategory(e.target.value) } value={subCategory} className='w-full px-3 py-2' name="" id="">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

<div>
  <p className='mb-2'>Product Price</p>
  <input onChange={(e)=>setPrice(e.target.value) } value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" required placeholder='00.00' />
</div>


      </div>
{/*      
Product Sizes */}
<div >
  <p className='mb-2'>Product Sizes</p>
  <div className='flex gap-3'>
    <div onClick={()=>setSizes(prev=>prev.includes('S') ? prev.filter(s=>s!=='S') : [...prev,'S'])}>
      <p className={`px-3 py-1 cursor-pointer ${sizes.includes('S') ? 'bg-amber-300' : 'bg-slate-200'}`}>S</p>
    </div>

    <div onClick={()=>setSizes(prev=>prev.includes('M') ? prev.filter(s=>s!=='M') : [...prev,'M'])}>
      <p className={`px-3 py-1 cursor-pointer ${sizes.includes('M') ? 'bg-amber-300' : 'bg-slate-200'}`}>M</p>
    </div>

    <div onClick={()=>setSizes(prev=>prev.includes('L') ? prev.filter(s=>s!=='L') : [...prev,'L'])}>
      <p className={`px-3 py-1 cursor-pointer ${sizes.includes('L') ? 'bg-amber-300' : 'bg-slate-200'}`}>L</p>
    </div>

    <div onClick={()=>setSizes(prev=>prev.includes('XL') ? prev.filter(s=>s!=='XL') : [...prev,'XL'])}>
      <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XL') ? 'bg-amber-300' : 'bg-slate-200'}`}>XL</p>
    </div>

    <div onClick={()=>setSizes(prev=>prev.includes('XXL') ? prev.filter(s=>s!=='XXL') : [...prev,'XXL'])}>
      <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XXL') ? 'bg-amber-300' : 'bg-slate-200'}`}>XXL</p>
    </div>
  </div>
</div>

<div className='flex gap-2 mt-2'>
  <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
  <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
</div>

<div className='flex gap-2 '>
  <input onChange={()=>setFeatured(!featured)} type='checkbox' checked={featured} />
  <label className='cursor-pointer' htmlFor="featured">Add to Featured</label>
</div>

<button disabled={loading} type='submit' className='w-28 py-3 mt-2 bg-amber-300 rounded-2xl '>{loading ? 'Adding...' : 'ADD'}</button>
    </form>
  )
}

export default Add