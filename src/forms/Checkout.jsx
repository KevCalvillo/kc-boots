"use client";
import { useState } from "react";
import { Truck, Package } from "lucide-react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function CheckoutForm({ orderId, total }) {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState(null);

  const inputStyle =
    "w-full bg-stone-900 border border-stone-800 text-white py-3 px-5 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-600";
  const labelStyle = "text-sm text-stone-400 ml-1 mb-2 block"; // Agregué block y mb-2 para mejor espaciado

  function handleButtonClick() {
    const orderData = {
      orderId: orderId,
      total: total,
    };
    fetch("/api/checkout", {
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
      .then((data) => {
        setStep(2);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-[#121212] p-8 md:p-10 rounded-3xl border border-stone-800 shadow-lg font-roboto">
      <div className="flex flex-col gap-8">
        {step === 1 ? (
          <>
            {/* SECCIÓN CONTACTO */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-3xl font-rancho text-white">Contacto</h3>
                <span className="text-stone-500 text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <a
                    href="#"
                    className="text-primary underline hover:text-white transition-colors"
                  >
                    Inicia Sesión
                  </a>
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelStyle}>Correo electrónico</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className={inputStyle}
                  />
                </div>
                <label className="flex items-center cursor-pointer group w-fit">
                  <input
                    type="checkbox"
                    name="newsletter"
                    className="mr-3 accent-primary w-5 h-5 cursor-pointer"
                  />
                  <span className="text-stone-400 group-hover:text-white transition-colors">
                    Enviarme novedades y ofertas
                  </span>
                </label>
              </div>
            </div>

            <hr className="border-stone-800" />

            {/* SECCIÓN DIRECCIÓN */}
            <div>
              <h3 className="text-3xl font-rancho text-white mb-6">
                Dirección de Envío
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nombre */}
                <div className="flex flex-col">
                  <label className={labelStyle}>Nombre</label>
                  <input
                    required
                    name="firstName"
                    type="text"
                    placeholder="Kevin"
                    className={inputStyle}
                  />
                </div>

                {/* Apellido */}
                <div className="flex flex-col">
                  <label className={labelStyle}>Apellidos</label>
                  <input
                    required
                    name="lastName"
                    type="text"
                    placeholder="Calvillo"
                    className={inputStyle}
                  />
                </div>

                {/* Calle */}
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelStyle}>Calle y Número</label>
                  <input
                    required
                    name="address"
                    type="text"
                    placeholder="Av. Revolución 123, Col. Centro"
                    className={inputStyle}
                  />
                </div>

                {/* País */}
                <div className="flex flex-col">
                  <label className={labelStyle}>País</label>
                  <div className="relative">
                    <select
                      name="country"
                      className={`${inputStyle} appearance-none cursor-pointer`}
                    >
                      <option value="MX">México</option>
                      <option value="US">Estados Unidos</option>
                      <option value="CA">Canadá</option>
                    </select>
                    {/* Flecha personalizada para el select */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Código Postal */}
                <div className="flex flex-col">
                  <label className={labelStyle}>Código Postal</label>
                  <input
                    required
                    name="zipCode"
                    type="text"
                    placeholder="37000"
                    className={inputStyle}
                  />
                </div>

                {/* Estado */}
                <div className="flex flex-col">
                  <label className={labelStyle}>Estado</label>
                  <div className="relative">
                    <select
                      name="state"
                      className={`${inputStyle} appearance-none cursor-pointer`}
                    >
                      <option value="">Selecciona...</option>
                      <option value="Gto">Guanajuato</option>
                      <option value="Jal">Jalisco</option>
                      <option value="NL">Nuevo León</option>
                      <option value="CDMX">Ciudad de México</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Municipio */}
                <div className="flex flex-col">
                  <label className={labelStyle}>Municipio / Alcaldía</label>
                  <input
                    required
                    name="municipality"
                    type="text"
                    placeholder="León"
                    className={inputStyle}
                  />
                </div>

                {/* Teléfono */}
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelStyle}>Teléfono</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="(477) 123 4567"
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            <hr className="border-stone-800" />

            {/* SECCIÓN MÉTODO DE ENVÍO */}
            <div>
              <h3 className="text-3xl font-rancho text-white mb-6">
                Método de Envío
              </h3>
              <input
                type="hidden"
                name="shippingMethod"
                value={shippingMethod}
              />

              <div className="grid grid-cols-1 gap-4">
                {/* Opción Standard */}
                <div
                  onClick={() => setShippingMethod("standard")}
                  className={`cursor-pointer p-5 rounded-xl border flex items-center justify-between transition-all duration-300 group
                ${
                  shippingMethod === "standard"
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(161,128,70,0.2)]"
                    : "border-stone-700 bg-stone-900 hover:border-stone-500 hover:bg-stone-800"
                }`}
                >
                  <div className="flex items-center gap-4">
                    <Truck
                      className={
                        shippingMethod === "standard"
                          ? "text-primary"
                          : "text-stone-500 group-hover:text-stone-300"
                      }
                    />
                    <div>
                      <p className="font-bold text-white">
                        Envío Estándar (FedEx)
                      </p>
                      <p className="text-sm text-stone-400">3-5 días hábiles</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">GRATIS</span>
                </div>

                {/* Opción Express */}
                <div
                  onClick={() => setShippingMethod("express")}
                  className={`cursor-pointer p-5 rounded-xl border flex items-center justify-between transition-all duration-300 group
                ${
                  shippingMethod === "express"
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(161,128,70,0.2)]"
                    : "border-stone-700 bg-stone-900 hover:border-stone-500 hover:bg-stone-800"
                }`}
                >
                  <div className="flex items-center gap-4">
                    <Package
                      className={
                        shippingMethod === "express"
                          ? "text-primary"
                          : "text-stone-500 group-hover:text-stone-300"
                      }
                    />
                    <div>
                      <p className="font-bold text-white">
                        Envío Express (DHL)
                      </p>
                      <p className="text-sm text-stone-400">1-2 días hábiles</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">$250.00</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleButtonClick}
              className="mt-6 w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-full text-xl shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              Continuar al Pago
            </button>
          </>
        ) : step===2?(
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <div>
              <PaymentForm total={total} onSuccess={setStep}/>
            </div>
          </Elements>
        ):(
          <div>Pago exitoso</div>
        )}
      </div>
    </div>
  );
}
