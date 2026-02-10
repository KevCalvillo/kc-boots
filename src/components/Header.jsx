"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Exit from "@/ui/icons/Exit";
import LogIn from "@/ui/icons/LogIn";
import User from "@/ui/icons/User";
import Cart1 from "@/ui/icons/Carrito";
import { ShoppingBag, House, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";
import { AnimatePresence } from "framer-motion";
import SearchBar from "./header/SearchBar";
import MobileMenu from "./header/MobileMenu";

const navLinks = [
  { name: "Inicio", path: "/", icon: <House size={24} /> },
  { name: "Catálogo", path: "/boots", icon: <ShoppingBag size={24} /> },
];

export default function Header({
  setModalOpen,
  setShowRegisterForm,
  setCartModalOpen,
}) {
  const { user, cart } = useAuth();
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
          <div className="flex-1 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-primary transition-colors p-2"
            >
              <Menu size={28} />
            </button>
          </div>

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
            <SearchBar
              isOpen={isSearchOpen}
              onToggle={() => setIsSearchOpen(!isSearchOpen)}
            />

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
                  onClick={() => signOut()}
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

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navLinks={navLinks}
            user={user}
            cart={cart}
            onCartClick={handleCartClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}
