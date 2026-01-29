"use client";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

export default function PaymentForm({ total, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      onSuccess(3);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-3xl font-rancho text-white mb-6">Método de Pago</h3>
      <PaymentElement />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        disabled={!stripe || isLoading}
        className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-full text-xl disabled:opacity-50"
      >
        {isLoading ? "Procesando..." : `Pagar $${total.toLocaleString()}`}
      </button>
    </form>
  );
}
