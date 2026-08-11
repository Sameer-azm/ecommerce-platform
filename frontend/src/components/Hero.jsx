// import React, { useRef } from 'react'
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import { assets } from '../assets/frontend_assets/assets'

// const Hero = () => {
//   // Reference to the actual <video> element so we can control it manually
//   const videoRef = useRef(null)

//   // Called when the mouse enters (or the element gets keyboard focus)
//   const playVideo = () => {
//     videoRef.current.play()
//   }

//   // Called when the mouse leaves (or focus moves away)
//   const resetVideo = () => {
//     videoRef.current.pause()
//     videoRef.current.currentTime = 0 // rewind to the start, so poster-like frame shows again
//   }

//   return (
//     <div className='relative w-full h-[500px] sm:h-[650px] overflow-hidden rounded-2xl mt-12'>

//       <div
//         className='absolute inset-0'
//         onMouseEnter={playVideo}
//         onMouseLeave={resetVideo}
//         onFocus={playVideo}   // keyboard users tabbing onto this area
//         onBlur={resetVideo}
//         tabIndex={0}
//       >
//         <video
//           ref={videoRef}
//           src={assets.hero_video}
//           poster={assets.hero_thumbnail}
//           muted
//           playsInline
//           onEnded={resetVideo} // if video finishes on its own, go back to thumbnail
//           className='w-full h-full object-cover'
//         />
//       </div>

//       <div className='absolute inset-0 flex flex-col justify-center px-8 sm:px-16 bg-gradient-to-r from-white/90 via-white/40 to-transparent pointer-events-none'>
//        <motion.h1
//   initial={{ opacity: 0, x: -40 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.6 }}
//   className="font-cormorant-garamond text-5xl sm:text-7xl font-semibold text-[#FF5722]"
// >
//   Shopee
// </motion.h1>

// <motion.p
//   initial={{ opacity: 0, x: -40 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.6, delay: 0.3 }}
//   className="mt-4 max-w-sm text-black text-md sm:text-lg leading-relaxed"
// >
//   Premium Streetwear. Global Reach.
//   <br />
//   Your everyday, curated for the modern icon.
// </motion.p>
//         <motion.Link
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           to='/collection'
//           className='pointer-events-auto mt-8 inline-block w-fit border border-gray-800 text-gray-900 text-sm font-medium tracking-wide px-8 py-3 rounded-full hover:bg-amber-500 hover:text-white transition-colors duration-200'
//         >
//           SHOP NOW
//         </motion.Link>
//       </div>
//     </div>
//   )
// }

// export default Hero

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  const videoRef = useRef(null);

  const playVideo = () => {
    videoRef.current?.play();
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden mt-20"
      onMouseEnter={playVideo}
      onMouseLeave={resetVideo}
    >

      {/* VIDEO */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          src={assets.hero_video}
          poster={assets.hero_thumbnail}
          muted
          playsInline
          onEnded={resetVideo}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div
        className="
          absolute inset-0
          flex flex-col justify-center
          px-8 sm:px-16
          bg-gradient-to-r
          from-white/90
          via-white/40
          to-transparent
        "
      >

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="
            font-cormorant-garamond
            text-5xl sm:text-7xl
            font-semibold
            text-[#FF5722]
          "
        >
          Shopee
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="
            mt-4
            max-w-sm
            text-black
            text-md sm:text-lg
            leading-relaxed
          "
        >
          Premium Streetwear. Global Reach.

          <br />

          Your everyday, curated for the modern icon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/collection"
            className="
              inline-block
              mt-8
              border border-gray-800
              text-gray-900
              text-sm
              font-medium
              tracking-wide
              px-8 py-3
              rounded-full
              hover:bg-amber-500
              hover:text-white
              transition-colors
              duration-200
            "
          >
            SHOP NOW
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;