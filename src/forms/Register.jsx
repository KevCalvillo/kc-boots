"use client";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function cleanState() {
    setPassword("");
    setNivel(0);
    setPasswordMatch(true);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

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
        .then(() => {
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
    if (!passwordMatch) setPasswordMatch(true);
  }

  const inputStyle =
    "w-full bg-stone-900 border border-stone-800 text-white py-3 px-5 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-600";
  const labelStyle = "text-sm text-stone-500 ml-1 block mb-1";

  return (
    <div className="font-roboto mt-4">
      <div className="text-center mb-6">
        <h1 className="text-white text-5xl font-rancho mb-2">
          Crea una cuenta
        </h1>
        <p className="text-stone-400 text-sm">
          Ingresa tus datos para unirte al gremio.
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

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelStyle}>Nombre</label>
          <input
            name="nombre"
            type="text"
            placeholder="Kevin Calvillo"
            required
            className={inputStyle}
          />
        </div>

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
              name="password"
              required
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleOnChange}
              className={`${inputStyle} ${!passwordMatch ? "border-red-900 ring-1 ring-red-900" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOpen className="w-6 h-6 fill-white hover:fill-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              ) : (
                <EyeClosed className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className={labelStyle}>Confirmar contraseña</label>
          <div className="relative w-full">
            <input
              required
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${inputStyle} ${!passwordMatch ? "border-red-900 ring-1 ring-red-900" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOpen className="w-6 h-6 fill-white hover:fill-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              ) : (
                <EyeClosed className="w-6 h-6 fill-white hover:stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-stone-500">Seguridad de la contraseña</p>
            {!passwordMatch && (
              <p className="text-xs text-red-500 font-bold">
                Las contraseñas no coinciden
              </p>
            )}
          </div>

          <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${
                nivel === 1
                  ? "w-1/3 bg-red-500"
                  : nivel === 2
                    ? "w-2/3 bg-yellow-500"
                    : nivel >= 3
                      ? "w-full bg-green-500"
                      : "w-0"
              }`}
            ></div>
          </div>

          {nivel < 3 && (
            <p className="text-stone-600 text-[10px] mt-1 leading-tight">
              Usa símbolos, números y mayúsculas para mejorar la seguridad.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={nivel < 3}
          className="mt-2 text-lg bg-primary hover:bg-primary-hover hover:scale-102 disabled:opacity-50 disabled:scale-100 disabled:hover:bg-primary font-bold py-3 rounded-full transition-all shadow-lg duration-300"
        >
          Crear Cuenta
        </button>

        <div className="text-center mt-2">
          <p className="text-stone-500 text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setShowRegisterForm(false)}
              className="text-primary hover:text-white font-bold transition-colors"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
