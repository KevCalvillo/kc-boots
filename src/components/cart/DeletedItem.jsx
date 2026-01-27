"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function DeletedItemNotification({ deletedItem, onUndo }) {
  return (
    <AnimatePresence>
      {deletedItem && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
          }}
          className="fixed bottom-5 right-5 bg-stone-800 text-white p-4 rounded-lg shadow-lg flex items-center gap-4 z-50 text-2xl"
        >
          <p>Se eliminó {deletedItem.title}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onUndo}
            className="text-blue-400 font-bold hover:underline"
          >
            DESHACER
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
