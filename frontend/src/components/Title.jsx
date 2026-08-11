import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center sm:items-start gap-2 mb-6 font-cormorant-garamond"
    >
      <p className="text-2xl sm:text-3xl md:text-4xl tracking-wide">
        <span className="text-amber-500 font-extrabold">{text1}</span>
        <span className="text-gray-700 font-medium ml-2">{text2}</span>
      </p>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "3.5rem" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="h-[3px] bg-gradient-to-r from-amber-500 to-gray-700 rounded-full"
      />
    </motion.div>
  );
};

export default Title;