import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 p-4 mt-40 bg-sand text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden'
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img src={assets.logo} className='w-32 mb-2 mt-2' alt="" />
        <p className='text-sm font-cormorant-garamond'>
          Discover a seamless shopping experience with our curated eCommerce
          collection, featuring premium-quality products designed for style,
          comfort, and everyday living.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className='font-bold text-lg'>Company</p>
        <ul className='flex flex-col text-sm font-normal'>
          <li>
            <a href="/contact" className='hover:text-black'>
              Contact Us
            </a>
          </li>
          <li>
            <a href="/about" className='hover:text-black'>
              About
            </a>
          </li>
          <li>
            <a href="/collection" className='hover:text-black'>
              Collection
            </a>
          </li>
          <li>
            <a href="/" className='hover:text-black'>
              Home
            </a>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className='font-bold text-lg'>Follow Us</p>
        <ul className='flex flex-col text-sm font-normal'>
          <li>
            <a
              href="https://www.facebook.com/shopee"
              target="_blank"
              rel="noopener noreferrer"
              className='hover:text-black'
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/shopee"
              target="_blank"
              rel="noopener noreferrer"
              className='hover:text-black'
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.whatsapp.com/shopee"
              target="_blank"
              rel="noopener noreferrer"
              className='hover:text-black'
            >
              +92 300 1234567
            </a>
          </li>
        </ul>
      </motion.div>

      <motion.hr
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className='border-gray-300 sm:col-span-3 origin-left'
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        viewport={{ once: true }}
        className='sm:col-span-3'
      >
        <p className='text-sm text-center py-1'>
          © 2023 Shopee. All rights reserved.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Footer
