"use client";
import { motion } from "framer-motion";
import { Clock, Users, MapPin, Star } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animations";

const stats = [
  { num: "25+", label: "Años de Herencia", icon: Clock },
  { num: "50K+", label: "Clientes Reales", icon: Users },
  { num: "100%", label: "Orgullo Mexicano", icon: MapPin },
  { num: "4.9★", label: "Reputación", icon: Star },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-38 bg-linear-to-b from-black via-stone-900 to-black">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container mx-auto px-4 md:px-10"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-8xl text-white text-center mb-10 md:mb-20 font-rancho"
        >
          Nuestra Historia en Números
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-12 bg-black/70 rounded-2xl md:rounded-3xl border border-white/5"
            >
              <stat.icon className="w-10 h-10 text-primary mx-auto mb-6 " />
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2">
                {stat.num}
              </h3>
              <p className="text-stone-500 text-xs md:text-lg uppercase tracking-wider md:tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
