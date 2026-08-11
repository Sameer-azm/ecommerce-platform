import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import ProductCarousel from '../components/Productcarousel'

const Home = () => {
  return (
    <div>
   <Hero/>
   <ProductCarousel/>
   <LatestCollection/>
    <OurPolicy/> 
   <BestSellers/>
  <NewsLetterBox/>
  
    </div>
  )
}

export default Home