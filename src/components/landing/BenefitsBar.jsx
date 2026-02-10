"use client";
import { motion } from "framer-motion";
import { Truck, Award, Clock, Star } from "lucide-react";
import { scaleIn, staggerContainer } from "./animations";

const benefits = [
  { icon: Truck, title: "Envío Gratis", desc: "En compras mayores a $1,500" },
  { icon: Award, title: "Garantía Elite", desc: "2 años en manufactura" },
  { icon: Clock, title: "Entrega Rápida", desc: "3-5 días hábiles" },
  { icon: Star, title: "Calidad 100%", desc: "Satisfacción total" },
];

export default function BenefitsBar() {
  return (
    <section className="py-20 border-y">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container mx-auto px-4 md:px-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-roboto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="flex flex-col items-center text-center gap-4 group"
            >
              <benefit.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white text-xl font-bold tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-stone-500 text-md font-light">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
