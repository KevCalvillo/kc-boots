"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Layers, Zap } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "./animations";

const features = [
  {
    icon: ShieldCheck,
    title: "Piel de Grano Entero",
    desc: "Seleccionamos solo la capa más resistente para una bota que dura décadas.",
  },
  {
    icon: Layers,
    title: "Construcción Welt",
    desc: "Resoleable y robusta, diseñada para acompañarte toda la vida.",
  },
  {
    icon: Zap,
    title: "Suela de Nitrilo",
    desc: "Máxima tracción y resistencia química en cualquier terreno.",
  },
];

export default function CraftsmanshipSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black py-16 md:py-32 px-4 md:px-10 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="text-center mb-24"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-8xl font-rancho text-white mb-4 md:mb-6"
        >
          Ingeniería Artesanal
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-stone-400 text-base md:text-2xl max-w-3xl mx-auto font-roboto font-light"
        >
          Combinamos el diseño vanguardista con la durabilidad que solo el
          trabajo a mano puede ofrecer.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 font-roboto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={scaleIn}
            whileHover={{ y: -10 }}
            className="bg-stone-900/40 p-6 md:p-12 rounded-2xl md:rounded-4xl text-center border border-stone-800 hover:border-primary transition-all duration-500"
          >
            <div className="mb-8 inline-block p-5 bg-primary/10 rounded-2xl">
              <feature.icon className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4">
              {feature.title}
            </h3>
            <p className="text-stone-400 leading-relaxed text-sm md:text-xl font-light">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
