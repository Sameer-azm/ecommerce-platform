import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../components/RelatedProduct';
import { Star, Truck, RotateCcw, ShieldCheck, Minus, Plus } from 'lucide-react'

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.imageUrl[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t border-gray-200 pt-24  sm:pt-22 px-4 sm:px-8 max-w-6xl mx-auto transition-opacity ease-in duration-500 opacity-100'>

      {/* product data */}
      <div className='flex gap-8 sm:gap-14 flex-col sm:flex-row'>

        {/* product image */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-start sm:justify-normal gap-2 sm:gap-3 sm:w-[18%] w-full'>
            {productData.imageUrl.map((item, i) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={i}
                className={`w-16 sm:w-full aspect-square object-cover flex-shrink-0 cursor-pointer border transition-colors duration-200 ${
                  image === item ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                }`}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[82%] border border-gray-200 overflow-hidden bg-gray-50'>
            <img src={image} className='w-full h-auto object-cover' alt="" />
          </div>
        </div>

        {/* product info */}
        <div className='flex-1'>
          <p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-2'>{productData.category}</p>
          <h1 className='font-cormorant-garamond text-3xl sm:text-4xl font-semibold text-gray-800'>{productData.name}</h1>

          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <p className='pl-2 text-sm text-gray-500'>(122 reviews)</p>
          </div>

          <p className='mt-4 text-3xl font-semibold font-syne text-gray-900'>{currency}{productData.price}</p>
          <p className='mt-4 text-gray-500 leading-relaxed md:w-4/5'>{productData.description}</p>

          <div className="flex flex-col gap-3 my-6">
            <div className='flex items-center justify-between md:w-4/5'>
              <p className='font-cormorant-garamond text-lg font-medium'>Select Size</p>
              <p className='text-xs text-gray-400 underline cursor-pointer'>Size guide</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-5 text-sm font-medium transition-all duration-200 ${
                    item === size
                      ? 'border-gray-900 bg-[#FF7043] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-900'
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              console.log("Add to Cart button clicked");
              console.log("Product ID:", productData._id);
              console.log("Selected Size:", size);
              addToCart(productData._id, size)
            }}
            className='w-full sm:w-auto bg-amber-500 hover:bg-[#FF7043] text-black text-md px-10 py-3.5 text-sm font-medium tracking-wide  active:scale-[0.98] transition-all duration-200'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5 border-gray-200' />

          <div className='text-gray-500 text-sm mt-5 flex flex-col gap-2.5'>
            <p className='flex items-center gap-2'><ShieldCheck className='w-4 h-4 text-gray-400' /> 100% original</p>
            <p className='flex items-center gap-2'><Truck className='w-4 h-4 text-gray-400' /> Cash on delivery available</p>
            <p className='flex items-center gap-2'><RotateCcw className='w-4 h-4 text-gray-400' /> Easy 30-day returns</p>
          </div>
        </div>
      </div>

      {/* description / reviews tabs */}
      <div className='mt-16 sm:mt-20'>
        <div className='flex border border-gray-200 divide-x divide-gray-200'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-5 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'description' ? 'bg-[#FF7043] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'reviews' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            Reviews (321)
          </button>
        </div>

        <div className='border border-t-0 border-gray-200 px-6 py-6 text-sm text-gray-600 leading-relaxed'>
          {activeTab === 'description' ? (
            <p>{productData.description}</p>
          ) : (
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1.5 pb-5 border-b border-gray-100'>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p>Amazing quality products and super fast delivery. The packaging was neat and everything arrived exactly as shown. Will definitely shop again. The product quality is really good for the price. Delivery took one extra day, but overall a great shopping experience.</p>
              </div>
              <div className='flex flex-col gap-1.5'>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p>Loved the customer support experience. They replied quickly and helped me with my order smoothly. Highly recommended store.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='mt-20'>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product