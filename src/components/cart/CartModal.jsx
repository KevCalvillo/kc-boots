"use client";
import { motion } from "framer-motion";
import Modal from "../Modal";
import CartTable from "./CartTable";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartModal({
  isOpen,
  onClose,
  cart,
  onDecrease,
  onIncrease,
  onRemove,
  onCancel,
}) {
  const { getCartTotal, user } = useAuth();
  const total = getCartTotal();
  const router = useRouter();
  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const handleCreateOrder = () => {

    const orderData = {
      userId: user.id,
      total: total,
      orderItems: cart.map((item) => ({
        productId: item.id,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    console.log("Datos a enviar:", orderData);

    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData)
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message);
        }
        return res.json();
      })
      .then((order) => {
        onClose();
        router.push(`/checkout/${order.id}`)
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div className="flex justify-end gap-5 items-center text-white text-3xl font-bold mb-6">
              <span>Total:</span>
              <motion.span
                key={total}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-green-700"
              >
                ${total.toFixed(2)} MXN
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
              onClick={handleCreateOrder}
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
