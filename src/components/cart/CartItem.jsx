"use client";
import { motion } from "framer-motion";
import MinusCircle from "@/ui/icons/Minus";
import CirclePlus from "@/ui/icons/CirclePlus";
import Delete from "@/ui/icons/Delete";

export default function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-[#141414f2] border-b border-gray-600"
    >
      <td className="px-10 py-5 flex items-center gap-10">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative bg-linear-to-br from-stone-400 to-stone-200 flex items-center justify-center p-4 rounded-2xl"
        >
          <img
            src={item.imageUrl}
            className="w-full h-20 object-contain transform"
            alt={item.title}
          />
        </motion.div>
        {item.title}
      </td>
      <td className="text-center">$ {item.price} USD</td>
      <td className="text-center">
        <motion.span
          key={item.quantity}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="font-bold text-green-500"
        >
          {item.quantity}
        </motion.span>
      </td>
      <td className="text-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDecrease(item.id)}
          aria-label="Disminuir cantidad"
        >
          <MinusCircle className="w-6 h-6 hover:fill-green-600 transition-colors duration-300 cursor-pointer" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onIncrease(item)}
          aria-label="Aumentar cantidad"
        >
          <CirclePlus className="w-6 h-6 hover:fill-green-600 transition-colors duration-300 cursor-pointer" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(item.id)}
          aria-label="Eliminar"
        >
          <Delete className="w-6 h-6 hover:fill-red-600 transition-colors duration-300 cursor-pointer" />
        </motion.button>
      </td>
    </motion.tr>
  );
}
