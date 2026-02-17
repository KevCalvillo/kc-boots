"use client";
import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/orders"),
          fetch("/api/admin/users"),
        ]);
        const products = await productsRes.json();
        const orders = await ordersRes.json();
        const users = await usersRes.json();

        const revenue = orders.reduce(
          (sum, o) => sum + parseFloat(o.total || 0),
          0,
        );

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      label: "Catálogo Activo",
      value: stats.products,
      icon: Package,
      desc: "Modelos disponibles",
    },
    {
      label: "Órdenes Totales",
      value: stats.orders,
      icon: ShoppingCart,
      desc: "Pedidos realizados",
    },
    {
      label: "Familia KC",
      value: stats.users,
      icon: Users,
      desc: "Usuarios registrados",
    },
    {
      label: "Ingresos Brutos",
      value: new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(stats.revenue),
      icon: DollarSign,
      desc: "Ventas totales",
    },
  ];

  // Variantes para la animación de las tarjetas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-roboto p-8 md:p-12">
      {/* HEADER DEL DASHBOARD */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-rancho text-white mb-2 tracking-wide">
            Panel de Control
          </h1>
          <p className="text-stone-400 text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Resumen general de KC Boots
          </p>
        </div>
        <div className="text-stone-500 text-sm font-medium">
          Actualizado:{" "}
          {new Date().toLocaleDateString("es-MX", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* GRID DE ESTADÍSTICAS */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[#121212] rounded-3xl p-8 border border-stone-800 h-40 animate-pulse flex flex-col justify-between"
            >
              <div className="flex justify-between">
                <div className="w-24 h-4 bg-stone-800 rounded"></div>
                <div className="w-12 h-12 bg-stone-800 rounded-xl"></div>
              </div>
              <div className="w-32 h-8 bg-stone-800 rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={itemVariants}
                className="bg-[#121212] rounded-[2rem] p-8 border border-stone-800 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500 shadow-xl"
              >
                {/* Efecto de luz de fondo (Glow) al hacer hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/0 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-700 group-hover:bg-primary/20 pointer-events-none"></div>

                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div>
                    <span className="text-stone-400 text-sm font-bold uppercase tracking-widest block mb-1">
                      {card.label}
                    </span>
                    <span className="text-stone-600 text-xs">{card.desc}</span>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-stone-800 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-4xl md:text-5xl font-bold text-white font-mono tracking-tight">
                    {card.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
