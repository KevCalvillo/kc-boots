"use client";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function PaymentForm({ total, onSuccess, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cleanCart, user, cart } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        background: "#1d1d1de8",
        color: "#ffffff",
      });
    } else if (paymentIntent.status === "succeeded") {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      onSuccess(3);
      cleanCart();
      router.push(`/order-confirmation/${orderId}`);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-4xl font-rancho text-white mb-6 text-center">
        Método de Pago
      </h3>
      <PaymentElement />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        disabled={!stripe || isLoading}
        className="mt-6 w-full bg-primary text-bgprimary hover:scale-102 font-bold py-2 cursor-pointer rounded-full text-lg disabled:opacity-50 transition-all duration-300 transform hover:bg-primary-hover"
      >
        {isLoading ? "Procesando..." : `Pagar $${total.toLocaleString()}`}
      </button>
    </form>
  );
}
