"use client";

import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50 ${toast.type === "success" ? "bg-gradient-to-r from-[#da713a] to-[#da713a]/80" : toast.type === "error" ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gradient-to-r from-yellow-500 to-yellow-400"} before:absolute before:inset-0 before:blur-lg before:opacity-50 before:bg-inherit before:-z-10`}
          >
            <p className="text-white text-center font-medium relative z-10">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}