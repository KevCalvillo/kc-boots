"use client";
import { motion } from "framer-motion";
import Modal from "../Modal";
import CartTable from "./CartTable";
import { useAuth } from "@/context/AuthContext";

export default function CartModal({
  isOpen,
  onClose,
  cart,
  onDecrease,
  onIncrease,
  onRemove,
  onCancel,
}) {
  const { getCartTotal } = useAuth();

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const isEmpty = cart.length === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-white text-2xl px-20 py-10"
        >
          <h1>Carrito Vacío</h1>
          <p className="text-stone-400 text-lg mt-2">
            Agrega productos al carrito.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-10"
        >
          <CartTable
            cart={cart}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onRemove={onRemove}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-8 pt-6 border-t border-stone-600"
          >
            <div className="flex justify-between items-center text-white text-3xl font-bold mb-6">
              <span>Total:</span>
              <motion.span
                key={getCartTotal()}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-green-500"
              >
                ${getCartTotal().toFixed(2)} USD
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center justify-center gap-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="text-2xl bg-red-700 hover:bg-red-900 text-white font-bold py-3 px-6 rounded transition-colors cursor-pointer"
            >
              Cancelar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-8 rounded transition-colors cursor-pointer"
            >
              Pagar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </Modal>
  );
}