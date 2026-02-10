"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";

export default function HeroSection({ onRegisterClick }) {
  return (
    <section className="h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-black to-transparent z-10"></div>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/backgroundVideo.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 w-full h-full flex flex-col md:ml-15">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex-1 flex flex-col gap-2 justify-center px-4 md:px-10 lg:px-20 text-white"
        >
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl sm:text-2xl md:text-2xl lg:text-8xl mb-3 md:mb-5 font-bold leading-none drop-shadow-2xl font-rancho tracking-wide"
          >
            Bienvenidos a <br />
            KC Boots
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-[2.5rem] font-rancho"
          >
            Calidad artesanal en cada paso
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-[1.5rem]"
          >
            Únete y explora todo nuestro catálogo de botas premium 100%
            fabricadas en México.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center mt-6 md:mt-8 gap-3 md:gap-5"
          >
            <button
              onClick={onRegisterClick}
              className="text-base md:text-lg bg-primary hover:bg-primary-hover text-black hover:scale-102 duration-300 font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all cursor-pointer shadow-lg w-full sm:w-auto text-center"
            >
              Registrarme
            </button>
            <button className="text-base md:text-lg bg-secondary/40 backdrop-blur-md hover:bg-secondary-hover hover:scale-102 duration-300 font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all border border-white/20 w-full sm:w-auto text-center">
              <a href="/boots">Explorar Nuestro Catálogo</a>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#000000] to-transparent z-10"></div>
    </section>
  );
}
