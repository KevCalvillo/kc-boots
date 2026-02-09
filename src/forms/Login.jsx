"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import EyeOpen from "../ui/icons/EyeOpen";
import EyeClosed from "../ui/icons/EyeClosed";
import Google from "../ui/icons/Google";

export default function LoginForm({ onClose, setShowRegisterForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();

  function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        Swal.fire({
          title: "¡Bienvenido!",
          text: "Nos alegra verte de nuevo",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          background: "#1d1d1de8",
          color: "#ffffff",
        });

        onClose();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          background: "#1d1d1de8",
          color: "#ffffff",
        });
      });
  }
  const inputStyle =
    "text-xs md:text-base w-full bg-stone-900 border border-stone-800 text-white py-2 md:py-3 px-3 md:px-5 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-600";
  const labelStyle = "text-[10px] md:text-xs text-stone-500 ml-1 block mb-1";

  return (
    <div className="font-roboto md:mt-4">
      <div className="text-center mb-4 md:mb-6">
        <h1 className="text-white text-3xl md:text-5xl font-rancho mb-2">
          Bienvenido
        </h1>
        <p className="text-stone-400 text-xs md:text-sm">
          Ingresa tus credenciales para continuar.
        </p>
      </div>

      <button className="w-full text-sm md:text-base cursor-pointer bg-primary text-black hover:bg-primary-hover flex items-center justify-center gap-3 font-bold py-2 md:py-3 rounded-full transition-all duration-300 shadow-lg">
        <Google className="md:size-6 size-4" />
        Continuar con Google
      </button>

      <div className="flex items-center my-4">
        <hr className="grow border-t border-stone-800" />
        <span className="mx-4 text-stone-600 text-sm">O</span>
        <hr className="grow border-t border-stone-800" />
      </div>

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 md:gap-4">
        <div>
          <label className={labelStyle}>Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Contraseña</label>
          <div className="relative w-full">
            <input
              required
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOpen className="size-4 md:size-6 fill-white hover:fill-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              ) : (
                <EyeClosed className="size-4 md:size-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 cursor-pointer text-sm md:text-base bg-primary hover:bg-primary-hover hover:scale-102 font-bold py-2 md:py-3 rounded-full transition-all shadow-lg duration-300"
        >
          Iniciar Sesión
        </button>

        <div className="text-center mt-2">
          <p className="text-stone-500 text-sm">
            ¿Aún no tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setShowRegisterForm(true)}
              className="text-primary hover:text-white font-bold transition-colors cursor-pointer"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
