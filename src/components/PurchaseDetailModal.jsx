"use client";
import Modal from "./Modal";
import { Package, MapPin, Calendar, Hash } from "lucide-react";

export default function PurchaseDetailModal({ isOpen, onClose, order, user }) {
  if (!order) return null;

  const subtotal = order.orderItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full p-12 font-roboto overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-stone-800">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl text-white font-rancho">
              Detalle de Compra
            </h2>
            <div className="flex items-center gap-3 text-stone-400 text-xs mt-1">
              <span className="flex items-center gap-1">
                <Hash className="w-3 h-3" />
                {order.id}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-4 mb-6">
          <h3 className="text-sm text-stone-400 uppercase tracking-wider">
            Productos
          </h3>
          <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto scrollbar-negro pr-1">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center bg-stone-900/50 p-3 rounded-xl"
              >
                <div className="size-16 bg-linear-to-br from-stone-200 to-stone-500 rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={item.product.imageUrl}
                    className="size-10 object-contain"
                    alt={item.product.title}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-white truncate">
                    {item.product.title}
                  </h4>
                  <div className="flex gap-3 text-stone-400 text-xs mt-1">
                    <span>Cant: {item.quantity}</span>
                    {item.size && <span>Talla: {item.size}</span>}
                  </div>
                </div>
                <span className="font-mono font-bold text-stone-300 shrink-0">
                  ${Number(item.price).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className="mb-6 pb-4 border-b border-stone-800">
            <h3 className="text-sm text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Dirección de envío
            </h3>
            <div className="bg-stone-900/50 p-4 rounded-xl text-sm text-stone-300 space-y-1">
              {order.shippingName && (
                <p className="font-bold">{order.shippingName}</p>
              )}
              <p>{order.shippingAddress}</p>
              <p>
                {[order.shippingCity, order.shippingState, order.shippingZip]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {order.shippingPhone && (
                <p className="text-stone-400">Tel: {order.shippingPhone}</p>
              )}
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-stone-400">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-stone-400">
            <span>Envío</span>
            <span className="text-primary">GRATIS</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-3 pt-3 border-t border-stone-800 text-primary">
            <span>Total</span>
            <span>${Number(order.total).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
