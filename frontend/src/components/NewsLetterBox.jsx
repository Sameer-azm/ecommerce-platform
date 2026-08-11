import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NewsLetterBox = () => {
  const FORMSPREE_ID = "mkokzarq";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");

        // Hide success message after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="w-full px-4 py-16"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-gray-900 rounded-3xl px-6 sm:px-12 py-10 sm:py-14 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.25em] text-amber-500 text-xs sm:text-sm font-semibold mb-3"
        >
          Stay in the loop
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
        >
          Subscribe to our Newsletter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-3 max-w-md mx-auto"
        >
          Get 10% off your first order, plus early access to new arrivals and
          exclusive offers.
        </motion.p>

        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full flex-1 outline-none bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-3 rounded-full focus:border-amber-500 transition-colors duration-200"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={status === "loading"}
            className="flex items-center justify-center gap-2 bg-amber-500 text-gray-900 font-medium px-6 py-3 rounded-full hover:bg-amber-400 disabled:opacity-60"
          >
            {status === "loading" ? (
              "Sending..."
            ) : (
              <>
                Subscribe <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-amber-400 text-sm mt-4"
            >
               You're subscribed! Check your inbox.
            </motion.p>
          )}

          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-red-400 text-sm mt-4"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default NewsLetterBox;