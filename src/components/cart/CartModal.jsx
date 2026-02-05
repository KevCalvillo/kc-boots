"use client";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import CartItem from "./CartItem";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, X } from "lucide-react";

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
      body: JSON.stringify(orderData),
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
        router.push(`/checkout/${order.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isEmpty = cart.length === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full font-roboto p-10">
        {/* HEADER DEL MODAL */}
        <div className="flex items-center justify-between mb-8 border-b border-stone-800 pb-4">
          <h2 className="text-4xl text-white font-rancho flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" />
            Tu Carrito{" "}
            <span className="text-stone-500 text-lg font-roboto font-normal">
              ({cart.length} items)
            </span>
          </h2>
        </div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-stone-600" />
            </div>
            <h3 className="text-2xl text-white font-bold mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-stone-400 mb-8">
              Parece que aún no has elegido tu par perfecto.
            </p>
            <button onClick={onClose} className="text-primary hover:underline">
              Seguir explorando
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LISTA DE PRODUCTOS (SCROLLABLE) */}
            <div className="flex-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onDecrease={onDecrease}
                    onIncrease={onIncrease}
                    onRemove={onRemove}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* RESUMEN DE COMPRA (PANEL DERECHO) */}
            <div className="w-full lg:w-80 bg-stone-900/50 p-6 rounded-2xl border border-stone-800 h-fit">
              <h3 className="text-xl text-white font-bold mb-6">Resumen</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Envío estimado</span>
                  <span className="text-green-500">Gratis</span>
                </div>
              </div>

              <div className="border-t border-stone-700 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-stone-300">Total</span>
                  <span className="text-3xl text-primary font-bold font-rancho">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCreateOrder}
                className="w-full bg-primary hover:bg-primary-hover hover:scale-102 font-bold py-4 rounded-xl shadow-lg transition-all mb-3"
              >
                Proceder al Pago
              </button>

              <button
                onClick={onClose}
                className="w-full text-stone-500 hover:text-white hover:scale-102 transition-colors text-sm"
              >
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
