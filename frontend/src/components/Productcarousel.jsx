import React, { useState, useRef, useEffect, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
const FEATURED_MEDIA = {
  "6a7737f40da2645aeb9edb1b": { image: assets.Sneakers_img, video: assets.Sneakers_video },
    "6a7738f80da2645aeb9edb1d": { image: assets.Bag_img, video: assets.Bag_video },
  "6a772ddd0da2645aeb9edb1a": { image: assets.Glasses_img, video: assets.Glasses_video },
  "6a7738cc0da2645aeb9edb1c": { image: assets.Watch_img, video: assets.Watch_video },
  "6a7739b80da2645aeb9edb1f": { image: assets.Headphones_img, video: assets.Headphones_video },
  "6a7739120da2645aeb9edb1e": { image: assets.Perfume_img, video: assets.Perfume_video },
};
const SWIPE_THRESHOLD = 60;

export default function ProductCarousel() {
  const navigate = useNavigate(); 
  const { products } = useContext(ShopContext);
  const featuredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return Object.keys(FEATURED_MEDIA)
      .map((id) => {
        const match = products.find((p) => p._id === id);
        if (!match) return null; 
        return {
          _id: match._id,
          name: match.name,
          price: match.price,
          image: FEATURED_MEDIA[id].image,
          video: FEATURED_MEDIA[id].video,
        };
      })
      .filter(Boolean);
  }, [products]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0); // live drag offset, purely visual
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef(null); // the outer viewport (for measuring width)
  const cardRefs = useRef([]); // one ref per card (for measuring position)
  const videoRefs = useRef([]); // one ref per <video> (only active one exists)
  const dragStartX = useRef(0); // pointer X when drag began
  const baseTranslate = useRef(0); // computed centering offset (no drag)

  const [translateX, setTranslateX] = useState(0);
  const recenter = useCallback(() => {
    const track = trackRef.current;
    const activeCard = cardRefs.current[activeIndex];
    if (!track || !activeCard) return;

    const trackWidth = track.offsetWidth;
    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    const offset = trackWidth / 2 - cardCenter;

    baseTranslate.current = offset;
    setTranslateX(offset);
  }, [activeIndex]);

  useEffect(() => {
    recenter();
    window.addEventListener("resize", recenter);
    return () => window.removeEventListener("resize", recenter);
  }, [recenter, featuredProducts.length]);

  useEffect(() => {
    if (activeIndex >= featuredProducts.length) setActiveIndex(0);
  }, [featuredProducts.length, activeIndex]);

  useEffect(() => {
    const videoEl = videoRefs.current[activeIndex];
    if (videoEl) {
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {}); // ignore autoplay-blocked rejections
      }
    }
  }, [activeIndex, featuredProducts.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
  }, [featuredProducts.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  }, [featuredProducts.length]);

  const handleVideoEnded = () => {
    goToNext();
  };

  const handleCardClick = (index) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  const handleDiscoverClick = (e, productId) => {
    e.stopPropagation(); // don't let the card's onClick also fire
    navigate(`/product/${productId}`);
  };


  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    setDragOffset(delta);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > SWIPE_THRESHOLD) {
      goToPrev();
    } else if (dragOffset < -SWIPE_THRESHOLD) {
      goToNext();
    }
    setDragOffset(0);
  };

  if (featuredProducts.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto py-10 px-4 text-center text-neutral-400">
        Loading featured products…
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 select-none">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-neutral-900 mb-8">
        Featured Products
      </h2>

      <div
        ref={trackRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: "380px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className={`flex items-center h-full ${
            isDragging ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={{ transform: `translateX(${translateX + dragOffset}px)` }}
        >
          {featuredProducts.map((product, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={product._id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => handleCardClick(index)}
                className={`flex-shrink-0 mx-3 sm:mx-4 rounded-2xl overflow-hidden shadow-lg
                  bg-neutral-100 transition-all duration-500 ease-out cursor-pointer
                  w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96
                  ${isActive ? "ring-4 ring-neutral-900" : "ring-0"}`}
              >
                <div className="relative w-full h-full">
                  {isActive ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={product.video}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop={false}
                      playsInline
                      controls={false}
                      onEnded={handleVideoEnded}
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  )}

                  {/* Product name / price label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm sm:text-base font-medium truncate">
                      {product.name}
                    </p>
                    {product.price != null && (
                      <p className="text-white/80 text-xs sm:text-sm">${product.price}</p>
                    )}
                  </div>

                  {isActive && (
                    <button
                      onClick={(e) => handleDiscoverClick(e, product._id)}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs sm:text-sm
                        font-medium bg-white/90 text-neutral-900 shadow-md
                        hover:bg-white active:scale-95 transition"
                    >
                      Discover 
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={goToPrev}
          aria-label="Previous product"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
            bg-white/90 shadow-md flex items-center justify-center text-neutral-700
            hover:bg-white transition-colors"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          aria-label="Next product"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
            bg-white/90 shadow-md flex items-center justify-center text-neutral-700
            hover:bg-white transition-colors"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {featuredProducts.map((product, index) => (
          <button
            key={product._id}
            aria-label={`Go to ${product.name}`}
            onClick={() => handleCardClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-neutral-900" : "w-2 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}