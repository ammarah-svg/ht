"use client";

import { motion } from "framer-motion";

export default function Toast({ message, type = "success" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50 ${
        type === "success"
          ? "bg-gradient-to-r from-[#da713a] to-[#da713a]/80"
          : type === "error"
          ? "bg-gradient-to-r from-red-500 to-red-400"
          : "bg-gradient-to-r from-yellow-500 to-yellow-400"
      } before:absolute before:inset-0 before:blur-lg before:opacity-50 before:bg-inherit before:-z-10`}
    >
      <p className="text-white text-center font-medium relative z-10">
        {message}
      </p>
    </motion.div>
  );
}