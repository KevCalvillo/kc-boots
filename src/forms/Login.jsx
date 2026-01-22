"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import EyeOpen from "../ui/icons/EyeOpen";
import EyeClosed from "../ui/icons/EyeClosed";
import Google from "../ui/icons/Google";

export default function LoginForm({ setModalOpen, setShowRegisterForm }) {
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
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        Swal.fire({
          title: "¡Bienvenido!",
          text: "Nos alegra verte de nuevo",
          icon: "success",
          confirmButtonColor: "#166534",
          background: "#1d1d1de8",
          color: "#ffffff",
        });

        setModalOpen(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#d33",
          background: "#1d1d1de8",
          color: "#ffffff",
        });
      });
  }

  return (
    <>
      <h1 className="text-white text-center block mb-4 text-4xl">
        Iniciar Sesion
        <p className="text-sm text-stone-500 mt-1">
          Ingresa tus datos para iniciar sesion.
        </p>
      </h1>
      <button className="w-full bg-[#3a3a3a] flex items-center justify-center gap-3 text-white py-2 px-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300">
        <Google />
        Continuar con Google
      </button>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-600" />
        <span className="mx-2 text-gray-400">O</span>
        <hr className="flex-grow border-t border-gray-600" />
      </div>
      <form
        action=""
        onSubmit={handleOnSubmit}
        className="text-md flex flex-col gap-2"
      >
        <label htmlFor="" className="text-white">
          Email:
        </label>
        <input
          name="email"
          type="email"
          placeholder="Ingresa tu email"
          className="w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300"
        />

        <label htmlFor="" className="text-white">
          Contraseña:
        </label>
        <div className="relative w-full">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            className="w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300 "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-stone-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOpen className="w-6 h-6 fill-white hover:fill-green-500 hover:scale-110 transition-all duration-300" />
            ) : (
              <EyeClosed className="w-6 h-6 fill-white hover:stroke-green-500 hover:scale-110 transition-all duration-300" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-900 hover:scale-102 duration-300 text-white font-bold py-2 px-4 mt-4 rounded transition-all "
        >
          Iniciar Sesion
        </button>
        <label htmlFor="" className="text-white text-center block mt-2">
          Si aun no tienes una cuenta <br />{" "}
          <button
            onClick={() => setShowRegisterForm(true)}
            className="text-green-500 hover:text-green-700 cursor-pointer"
          >
            Registrate aquí
          </button>
        </label>
      </form>
    </>
  );
}
