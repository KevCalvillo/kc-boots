"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Usamos Image de Next
import { useAuth } from "@/context/AuthContext";
import Exit from "@/ui/icons/Exit";
import LogIn from "@/ui/icons/LogIn";
import User from "@/ui/icons/User";
import Cart1 from "@/ui/icons/Carrito";
import { Search, X } from "lucide-react"; // Iconos para la búsqueda
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({
  setModalOpen,
  setShowRegisterForm,
  setCartModalOpen,
}) {
  const { user, setUser, cart } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleCartClick() {
    // Permitir abrir el carrito incluso si está vacío para que vean que no hay nada
    // O mantener tu lógica actual si prefieres el aviso
    if (cart.length === 0) {
      Swal.fire({
        title: "Tu carrito está vacío",
        text: "¿Por qué no agregas unas botas?",
        icon: "warning",
        timer: 2000,
        background: "#1d1d1de8",
        color: "#fff",
        showConfirmButton: false,
       
      });
    } else {
      setCartModalOpen(true);
    }
  }

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/boots" }, // Corregido acento
    { name: "Historia", path: "/about" }, // "Historia" suena más premium que "Información"
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out px-4 md:px-10 py-4
      ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-2 border-b border-white/10"
          : "bg-transparent mt-4" // Margen superior solo cuando está arriba
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* IZQUIERDA: Navegación */}
        <nav className="flex-1">
          <ul className="flex items-center gap-8 text-xl font-rancho tracking-wide text-white">
            {navLinks.map((link) => (
              <li key={link.path} className="group relative">
                <Link
                  href={link.path}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
                {/* Línea animada debajo del link */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>

        {/* CENTRO: Logo */}
        <div className="flex-shrink-0 mx-4">
          <Link href="/">
            <div
              className={`relative transition-all duration-500 ${isScrolled ? "w-16" : "w-24"}`}
            >
              <Image
                src="/logo.webp"
                alt="KC Boots Logo"
                width={100}
                height={100}
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </Link>
        </div>

        {/* DERECHA: Acciones e Iconos */}
        <div className="flex-1 flex items-center justify-end gap-6 text-white">
          {/* Barra de Búsqueda Animada */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Buscar modelo..."
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-primary font-roboto mr-2"
                  autoFocus
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-primary transition-colors"
            >
              {isSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>
          </div>

          {/* Iconos de Usuario y Carrito */}
          {user ? (
            <>
              <button
                title="Mi Perfil"
                className="hover:text-primary transition-colors hover:scale-110 duration-300"
              >
                <User className="w-7 h-7 fill-current" />
              </button>

              <button
                onClick={handleCartClick}
                className="relative hover:text-primary transition-colors hover:scale-110 duration-300"
              >
                <Cart1 className="w-7 h-7 fill-current" />
                {/* BADGE DE CARRITO */}
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black font-roboto">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setUser(null)}
                title="Cerrar Sesión"
                className="hover:text-red-500 transition-colors hover:scale-110 duration-300 ml-2"
              >
                <Exit className="w-7 h-7 fill-current" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setModalOpen(true);
                setShowRegisterForm(false);
              }}
              className="flex items-center gap-2 font-roboto font-bold text-sm bg-white/10 hover:bg-primary border border-white/20 px-4 py-2 rounded-full transition-all"
            >
              <LogIn className="w-5 h-5 fill-current" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
