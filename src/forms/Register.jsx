import { useState } from "react";
import EyeOpen from "../ui/icons/EyeOpen";
import EyeClosed from "../ui/icons/EyeClosed";
import Google from "../ui/icons/Google";
import Swal from "sweetalert2";
import { calcularNivelPassword } from "@/lib/utils";

export default function RegisterForm({ setModalOpen, setShowRegisterForm }) {
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
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.message);
            });
          }
          return res.json();
        })
        .then((data) => {
          Swal.fire({
            title: "¡Bienvenido!",
            text: "Tu cuenta ha sido creada exitosamente.",
            icon: "success",
            confirmButtonColor: "#166534",
            background: "#1d1d1de8",
            color: "#ffffff",
          });
          setModalOpen(false);
          cleanState();
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
      <h1 className="text-white text-center block mb-4 text-4xl">
        Crea una cuenta
        <p className="text-sm text-stone-500 mt-1">
          Ingresa tus datos para registrarte.
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
        className="text-md flex flex-col gap-1"
      >
        <label htmlFor="" className="text-white">
          Nombre:
        </label>
        <input
          name="nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          className="w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300"
        />
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
            onChange={handleOnChange}
            className={`w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 
            focus:ring-green-800 transition-all duration-300 border-1  
            ${!passwordMatch ? "border-red-500" : "border-transparent"}`}
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

        <label htmlFor="" className="text-white">
          Confirmar contraseña:
        </label>
        <div className="relative w-full">
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirma tu contraseña"
            className={`w-full bg-[#3a3a3a] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 
            focus:ring-green-800 transition-all duration-300 border-1  
            ${!passwordMatch ? "border-red-500" : "border-transparent"}`}
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
        {!passwordMatch && (
          <p className="text-red-500 text-center">
            Las contraseñas no coinciden.
          </p>
        )}

        <div className="w-full h-2 bg-gray-700 rounded-full my-4 overflow-hidden ">
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
        <p className="text-stone-500 text-md text-center leading-tight mb-2">
          Recuerda usar simbolos especiales, numeros , mayusculas y minusculas.
        </p>
        <button
          type="submit"
          disabled={nivel < 3}
          className=" w-full disabled:bg-stone-600 bg-green-800 hover:bg-green-900 hover:scale-102 duration-300 text-white font-bold py-2 px-4 rounded transition-all "
        >
          Registrarse
        </button>
        <label htmlFor="" className="text-white text-center block mt-2">
          Si ya tienes cuenta <br />
          <button
            onClick={() => setShowRegisterForm(false)}
            className="text-green-500 hover:text-green-700 cursor-pointer"
          >
            Inicia sesión aquí
          </button>
        </label>
      </form>
    </>
  );
}
