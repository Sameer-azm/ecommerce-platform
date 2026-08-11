import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const NAV_LINKS = [
  { name: 'HOME', path: '/' },
  { name: 'COLLECTION', path: '/collection' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' }
]

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { setShowSearch, getCartCount, navigate, setToken, token, setCartItems } = useContext(ShopContext)

  const logoutHandler = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login')
      setToken('')
      localStorage.removeItem('token')
      setCartItems({})
      setProfileOpen(false)
    }
  }

  const cartCount = getCartCount()

  return (
    <div className='flex z-50 fixed justify-between md:justify-around items-center px-5 md:px-0 py-5 h-20 font-medium w-full bg-stone-50/95 backdrop-blur-sm border-b border-stone-200'>
      <Link to='/'>
        <motion.img
          src={assets.logo}
          className='w-36'
          alt="Logo"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </Link>

      <ul className='hidden md:flex gap-5 justify-center'>
        {NAV_LINKS.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[13px] tracking-wide transition-colors duration-200 ${
                isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p>{name}</p>
                {isActive && (
                  <motion.hr
                    layoutId="nav-underline"
                    className='w-2/4 border-none h-[2px] bg-stone-800 rounded-full'
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-6'>
        <motion.button
          onClick={() => setShowSearch(true)}
          aria-label="Search"
          className='cursor-pointer bg-transparent border-none p-0'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src={assets.search_icon} className='w-5 opacity-60 hover:opacity-100 transition-opacity duration-200' alt="" />
        </motion.button>

        <div className='relative'>
          <motion.button
            onClick={() => token ? setProfileOpen(o => !o) : navigate('/login')}
            aria-label={token ? 'Account menu' : 'Log in'}
            className='cursor-pointer bg-transparent border-none p-0'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={assets.profile_icon} className='w-5 opacity-60 hover:opacity-100 transition-opacity duration-200' alt="" />
          </motion.button>

          <AnimatePresence>
            {token && profileOpen && (
              <motion.div
                className='absolute right-0 pt-3 z-50'
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white text-stone-600 rounded-lg border border-stone-200 shadow-md'>
                  <p className='cursor-pointer hover:text-stone-900 transition-colors duration-150'>My profile</p>
                  <p
                    onClick={() => { setProfileOpen(false); navigate('/orders') }}
                    className='cursor-pointer hover:text-stone-900 transition-colors duration-150'
                  >
                    Orders
                  </p>
                  <p
                    className='cursor-pointer hover:text-stone-900 transition-colors duration-150'
                    onClick={logoutHandler}
                  >
                    Log Out
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to='/cart' className='relative' aria-label={`Cart, ${cartCount} items`}>
          <motion.img
            src={assets.cart_icon}
            className='w-5 opacity-60 hover:opacity-100 transition-opacity duration-200'
            alt=""
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.p
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className='absolute -right-1.5 -bottom-1.5 min-w-4 h-4 px-0.5 text-center leading-4 bg-stone-800 text-white rounded-full text-[10px] font-medium'
              >
                {cartCount}
              </motion.p>
            )}
          </AnimatePresence>
        </Link>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-transparent border-none cursor-pointer p-0"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[1.5px] bg-stone-800 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block h-[1.5px] bg-stone-800 transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-6"}`} />
          <span className={`block w-6 h-[1.5px] bg-stone-800 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed flex flex-col justify-start gap-6 font-medium top-20 right-0 left-0 w-full z-40 bg-stone-50 h-screen border-t border-stone-200 px-5 pt-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {NAV_LINKS.map(({ name, path }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <NavLink href='top' onClick={() => setMenuOpen(false)} to={path}>
                  {({ isActive }) => (
                    <p className={`text-2xl py-1 transition-colors duration-150 ${isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}>
                      {name}
                    </p>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Nav