// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/frontend_assets/assets'
// import Title from '../components/Title'
// import ProductItem from '../components/ProductItem'

// const Collection = () => {
//   const { products,showSearch ,search} = useContext(ShopContext)

// const [showFilter, setshowFilter] = useState(true)
// const [category, setCategory] = useState([])
// const [subCategory, setSubCategory] = useState([])
// const [sortType, setSortType] = useState('relevant')
// const [filteredProducts, setFilteredProducts] = useState([])


// const toggleCategory = (e) => {
//   const value = e.target.value

//   setCategory(prev =>
//     prev.includes(value)
//       ? prev.filter(item => item !== value)
//       : [...prev, value]
//   )
// }

// const toggleSubCategory = (e) => {
//   const value = e.target.value

//   setSubCategory(prev =>
//     prev.includes(value)
//       ? prev.filter(item => item !== value)
//       : [...prev, value]
//   )
// }

// useEffect(() => {
//   let result = [...products]
//     if (category.length > 0) {
//     result = result.filter(item =>
//       category.includes(item.category)
//     )
//   }
//     if (subCategory.length > 0) {
//     result = result.filter(item =>
//       subCategory.includes(item.subCategory)
//     )
//   }
//     if (sortType === 'low-high') {
//     result.sort((a, b) => a.price - b.price)
//   } else if (sortType === 'high-low') {
//     result.sort((a, b) => b.price - a.price)
//   }
//   if(showSearch && search){
//     result=result.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
//   }
//     setFilteredProducts(result)
// }, [products, category, subCategory, sortType,search,showSearch,products])

//  // const [showFilter, setshowFilter] = useState(true)
// //   const [filerProducts, setFilerProducts] = useState([])
// //   const [category, setCategory] = useState([])
// //   const [subCategory, setSubCategory] = useState([])
// //   const [sortType, setSortType] = useState('relevant')

// // // toggleSubCategory
// //   const toggleSubCategory=(e)=>{
// //   if(subCategory.includes(e.target.value)){
// //     setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
// //   }
// //   else
// //     setSubCategory(prev=>[...prev,e.target.value])
// //   }

// // //  toggleCategory
// //   const toggleCategory=(e)=>{
// // if(category.includes(e.target.value)){
// //   setCategory(prev=>prev.filter(item=>item!==e.target.value))
// // }
// // else
// //   setCategory(prev=>[...prev,e.target.value])
// //   }

// // const applyFilter=()=>{

// //     let productsCopy=products.slice();
// //     if(category.length>0){
// //       productsCopy=productsCopy.filter(item=>category.includes(item.category));
// //     }
// //     if(subCategory.length>0){
// //       productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
// //     }
// // setFilerProducts(productsCopy)
// // }

// // const sortProduct=()=>{
// //   let localFilterProducts=filerProducts.slice();
// //   switch(sortType){
// //     case 'low-high':
// //       setFilerProducts(localFilterProducts.sort((a,b)=>(a.price-b.price)))
// //       break;
  
// //   case 'high-low':
// //     setFilerProducts(localFilterProducts.sort((a,b)=>(b.price-a.price)))
// //     break
  
// //   default:
// //     applyFilter()
// //     break
// //     }
// // }

// //   useEffect(()=>{
// //     setFilerProducts(products)
// //   },[products])

// //   useEffect(()=>{
// // applyFilter();
// //   },[category,subCategory])

// //   useEffect(()=>{
// // sortProduct()
// //   },[products,sortType,category,subCategory])
  

//   return (
//     <div className={`flex  flex-col sm:flex-row ${showSearch ?  'mt-0' :'mt-20'} mt-0 sm:gap-10  px-8`}>
//       {/* filteroption */}
//       <div className='min-w-60'>
//         <p className='my-2 text-xl flex items-center cursor-pointer gap-2 ' onClick={() => setshowFilter(!showFilter)}>Filters
//           <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} `} alt="" />
//         </p>
//         {/* category filter */}

//         <div className={`border  border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>

//           <p className='mb-3 text-sm font-bold text-amber-300'>CATEGORIES</p>

//           <div className='flex flex-col gap-2 text-sm font-light'>
//             <p className='flex gap-2'>
//               <input onChange={toggleCategory} type="checkbox" value={'Men'} className='w-3' />Men
//             </p>

//             <p className='flex gap-2'>
//               <input onChange={toggleCategory}  type="checkbox" value={'Women'} className='w-3' />Women
//             </p>

//             <p className='flex gap-2'>
//               <input onChange={toggleCategory}  type="checkbox" value={'Kids'} className='w-3' />Kids
//             </p>

//           </div>
//         </div>

//         {/* subcategeory */}
//         <div className={`border  border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
//           <p className='mb-3 text-sm font-bold text-amber-300'>TYPE</p>
//           <div className='flex flex-col gap-2 text-sm font-light'>
//             <p className='flex gap-2'>
//               <input onChange={toggleSubCategory} type="checkbox" value={'Topwear'} className='w-3' />Topwear
//             </p>
//             <p className='flex gap-2'>
//               <input onChange={toggleSubCategory} type="checkbox" value={'Bottomwear'} className='w-3' />Bottomwear
//             </p>
//             <p className='flex gap-2'>
//               <input onChange={toggleSubCategory} type="checkbox" value={'Winterwear'} className='w-3' />Winterwear
//             </p>
//           </div>
//         </div>

//       </div>
// <div className='flex-1'>
// <div className='flex justify-between text-base mb-8 mt-3'>
  
// <Title text1={'ALL'} text2={'COLLECTION'}/>
// <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-1 py-0.5 rounded-2xl p-2 '>
//   <option  value="relevant">Sort by Relevent</option>
//   <option value="low-high">Sort by : Low to High</option>
//   <option value="high-low">Sort by : Hight to Low</option>
// </select>
// </div>

// <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
// {
//   filteredProducts.map((item,index)=>(
//     <ProductItem  key={item._id} id={item._id} imageUrl={item.imageUrl} name={item.name} price={item.price}/>
//   ))
// }
// </div>
// </div>
//     </div>
//   )
// }

// export default Collection;


import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ChevronDown } from 'lucide-react'

const Collection = () => {
  const { products, showSearch, search } = useContext(ShopContext)

  const [showFilter, setshowFilter] = useState(true)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [filteredProducts, setFilteredProducts] = useState([])

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  useEffect(() => {
    let result = [...products]
    if (category.length > 0) {
      result = result.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      result = result.filter(item => subCategory.includes(item.subCategory))
    }
    if (sortType === 'low-high') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      result.sort((a, b) => b.price - a.price)
    }
    if (showSearch && search) {
      result = result.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilteredProducts(result)
  }, [products, category, subCategory, sortType, search, showSearch])

  return (
    <div className={`flex flex-col sm:flex-row ${showSearch ? 'mt-0' : 'mt-20'} sm:gap-10 px-4 sm:px-8 pb-16`}>

      {/* filter sidebar */}
      <div className='min-w-50'>
        <p
          className='my-2 text-xl font-bold text-amber-600 flex items-center justify-between sm:justify-start cursor-pointer gap-2 select-none'
          onClick={() => setshowFilter(!showFilter)}
        >
          Filters
          <ChevronDown className={`w-4 h-4 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`} />
        </p>

        {/* category filter */}
        <div className={`border text-white bg-black border-gray-200 rounded-xl px-5 py-4 mt-4 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-bold text-amber-500 tracking-wide'>CATEGORIES</p>
          <div className='flex flex-col gap-2.5 text-sm text-gray-600'>
            {['Men', 'Women', 'Kids'].map(item => (
              <label key={item} className='flex items-center gap-2.5 cursor-pointer hover:text-amber-500 text-white transition-colors duration-150'>
                <input
                  onChange={toggleCategory}
                  type='checkbox'
                  value={item}
                  className='w-4 h-4 accent-amber-500 rounded cursor-pointer'
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* subcategory filter */}
        <div className={`border bg-black border-gray-200 rounded-xl px-5 py-4 mt-4 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-bold text-amber-500 tracking-wide'>TYPE</p>
          <div className='flex flex-col gap-2.5 text-sm text-white'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(item => (
              <label key={item} className='flex items-center gap-2.5 cursor-pointer hover:text-amber-500 transition-colors duration-150'>
                <input
                  onChange={toggleSubCategory}
                  type='checkbox'
                  value={item}
                  className='w-4 h-4 accent-amber-500 rounded cursor-pointer'
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* products */}
      <div className='flex-1 mt-6 sm:mt-3'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-base mb-8'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 text-sm text-gray-600 px-4 py-2 rounded-full outline-none focus:border-amber-500 cursor-pointer transition-colors duration-200'
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className='text-gray-400 text-sm text-center py-20'>No products match your filters.</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-2 p-4'>
            {filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection