import { useState } from "react";
import EyeOpen from "../ui/icons/EyeOpen";
import EyeClosed from "../ui/icons/EyeClosed";
import Google from "../ui/icons/Google";
import Swal from "sweetalert2";
import { calcularNivelPassword } from "@/libs/utils";

export default function RegisterForm({ onClose, setShowRegisterForm }) {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [nivel, setNivel] = useState(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function cleanState() {
    setPassword("");
    setNivel(0);
    setPasswordMatch(true);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (password === data.confirmPassword) {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.nombre,
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
          Swal.fire({
            title: "¡Bienvenido a la Familia!",
            text: "Tu cuenta ha sido creada exitosamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            background: "#1d1d1de8",
            color: "#ffffff",
          });
          onClose();
          cleanState();
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
    } else {
      setPasswordMatch(false);
    }
  }

  function handleOnChange(e) {
    const nuevoPassword = e.target.value;
    setPassword(nuevoPassword);
    setNivel(calcularNivelPassword(nuevoPassword));
  }
  return (
    <>
      <h1 className="text-white text-center text-5xl font-rancho">
        Crea una cuenta
      </h1>
      <p className="text-lg text-stone-500 text-center mb-4">
        Ingresa tus datos para registrarte.
      </p>
      <button className="w-full bg-primary hover:bg-primary-hover font-bold cursor-pointer flex items-center justify-center gap-3 py-2 px-4 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300">
        <Google className="w-7 h-7" />
        Continuar con Google
      </button>
      <div className="flex items-center my-2">
        <hr className="grow border-t border-gray-600" />
        <span className="mx-2 text-gray-400">O</span>
        <hr className="grow border-t border-gray-600" />
      </div>
      <form
        action=""
        onSubmit={handleOnSubmit}
        className="text-md flex flex-col gap-2"
      >
        <label htmlFor="" className="text-white">
          Nombre:
        </label>
        <input
          name="nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          required
          className="w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
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
            name="password"
            required
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            onChange={handleOnChange}
            className={`w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 
            focus:ring-primary transition-all duration-300 border  
            ${!passwordMatch ? "border-red-500" : "border-transparent"}`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-stone-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOpen className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300" />
            ) : (
              <EyeClosed className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300" />
            )}
          </button>
        </div>

        <label htmlFor="" className="text-white">
          Confirmar contraseña:
        </label>
        <div className="relative w-full">
          <input
            required
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirma tu contraseña"
            className={`w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 
            focus:ring-primary transition-all duration-300 border  
            ${!passwordMatch ? "border-red-500" : "border-transparent"}`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-stone-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOpen className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
            ) : (
              <EyeClosed className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
            )}
          </button>
        </div>

        <div className="w-full h-2 bg-gray-700 mt-2 rounded-full overflow-hidden ">
          <div
            className={`h-full transition-all duration-500 ${
              nivel === 1
                ? "w-1/3 bg-red-500"
                : nivel === 2
                  ? "w-2/3 bg-yellow-500"
                  : nivel === 3
                    ? "w-full bg-green-500"
                    : "w-0"
            }`}
          ></div>
        </div>
        <p className="text-white text-center ">Fortaleza de la Contraseña</p>
        {!passwordMatch ? (
          <p className="text-red-500 text-center">
            Las contraseñas no coinciden.
          </p>
        ) : (
          <p className="text-stone-500 text-sm text-center leading-5 mb-2">
            Usa simbolos especiales, numeros  ,mayusculas y
            minusculas.
          </p>
        )}

        <button
          type="submit"
          disabled={nivel < 3}
          className="text-xl disabled:bg-stone-600 bg-primary hover:bg-primary-hover disabled:scale-100 hover:scale-102 duration-300 font-bold py-2 rounded-full transition-all cursor-pointer"
        >
          Registrarse
        </button>
        <label
          htmlFor=""
          className="text-white text-center mt-2 flex justify-center gap-2"
        >
          Si ya tienes cuenta <br />
          <button
            onClick={() => setShowRegisterForm(false)}
            className="text-primary hover:text-primary-hover cursor-pointer transition-colors"
          >
            Inicia sesión aquí
          </button>
        </label>
      </form>
    </>
  );
}
