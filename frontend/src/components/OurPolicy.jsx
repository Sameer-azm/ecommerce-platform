import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, ShieldCheck, Headset } from "lucide-react";

const policies = [
  {
    icon: RefreshCw,
    title: "Exchange Policy",
    description: "30 days exchange policy for all products.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Policy",
    description: "30 days quality policy for all products.",
  },
  {
    icon: Headset,
    title: "Support Policy",
    description: "24/7 support available for all products.",
  },
];

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center text-xs sm:text-sm md:text-base py-12">
      {policies.map(({ icon: Icon, title, description }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-50 mb-2">
            <Icon className="w-6 h-6 text-amber-500" strokeWidth={1.75} />
          </div>

          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-gray-500">{description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default OurPolicy;