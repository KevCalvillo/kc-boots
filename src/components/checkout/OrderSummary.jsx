"use client";

export default function OrderSummary({ subtotal, shippingCost }) {
  const total = subtotal + shippingCost;

  return (
    <div className="mt-8 border-t border-stone-800 pt-6 space-y-3 text-lg">
      <div className="flex justify-between text-stone-400">
        <span>Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-stone-400">
        <span>Envío</span>
        <span className="text-primary">
          {shippingCost === 0 ? "GRATIS" : `$${shippingCost.toLocaleString()}`}
        </span>
      </div>
      <div className="flex justify-between text-2xl font-bold mt-6 pt-6 border-t border-stone-800 text-primary">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}
