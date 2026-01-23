/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Exit from "@/ui/icons/Exit";
import LogIn from "@/ui/icons/LogIn";
import { saludarPorHora } from "@/libs/utils";
import User from "@/ui/icons/User";

export default function Header({ setModalOpen, setShowRegisterForm }) {
  const { user, setUser } = useAuth();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Categorías", path: "/categories" },
    { name: "Información", path: "/about" },
  ];
  return (
    <div className="absolute z-40 flex w-full items-center transition-all duration-500 text-white px-15 shadow-4xl mt-15 rounded-[40px]">
      <img src="/logo.webp" className="h-15" />
      <ul className="mr-auto flex space-x-6 text-[30px] drop-shadow-3xl ml-5">
        {navLinks.map((link) => (
          <li
            key={link.path}
            className="transition-transform duration-300 hover:scale-110"
          >
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {user && (
        <span className="mx-auto text-4xl">{saludarPorHora(user.name)}</span>
      )}

      <div className="ml-auto flex items-center gap-5">
        {user ? (
          <>
            <button onClick={() => setUser(null)}>
              <Exit className="w-8 h-8 cursor-pointer hover:scale-115 hover:fill-green-600 transition-all duration-300" />
            </button>
            <button>
              <User className="w-8 h-8 cursor-pointer hover:scale-115 hover:fill-green-600 transition-all duration-300" />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setModalOpen(true);
              setShowRegisterForm(false);
            }}
          >
            <LogIn
              className="w-8 h-8 cursor-pointer hover:scale-115 hover:fill-green-600 transition-all duration-300"
              alt="Iniciar Sesion"
            />
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="ml-10 p-2 px-5 rounded-4xl text-xl text-white bg-[#2c2c2c85] border-none outline-none w-60 hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
