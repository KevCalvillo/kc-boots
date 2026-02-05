"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children, className }) {
  const [show, setShow] = useState(isOpen);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onCloseRef.current();
    }, 300);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#121212] relative rounded-3xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col ${className ? className : "w-fit"} max-h-[95vh] max-w-full`}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-[60] p-2 bg-black/40 hover:bg-red-500/20 rounded-full text-stone-400 hover:text-white backdrop-blur-md transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
