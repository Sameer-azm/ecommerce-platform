import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const ProductItem = ({ id, imageUrl, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="group">
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex flex-col"
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-stone-100 aspect-[4/5]">
          <img
            src={imageUrl?.[0]}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Thin Border */}
          <div className="absolute inset-0 border border-black/5 group-hover:border-black/15 transition-colors duration-500" />

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

          {/* Discover Button */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="rounded-full bg-white px-5 py-2 text-xs font-medium tracking-wider uppercase">
              Discover
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-medium text-neutral-900">
              {name}
            </h3>

            <p className="mt-2 text-md tracking-wide text-neutral-900 ">
              {currency}
              {price}
            </p>
          </div>

         
        </div>
      </motion.article>
    </Link>
  );
};

export default ProductItem;