"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Catálogo", href: "/admin/products", icon: Package },
  { label: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
  { label: "Comunidad", href: "/admin/users", icon: Users },
  // { label: "Configuración", href: "/admin/settings", icon: Settings }, // Opcional para el futuro
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-roboto selection:bg-primary selection:text-black">
      {/* SIDEBAR */}
      {/* Aumentamos un poco el ancho a w-72 para darle más respiro a los items */}
      <aside className="w-72 bg-[#050505] border-r border-stone-800 flex flex-col hidden md:flex sticky top-0 h-screen">
        {/* BRANDING (Título) */}
        <div className="p-10 border-b border-stone-800 flex items-center justify-center flex-col gap-4">
          <Image src="/logo.webp" alt="Logo" width={150} height={150} />
          <h1 className="text-4xl font-rancho text-white flex items-center gap-2">
           Admin Panel
          </h1>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="flex flex-col gap-2 flex-1 px-4 py-8 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Verificamos si la ruta actual coincide (o si estamos dentro de una subruta de admin)
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive ? "text-white font-bold" : "text-stone-500 hover:text-white"}`}
              >
                {/* Animación fluida de fondo activo con Framer Motion */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <Icon
                  size={20}
                  className={`relative z-10 transition-colors duration-300 
                    ${isActive ? "text-primary" : "group-hover:text-stone-300"}`}
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-6 border-t border-stone-800">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 text-stone-500 hover:text-red-500 hover:bg-red-500/10 w-full px-5 py-3.5 rounded-2xl transition-all duration-300 group cursor-pointer"
          >
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="font-bold">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Aquí podrías agregar un pequeño Header para móviles si lo necesitas después */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 lg:p-12">
          {/* Un contenedor máximo para que en pantallas gigantes no se estire de más */}
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
