"use client";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex gap-4 p-4 mb-4 bg-[#1a1a1a] rounded-2xl border border-stone-800 hover:border-stone-700 transition-colors group"
    >
      {/* IMAGEN DEL PRODUCTO */}
      <div className="w-24 h-24 bg-linear-to-br from-stone-200 to-stone-500 rounded-xl p-2 flex items-center justify-center shrink-0">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* INFO DEL PRODUCTO */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-white font-bold text-lg leading-tight pr-4">
              {item.title}
            </h4>
            <button
              onClick={() => onRemove(item.cartKey)}
              className="text-stone-600 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          {item.size && (
            <p className="text-sm text-stone-500 mt-1">Talla: {item.size} MX</p>
          )}
          {/* Ejemplo estático */}
        </div>

        <div className="flex justify-between items-end mt-2">
          {/* CONTROL DE CANTIDAD */}
          <div className="flex items-center gap-3 bg-stone-900 rounded-lg p-1 border border-stone-800">
            <button
              onClick={() => onDecrease(item.cartKey)}
              className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 rounded-md transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white font-mono font-bold w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item)}
              className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 rounded-md transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* PRECIO */}
          <span className="text-primary font-bold text-xl">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
