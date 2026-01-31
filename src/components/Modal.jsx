"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import XmarkCircle from "@/ui/icons/ExitCircle";

export default function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(isOpen);
  const onCloseRef = useRef(onClose);

  // Mantener la referencia actualizada
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#101010cf] w-fit rounded-3xl shadow-4xl relative overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-6 right-6 text-stone-400 hover:text-white cursor-pointer z-10"
            >
              <XmarkCircle className="w-8 h-8 fill-white hover:fill-red-500 transition-colors duration-300" />
            </motion.button>
            <div className="flex p-6 gap-10">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
