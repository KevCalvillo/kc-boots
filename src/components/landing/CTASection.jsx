"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp } from "./animations";

export default function CTASection({ onRegisterClick }) {
  return (
    <section className="py-20 md:py-40 bg-black relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="container mx-auto text-center px-4 md:px-10 relative z-10 font-roboto"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-rancho text-white mb-6 md:mb-10 leading-tight relative">
          ¿Listo Para Tu <br /> Próximo Par?
        </h2>
        <p className="text-stone-400 text-base md:text-2xl mb-8 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed">
          Únete a la familia KC Boots y experimenta la diferencia de caminar con
          calzado premium fabricado para durar.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <button className="text-lg md:text-xl bg-primary font-bold py-2 md:py-3 px-8 md:px-12 rounded-full hover:scale-102 hover:bg-primary-hover cursor-pointer duration-300 transition-all w-full md:w-auto">
            <Link href="/boots">Ver Catálogo Completo</Link>
          </button>
          <button
            onClick={onRegisterClick}
            className="text-lg md:text-xl bg-stone-700/40 border-2 cursor-pointer border-stone-700 hover:border-primary hover:scale-102  text-white font-bold py-2 md:py-3 px-8 md:px-12 rounded-full transition-all w-full md:w-auto"
          >
            Crear Cuenta Gratis
          </button>
        </div>
      </motion.div>
    </section>
  );
}
