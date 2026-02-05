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
    "w-full bg-stone-900 border border-stone-800 text-white py-3 px-5 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-600";

  return (
    <div className="font-roboto">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-rancho mb-2">Bienvenido</h1>
        <p className="text-stone-400">
          Ingresa tus credenciales para continuar.
        </p>
      </div>

      <button className="w-full bg-primary text-black hover:bg-primary-hover flex items-center justify-center gap-3 font-bold py-3 px-4 rounded-full mb-6 transition-all duration-300 shadow-lg">
        <Google className="w-6 h-6" />
        Continuar con Google
      </button>

      <div className="flex items-center mb-6">
        <hr className="grow border-t border-stone-800" />
        <span className="mx-4 text-stone-600 text-sm">O</span>
        <hr className="grow border-t border-stone-800" />
      </div>

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-sm text-stone-500 mb-1 block ml-1 tracking-wider">
            Email
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            className={inputStyle}
          />
        </div>

        <div>
          <label className="text-sm text-stone-500 mb-1 block ml-1 tracking-wider">
            Contraseña
          </label>
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
              className="absolute top-1/2 right-5 transform -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOpen className="w-6 h-6 fill-white hover:fill-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              ) : (
                <EyeClosed className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 text-xl bg-primary hover:bg-primary-hover font-bold py-3 rounded-full transition-all shadow-lg hover:scale-102"
        >
          Iniciar Sesión
        </button>

        <div className="text-center mt-4">
          <p className="text-stone-500 text-sm">
            ¿Aún no tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setShowRegisterForm(true)}
              className="text-primary hover:text-white font-bold transition-colors"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
