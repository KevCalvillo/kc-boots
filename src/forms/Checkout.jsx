"use client";
import { useState, useEffect } from "react";
import { Truck, Package } from "lucide-react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LockIcon } from "lucide-react";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function CheckoutForm({ orderId, subtotal, orderUserId }) {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState(null);
  const [useProfileAddress, setUseProfileAddress] = useState(false);
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "MX",
    zipCode: "",
    state: "",
    municipality: "",
    phone: "",
  });
  const router = useRouter();
  const { user } = useAuth();

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleUseProfileAddress = (checked) => {
    setUseProfileAddress(checked);
    if (checked && user) {
      setShipping({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        address: user.address || "",
        country: "MX",
        zipCode: user.zip || "",
        state: user.state || "",
        municipality: user.city || "",
        phone: user.phone || "",
      });
    } else {
      setShipping({
        firstName: "",
        lastName: "",
        address: "",
        country: "MX",
        zipCode: "",
        state: "",
        municipality: "",
        phone: "",
      });
    }
  };

  const shippingCost = shippingMethod === "express" ? 250 : 0;
  const finalTotal = subtotal + shippingCost;

  useEffect(() => {
    const shippingDisplay = document.getElementById("shipping-cost-display");
    const totalDisplay = document.getElementById("total-display");
    if (shippingDisplay && totalDisplay) {
      shippingDisplay.textContent =
        shippingCost === 0 ? "GRATIS" : `$${shippingCost.toLocaleString()}`;
      shippingDisplay.className = shippingCost === 0 ? "text-primary" : "";
      totalDisplay.textContent = `$${finalTotal.toLocaleString()}`;
    }
  }, [shippingCost, finalTotal]);

  useEffect(() => {
    if (user && user.id !== orderUserId) {
      router.push("/");
    }
  }, [user, orderUserId, router]);

  if (!user) {
    return (
      <div className="bg-[#121212] flex flex-col items-center justify-center p-10 rounded-3xl border border-stone-800 text-center">
        <div className="bg-[#0c0c0c] mt-10 mb-10 p-8 rounded-2xl border border-primary">
          <LockIcon className="w-15 h-15 stroke-primary " />
        </div>
        <h2 className="text-6xl font-rancho text-white mb-5">
          Acceso denegado
        </h2>
        <p className="text-stone-400 text-xl mb-8">
          Debes iniciar sesión para continuar
        </p>
      </div>
    );
  }

  if (user.id !== orderUserId) {
    return null;
  }
  const inputStyle =
    "w-full bg-stone-900 text-sm border border-stone-800 text-white py-2 px-5 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-600";
  const labelStyle = "text-xs text-stone-400 ml-1 mb-2 block";

  function handleButtonClick() {
    const orderData = {
      orderId: orderId,
      shippingMethod: shippingMethod,
      shippingName: `${shipping.firstName} ${shipping.lastName}`.trim(),
      shippingAddress: shipping.address,
      shippingCity: shipping.municipality,
      shippingState: shipping.state,
      shippingZip: shipping.zipCode,
      shippingCountry: shipping.country,
      shippingPhone: shipping.phone,
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#a18056",
      colorBackground: "#1a1a1a",
      colorText: "#ffffff",
      colorDanger: "#ff4444",
      borderRadius: "12px",
    },
    rules: {
      ".Input": {
        backgroundColor: "#0a0a0a",
        border: "1px solid #333",
      },
      ".Input:focus": {
        border: "1px solid #a18046",
      },
      ".Label": {
        color: "#9ca3af",
      },
    },
  };

  const getStepStyle = (stepNumber) => {
    if (step >= stepNumber) {
      return {
        circle: "bg-primary text-black",
        text: "text-primary font-bold",
      };
    }
    return {
      circle: "border border-stone-600 text-stone-500",
      text: "text-stone-500",
    };
  };

  return (
    <div className="bg-[#121212] p-8 md:p-10 rounded-3xl border border-stone-800 shadow-lg font-roboto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-5 text-xs md:text-sm">
          <div className={`flex items-center gap-2 ${getStepStyle(1).text}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStyle(1).circle}`}
            >
              1
            </div>
            <span>Envío</span>
          </div>

          <div
            className={`w-16 h-0.5 ${step >= 2 ? "bg-primary" : "bg-stone-700"}`}
          ></div>

          <div className={`flex items-center gap-2 ${getStepStyle(2).text}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStyle(2).circle}`}
            >
              2
            </div>
            <span>Pago</span>
          </div>

          <div
            className={`w-16 h-0.5 ${step >= 3 ? "bg-primary" : "bg-stone-700"}`}
          ></div>

          <div className={`flex items-center gap-2 ${getStepStyle(3).text}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStyle(3).circle}`}
            >
              3
            </div>
            <span>Confirmación</span>
          </div>
        </div>
        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleButtonClick();
            }}
          >
            <div>
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-4xl font-rancho text-white">Contacto</h3>
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
                    className="mr-5 accent-primary size-4 cursor-pointer"
                  />
                  <span className="text-stone-400 group-hover:text-white transition-colors">
                    Enviarme novedades y ofertas
                  </span>
                </label>
              </div>
            </div>

            <hr className="border-stone-800 my-4" />

            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-rancho text-white">
                  Dirección de Envío
                </h3>
                {user?.address && (
                  <label className="flex items-center cursor-pointer group w-fit">
                    <input
                      type="checkbox"
                      checked={useProfileAddress}
                      onChange={(e) =>
                        handleUseProfileAddress(e.target.checked)
                      }
                      className="mr-3 accent-primary size-4 cursor-pointer"
                    />
                    <span className="text-stone-400 text-sm group-hover:text-white transition-colors">
                      Usar mi dirección de perfil
                    </span>
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className={labelStyle}>Nombre</label>
                  <input
                    required
                    name="firstName"
                    type="text"
                    placeholder="Kevin"
                    value={shipping.firstName}
                    onChange={handleShippingChange}
                    className={inputStyle}
                  />
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>Apellidos</label>
                  <input
                    required
                    name="lastName"
                    type="text"
                    placeholder="Calvillo"
                    value={shipping.lastName}
                    onChange={handleShippingChange}
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelStyle}>Calle y Número</label>
                  <input
                    required
                    name="address"
                    type="text"
                    placeholder="Av. Revolución 123, Col. Centro"
                    value={shipping.address}
                    onChange={handleShippingChange}
                    className={inputStyle}
                  />
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>País</label>
                  <div className="relative">
                    <select
                      name="country"
                      required
                      value={shipping.country}
                      onChange={handleShippingChange}
                      className={`${inputStyle} appearance-none cursor-pointer`}
                    >
                      <option value="MX">México</option>
                      <option value="US">Estados Unidos</option>
                      <option value="CA">Canadá</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>Código Postal</label>
                  <input
                    required
                    name="zipCode"
                    type="text"
                    placeholder="37000"
                    value={shipping.zipCode}
                    onChange={handleShippingChange}
                    className={inputStyle}
                  />
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>Estado</label>
                  <div className="relative">
                    <select
                      name="state"
                      required
                      value={shipping.state}
                      onChange={handleShippingChange}
                      className={`${inputStyle} appearance-none cursor-pointer`}
                    >
                      <option value="">Selecciona...</option>
                      <option value="Gto">Guanajuato</option>
                      <option value="Jal">Jalisco</option>
                      <option value="NL">Nuevo León</option>
                      <option value="CDMX">Ciudad de México</option>
                      <option value="Ags">Aguascalientes</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>Municipio / Alcaldía</label>
                  <input
                    required
                    name="municipality"
                    type="text"
                    placeholder="León"
                    value={shipping.municipality}
                    onChange={handleShippingChange}
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelStyle}>Teléfono</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="(477) 123 4567"
                    value={shipping.phone}
                    onChange={handleShippingChange}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            <hr className="border-stone-800 my-6" />

            <div className="mt-2">
              <h3 className="text-2xl font-rancho text-white mb-4">
                Método de Envío
              </h3>
              <input
                type="hidden"
                name="shippingMethod"
                value={shippingMethod}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  onClick={() => setShippingMethod("standard")}
                  className={`cursor-pointer px-8 rounded-full border flex items-center justify-between transition-all duration-300 group
                ${
                  shippingMethod === "standard"
                    ? "border-primary bg-primary/10"
                    : "border-stone-700 bg-stone-900 hover:border-stone-500 hover:bg-stone-800"
                }`}
                >
                  <div className="flex items-center gap-4 ">
                    <Truck
                      className={
                        shippingMethod === "standard"
                          ? "text-primary"
                          : "text-stone-500 group-hover:text-stone-300 "
                      }
                    />
                    <div>
                      <p className="font-bold text-white text-sm">
                        Envío Estándar (FedEx)
                      </p>
                      <p className="text-xs text-stone-400">3-5 días hábiles</p>
                    </div>
                  </div>
                  <span className="font-bold text-white text-sm">GRATIS</span>
                </div>

                <div
                  onClick={() => setShippingMethod("express")}
                  className={`cursor-pointer px-8 py-4 rounded-full border flex items-center justify-between transition-all duration-300 group
                ${
                  shippingMethod === "express"
                    ? "border-primary bg-primary/10"
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
                      <p className="font-bold text-white text-sm">
                        Envío Express (DHL)
                      </p>
                      <p className="text-xs text-stone-400">1-2 días hábiles</p>
                    </div>
                  </div>
                  <span className="font-bold text-white text-sm">$250.00</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-primary hover:bg-primary-hover text-bgprimary hover:scale-102 font-bold py-2 cursor-pointer rounded-full text-lg transition-all duration-300 transform"
            >
              Continuar al Pago
            </button>
          </form>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <div>
              <PaymentForm
                total={finalTotal}
                onSuccess={setStep}
                orderId={orderId}
              />
            </div>
          </Elements>
        )}
      </div>
    </div>
  );
}
