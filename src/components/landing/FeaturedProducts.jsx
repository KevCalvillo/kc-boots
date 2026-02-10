"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BootCard from "@/components/BootCard";
import { fadeInUp, scaleIn, staggerContainer } from "./animations";

const featuredProducts = [
  {
    id: 1,
    title: "Bota Ranchera Clásica",
    description:
      "Bota de piel de alta calidad, ideal para el trabajo y el día a día.",
    price: 2499,
    imageUrl: "/bota1.webp",
    rating: 5,
  },
  {
    id: 2,
    title: "Bota Trabajo Premium",
    description: "Bota de piel exótica, ideal para el trabajo y el día a día.",
    price: 2899,
    imageUrl: "/bota3.webp",
    rating: 5,
  },
  {
    id: 3,
    title: "Bota Casual Elite",
    description:
      "Bota de piel de alta calidad, ideal para el trabajo y el día a día.",
    price: 2699,
    imageUrl: "/bota4.webp",
    rating: 4,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="min-h-screen bg-black py-16 md:py-32 px-4 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-rancho text-white mb-4">
            Modelos de Temporada
          </h2>
          <p className="text-primary font-roboto text-sm md:text-xl uppercase tracking-widest md:tracking-[0.3em]">
            Colección Hot 2026
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={scaleIn}
              transition={{ delay: index * 0.2 }}
            >
              <BootCard bota={product} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-10 md:mt-20">
          <Link href="/boots">
            <button className="text-md md:text-lg bg-primary hover:bg-primary-hover hover:scale-105 cursor-pointer font-roboto font-bold py-2 md:py-3 px-6 md:px-10 rounded-full transition-all inline-flex items-center gap-2 md:gap-4 shadow-xl">
              Ver Todo el Catálogo
              <ArrowRight className="size-6" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
