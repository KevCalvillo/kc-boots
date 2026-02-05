"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Exit from "@/ui/icons/Exit";
import LogIn from "@/ui/icons/LogIn";
import User from "@/ui/icons/User";
import Cart1 from "@/ui/icons/Carrito";
import { Search, X } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleCartClick() {
    
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
    { name: "Catálogo", path: "/boots" },  
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out px-4 md:px-10 py-4
      ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-2 border-b border-white/10"
          : "bg-transparent mt-4" 
      }`}
    >
      <div className="max-w-350 mx-auto flex items-center justify-between">
        <nav className="flex-1">
          <ul className="flex items-center gap-8 text-2xl font-rancho tracking-widest text-white">
            {navLinks.map((link) => (
              <li key={link.path} className="group relative">
                <Link
                  href={link.path}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
                
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 mx-4">
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

        <div className="flex-1 flex items-center justify-end gap-6 text-white">
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

          {user ? (
            <>
              <button
                title="Mi Perfil"
                className="hover:text-primary transition-colors hover:scale-110 duration-300"
              >
                <Link href="/profile">
                  <User className="w-7 h-7 fill-current" />
                </Link>
              </button>

              <button
                onClick={handleCartClick}
                className="relative hover:text-primary transition-colors hover:scale-110 duration-300"
              >
                <Cart1 className="w-7 h-7 stroke-current" />
              
                {cart.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-800 text-white text-[15px] font-bold w-6 h-6 flex items-center justify-center rounded-full border border-black font-roboto">
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
