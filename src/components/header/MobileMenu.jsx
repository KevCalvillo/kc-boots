"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import User from "@/ui/icons/User";
import Cart1 from "@/ui/icons/Carrito";
import { motion } from "framer-motion";

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  user,
  cart,
  onCartClick,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
              onClick={onClose}
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
                  onClick={onClose}
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
                onClick={onClose}
                className="flex items-center gap-3 py-3 px-4 text-white hover:text-primary hover:bg-stone-900 rounded-xl transition-all"
              >
                <User className="w-5 h-5" />
                <span>Mi Perfil</span>
              </Link>
              <button
                onClick={() => {
                  onClose();
                  onCartClick();
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
  );
}
