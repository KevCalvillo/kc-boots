"use client";
import { useState } from "react";
import Swal from "sweetalert2";
export default function RegisterForm({ setModalOpen }) {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [nivel, setNivel] = useState(0);
  const [password, setPassword] = useState("");

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
            confirmButtonColor: "#166534", // Un verde similar a tu tema
          });
          setModalOpen(false);
          cleanState();
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error.message, // Aquí saldrá "El correo ya está registrado"
            icon: "error",
            confirmButtonColor: "#d33",
          });
        });
    } else {
      setPasswordMatch(false);
    }
  }

  function handleOnChange(e) {
    const nuevoPassword = e.target.value;
    setPassword(nuevoPassword);

    let puntos = 0;
    setPasswordMatch(true);
    if (nuevoPassword.length >= 8) puntos++;
    if (/\d/.test(nuevoPassword)) puntos++;
    if (/[@$!%*?&]/.test(nuevoPassword)) puntos++;

    setNivel(puntos);
  }

  return (
    <form action="" onSubmit={handleOnSubmit} className="text-2xl w-100">
      <input
        name="nombre"
        type="text"
        placeholder="Nombre"
        className="w-full bg-[#3a3a3a] text-white p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full bg-[#3a3a3a] text-white p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300"
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleOnChange}
        className={`w-full bg-[#3a3a3a] text-white p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300 border-1  ${!passwordMatch ? "border-red-500" : "border-transparent"}`}
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirmar Contraseña"
        className={`w-full bg-[#3a3a3a] text-white p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-300 border-1 ${!passwordMatch ? "border-red-500" : "border-transparent"}`}
      />
      {!passwordMatch && (
        <p className="text-red-500 mb-4 text-center">
          Las contraseñas no coinciden. <br /> Por favor, verificalas.
        </p>
      )}

      <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden mb-4">
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
      <p className="text-white text-center mb-4">Fortaleza de la Contraseña</p>
      <p className="text-stone-500 text-md text-center mb-4">
        Recuerda usar simbolos especiales, mayusculas y minusculas, ademas de
        ser mayor a 8 caracteres
      </p>
      <button
        type="submit"
        disabled={nivel < 3}
        className=" w-full disabled:bg-stone-600 bg-green-800 hover:bg-green-900 hover:scale-102 duration-300 text-white font-bold py-2 px-4 rounded transition-all"
      >
        Registrarse
      </button>
    </form>
  );
}
