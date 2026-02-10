"use client";
import { AnimatePresence } from "framer-motion";
import CartItem from "./CartItem";

export default function CartTable({ cart, onDecrease, onIncrease, onRemove }) {
  return (
    <table className="w-full text-white text-2xl border-collapse">
      <thead>
        <tr className="border-b border-stone-600 text-center">
          <th className="px-10 py-5">Articulo</th>
          <th className="px-10 py-5">Precio</th>
          <th className="px-10 py-5">Cantidad</th>
          <th className="px-10 py-5">Acciones</th>
        </tr>
      </thead>
      <tbody className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="popLayout">
          {cart.map((item, index) => (
            <CartItem
              key={item.cartKey || item.id}
              item={item}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  );
}
