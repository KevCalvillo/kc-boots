"use client";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ isOpen, onToggle }) {
  return (
    <div className="relative hidden sm:flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            type="text"
            placeholder="Buscar modelo..."
            className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-primary font-roboto mr-2"
            autoFocus
          />
        )}
      </AnimatePresence>
      <button
        onClick={onToggle}
        className="hover:text-primary transition-all cursor-pointer hover:scale-110 duration-300"
      >
        {isOpen ? <X size={24} /> : <Search size={24} />}
      </button>
    </div>
  );
}
