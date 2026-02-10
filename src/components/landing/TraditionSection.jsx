"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import { slideInRight, staggerContainer } from "./animations";

export default function TraditionSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <section className="relative justify-end min-h-screen w-full flex items-center overflow-hidden bg-black px-4 md:px-10">
        <div className="absolute inset-0 z-20 bg-linear-to-b from-black via-black/30 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 top-0 w-full h-full md:w-3/5 z-10"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 z-20 bg-linear-to-l from-black via-black/30 to-transparent"></div>
            <img
              src="/bota2.webp"
              alt="Bota artesanal"
              className="h-full w-full object-cover object-center brightness-130"
            />
            <div className="absolute bottom-0 left-0 w-full h-62 bg-linear-to-t from-black to-transparent z-20"></div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative z-30 w-full md:w-2/3 lg:w-1/3 flex flex-col gap-4 md:gap-6 py-10 md:py-0"
        >
          <motion.h2
            variants={slideInRight}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-4xl lg:text-6xl text-white leading-tight font-rancho"
          >
            Tradición en <br /> Cada Costura
          </motion.h2>
          <motion.p
            variants={slideInRight}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg font-roboto font-light text-stone-300 leading-relaxed italic border-l-2 border-primary pl-4"
          >
            Nuestras botas son fabricadas por manos expertas en León,
            Guanajuato, utilizando técnicas centenarias y pieles de la más alta
            calidad.
          </motion.p>
          <motion.button
            variants={slideInRight}
            whileHover={{ scale: 1.05 }}
            onClick={() => setVideoModalOpen(true)}
            className="text-md md:text-lg font-roboto cursor-pointer mt-6 md:mt-10 hover:text-bgprimary bg-white/10 hover:bg-primary backdrop-blur-sm w-fit px-6 md:px-10 py-2 md:py-3 rounded-full text-white font-bold transition-all duration-300 border border-white/20"
          >
            Conoce el proceso
          </motion.button>
        </motion.div>
      </section>

      {/* Video Modal */}
      <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-10"
        >
          <h2 className="text-white text-xl md:text-3xl mb-4 md:mb-6 text-center">
            Créditos a los creadores
          </h2>
          <div className="w-full max-w-4xl mx-auto aspect-video">
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/DSKx36EpUZg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}
