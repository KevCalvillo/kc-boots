"use client";
import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderConfirmation({ orderId, total }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center py-10 mt-10 font-roboto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#121212] p-5 md:p-8 rounded-[3rem] border border-stone-800 text-center max-w-2xl w-full h-fit shadow-2xl relative z-10 backdrop-blur-sm"
      >
        <motion.div
          variants={iconVariants}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-primary/10 p-6 ring-4 ring-primary/20">
            <CheckCircle className="w-15 h-15 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-rancho text-5xl md:text-7xl text-white mb-6"
        >
          ¡Gracias por tu compra!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-stone-400 text-lg mb-12 leading-relaxed"
        >
          Tu pedido ha sido confirmado y ya se está preparando en nuestro
          taller. Pronto recibirás un correo con los detalles de seguimiento.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-stone-900/50 border border-stone-800 rounded-3xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">
                Número de Orden
              </p>
              <p className="text-white text-lg font-mono font-bold tracking-wider">
                #{orderId}
              </p>
            </div>

            <div className="w-20 h-px bg-stone-800 md:hidden"></div>
            <div className="h-20 w-px bg-stone-800 hidden md:block"></div>

            <div className="text-center md:text-right">
              <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">
                Total Pagado
              </p>
              <p className="text-primary text-2xl font-bold">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(total)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/boots" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover hover:scale-102 cursor-pointer font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform">
              <ShoppingBag className="w-5 h-5" />
              Seguir Comprando
            </button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-transparent border-2 hover:scale-102 cursor-pointer border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300">
              Volver al Inicio
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
