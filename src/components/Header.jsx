"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Exit from "@/ui/icons/Exit";
import LogIn from "@/ui/icons/LogIn";
import User from "@/ui/icons/User";
import Cart1 from "@/ui/icons/Carrito";
import { Search, X, Menu, ShoppingBag, House } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    { name: "Inicio", path: "/", icon: <House size={24} /> },
    { name: "Catálogo", path: "/boots", icon: <ShoppingBag size={24} /> },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out px-4 md:px-10 py-5
        ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md py-2 border-b border-white/10"
            : "bg-transparent mt-2 md:mt-4"
        }`}
      >
        <div className="max-w-420 mx-auto flex items-center justify-between">
          {/* Botón hamburguesa - Solo móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-primary transition-colors p-2"
          >
            <Menu size={28} />
          </button>

          {/* Navegación Desktop */}
          <nav className="flex-1 hidden md:block">
            <ul className="flex items-center gap-8 text-2xl font-rancho tracking-widest text-white">
              {navLinks.map((link) => (
                <li
                  key={link.path}
                  className="group relative flex items-center"
                >
                  <Link
                    href={link.path}
                    className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    {link.icon} {link.name}
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo - Centrado */}
          <div className="shrink-0">
            <Link href="/">
              <div
                className={`relative transition-all duration-500 ${isScrolled ? "w-12 md:w-16" : "w-16 md:w-24"}`}
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

          {/* Acciones del lado derecho */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-6 text-white">
            {/* Búsqueda - Oculta en móvil pequeño */}
            <div className="relative hidden sm:flex items-center">
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
                className="hover:text-primary transition-all cursor-pointer hover:scale-110 duration-300"
              >
                {isSearchOpen ? <X size={24} /> : <Search size={24} />}
              </button>
            </div>

            {user ? (
              <>
                <button
                  title="Mi Perfil"
                  className=" transition-transform hover:scale-110 duration-300 cursor-pointer"
                >
                  <Link href="/profile">
                    <User className="w-6 h-6 md:w-7 md:h-7 hover:fill-primary transition-colors duration-300" />
                  </Link>
                </button>

                <button
                  onClick={handleCartClick}
                  className="relative transition-transform  hover:scale-110 duration-300 cursor-pointer"
                >
                  <Cart1 className="w-6 h-6 md:w-7 md:h-7 hover:stroke-primary transition-colors duration-300" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-red-800 text-white text-xs md:text-[15px] font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border border-black font-roboto">
                      {cart.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setUser(null)}
                  title="Cerrar Sesión"
                  className="hover:text-red-500 transition-all hover:scale-110 duration-300 ml-1 md:ml-2 cursor-pointer"
                >
                  <Exit className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setModalOpen(true);
                  setShowRegisterForm(false);
                }}
                className="flex items-center gap-3 font-roboto font-bold text-xs md:text-sm bg-white/10 hover:bg-primary/80 hover:text-bgprimary border border-white/20 px-3 md:px-4 py-2 rounded-full transition-all hover:scale-105 duration-300 cursor-pointer"
              >
                <LogIn className="size-4 md:w-5 md:h-5 fill-current" />
                <span className="hidden sm:inline">Ingresar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Menú móvil overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-[#0a0a0a] border-r border-stone-800 z-70 md:hidden"
            >
              <div className="p-6">
                {/* Header del menú */}
                <div className="flex items-center justify-between mb-10">
                  <Image
                    src="/logo.webp"
                    alt="KC Boots Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-stone-800 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Links de navegación */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-4 px-4 text-2xl font-rancho text-white hover:text-primary hover:bg-stone-900 rounded-xl transition-all"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Búsqueda móvil */}
                <div className="mt-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                    <input
                      type="text"
                      placeholder="Buscar modelo..."
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-stone-500 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Acciones si está logueado */}
                {user && (
                  <div className="mt-8 pt-8 border-t border-stone-800 space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 text-white hover:text-primary hover:bg-stone-900 rounded-xl transition-all"
                    >
                      <User className="w-5 h-5" />
                      <span>Mi Perfil</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleCartClick();
                      }}
                      className="flex items-center gap-3 py-3 px-4 text-white hover:text-primary hover:bg-stone-900 rounded-xl transition-all w-full"
                    >
                      <Cart1 className="w-5 h-5" />
                      <span>Carrito</span>
                      {cart.length > 0 && (
                        <span className="ml-auto bg-red-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {cart.length}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
