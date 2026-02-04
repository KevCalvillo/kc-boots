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

  return (
    <>
      <h1 className="text-white text-center text-5xl font-rancho">
        Iniciar Sesion
      </h1>
      <p className="text-lg text-stone-500 mb-4 mt-2 text-center">
        Ingresa tus credenciales.
      </p>
      <button className="w-full bg-primary hover:bg-primary-hover flex items-center justify-center gap-3 font-bold py-2 px-4 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300">
        <Google className='w-7 h-7'/>
        Continuar con Google
      </button>
      <div className="flex items-center my-6">
        <hr className="grow border-t border-gray-600" />
        <span className="mx-2 text-gray-400">O</span>
        <hr className="grow border-t border-gray-600" />
      </div>
      <form
        action=""
        onSubmit={handleOnSubmit}
        className="text-md flex flex-col gap-4"
      >
        <label htmlFor="" className="text-white">
          Email:
        </label>
        <input
          required
          name="email"
          type="email"
          placeholder="Ingresa tu email"
          className="w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />

        <label htmlFor="" className="text-white">
          Contraseña:
        </label>
        <div className="relative w-full">
          <input
            required
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            className="w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-stone-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOpen className="w-6 h-6 fill-white hover:fill-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
            ) : (
              <EyeClosed className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="text-xl bg-primary hover:bg-primary-hover hover:scale-102 duration-300 font-bold py-2 rounded-full transition-all cursor-pointer mt-4 "
        >
          Iniciar Sesion
        </button>
        <label htmlFor="" className="text-white text-center block mt-3">
          Si aun no tienes una cuenta <br />{" "}
          <button
            onClick={() => setShowRegisterForm(true)}
            className="text-primary hover:text-primary-hover cursor-pointer transition-colors"
          >
            Registrate aquí
          </button>
        </label>
      </form>
    </>
  );
}
