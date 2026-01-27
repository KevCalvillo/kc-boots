"use client";
import { useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";
import BootCard from "@/components/BootCard";
import {
  ShieldCheck,
  Layers,
  Zap,
  QuoteIcon,
  Truck,
  Award,
  Clock,
  Star,
  ArrowRight,
  MapPin,
  Users,
  Heart,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { setModalOpen, setShowRegisterForm } = useAuth();

  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const featuredProducts = [
    {
      id: 1,
      title: "Bota Ranchera Clásica",
      price: 2499,
      imageUrl: "/bota1.webp",
      rating: 5,
    },
    {
      id: 2,
      title: "Bota Trabajo Premium",
      price: 2899,
      imageUrl: "/bota3.webp",
      rating: 5,
    },
    {
      id: 3,
      title: "Bota Casual Elite",
      price: 2699,
      imageUrl: "/bota4.webp",
      rating: 4,
    },
    
  ];

  return (
    <>
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

        <div className="relative z-20 w-full h-full flex flex-col">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex-1 flex flex-col justify-center px-20 text-white"
          >
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[7rem] font-bold leading-none drop-shadow-2xl"
            >
              Bienvenidos a <br />
              KC Boots
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[2.5rem]"
            >
              Calidad artesanal en cada paso
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-[1.5rem]"
            >
              Únete y explora todo nuestro catálogo de botas premium 100%
              fabricadas en México.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex items-center gap-5"
            >
              <button
                onClick={() => {
                  setModalOpen(true);
                  setShowRegisterForm(true);
                }}
                className="text-2xl mt-5 bg-green-800 hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all cursor-pointer"
              >
                Registrarme
              </button>
              <button className="text-2xl mt-5 bg-[#7272728c] hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all">
                <Link href="/boots">Explora Nuestro Catálogo</Link>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#000000] to-transparent z-10"></div>
      </section>

      {/* BENEFICIOS RÁPIDOS */}
      <section className="bg-[#000000] py-20 border-y">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                icon: Truck,
                title: "Envío Gratis",
                description: "En compras mayores a $1,500",
              },
              {
                icon: Award,
                title: "Garantía de Calidad",
                description: "2 años en manufactura",
              },
              {
                icon: Clock,
                title: "Entrega Rápida",
                description: "3-5 días hábiles",
              },
              {
                icon: Star,
                title: "Satisfacción 100%",
                description: "Devoluciones gratuitas",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl hover:bg-stone-900/50 transition-colors"
              >
                <benefit.icon className="w-12 h-12 text-green-600" />
                <h3 className="text-white text-2xl font-bold">
                  {benefit.title}
                </h3>
                <p className="text-stone-400 text-lg">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="min-h-screen bg-black py-32 px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className=""
        >
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-6xl font-bold text-white mb-4 uppercase tracking-tight">
              HOT 2026
            </h2>
            <p className="text-stone-400 text-2xl">
              Nuestras botas más populares
            </p>
          </motion.div>

          <div className="flex items-center justify-evenly">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                transition={{ delay: index * 0.5 }}
              >
                <BootCard bota={product}/>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link href="/boots">
              <button
                className="text-2xl bg-green-800 hover:bg-green-900 hover:scale-105 cursor-pointer text-white font-bold py-3 px-8 rounded-xl transition-all inline-flex items-center gap-3"
              >
                Ver Catálogo Completo
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TRADICIÓN SECTION */}
      <section className="relative justify-end min-h-screen w-full flex items-center overflow-hidden bg-black px-10">
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
          className="relative z-30 w-full md:w-1/3 flex flex-col gap-6"
        >
          <motion.h2
            variants={slideInRight}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Tradición en <br /> Cada Costura
          </motion.h2>
          <motion.p
            variants={slideInRight}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl text-stone-300 max-w-lg"
          >
            Nuestras botas son fabricadas por manos expertas en León,
            Guanajuato, utilizando técnicas centenarias y pieles de la más alta
            calidad.
          </motion.p>
          <motion.button
            variants={slideInRight}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVideoModalOpen(true)}
            className="text-2xl mt-5 bg-[#7272728c] hover:bg-green-900 w-fit px-10 duration-300 text-white font-bold py-2 rounded transition-all cursor-pointer"
          >
            Conoce el proceso
          </motion.button>
        </motion.div>
      </section>

      {/* VIDEO MODAL */}
      <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-10"
        >
          <h2 className="text-white text-3xl mb-6 text-center">
            Créditos a los creadores
          </h2>
          <iframe
            width="1080"
            height="600"
            src="https://www.youtube.com/embed/DSKx36EpUZg"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          ></iframe>
        </motion.div>
      </Modal>

      {/* INGENIERÍA ARTESANAL SECTION */}
      <section className="h-screen flex flex-col items-center justify-center bg-black px-10 md:px-20 relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tighter"
          >
            Ingeniería Artesanal
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-stone-400 text-3xl max-w-2xl mx-auto font-light"
          >
            No solo es estética, seleccionamos cada componente para que tus
            botas duren décadas, no temporadas.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {[
            {
              icon: ShieldCheck,
              title: "Piel de Grano Entero",
              description:
                "Utilizamos la capa más resistente de la piel, manteniendo las marcas naturales que hacen que cada bota sea única e irrepetible.",
            },
            {
              icon: Layers,
              title: "Construcción Welt",
              description:
                "El método Goodyear Welt permite que la bota sea totalmente resoleable, extendiendo su vida útil por muchos años.",
            },
            {
              icon: Zap,
              title: "Suela de Nitrilo",
              description:
                "Resistencia extrema al aceite y la abrasión, diseñada para ofrecer tracción máxima en cualquier terreno difícil.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, borderColor: "rgb(34, 197, 94)" }}
              className="bg-[#1d1d1dbc] p-10 rounded-3xl border border-stone-800 transition-colors duration-500 group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-block p-4 bg-stone-800 rounded-2xl group-hover:bg-green-900/30 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-green-700" />
              </motion.div>
              <h3 className="text-4xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-stone-400 leading-relaxed text-2xl">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* NÚMEROS/ESTADÍSTICAS */}
      <section className="py-32 bg-gradient-to-b from-black via-stone-900 to-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-10"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-6xl font-bold text-white text-center mb-20 uppercase"
          >
            Nuestra Historia en Números
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { number: "25+", label: "Años de Experiencia", icon: Clock },
              { number: "50K+", label: "Clientes Satisfechos", icon: Users },
              { number: "100%", label: "Hecho en México", icon: MapPin },
              { number: "4.9★", label: "Calificación Promedio", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                className="text-center p-10 bg-[#1a1a1a] rounded-3xl border border-stone-800"
              >
                <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-6xl font-bold text-green-500 mb-2">
                  {stat.number}
                </h3>
                <p className="text-stone-400 text-xl">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MÁS TESTIMONIOS */}
      <section className="py-32 bg-black px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-6xl font-bold text-white text-center mb-20 uppercase"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                text: "Nunca había tenido unas botas que se sintieran como una segunda piel desde el primer día.",
                author: "Juan R.",
                location: "Chihuahua, MX",
                rating: 5,
              },
              {
                text: "La calidad es incomparable. Ya llevo 3 años con ellas y siguen como nuevas.",
                author: "María G.",
                location: "Monterrey, MX",
                rating: 5,
              },
              {
                text: "Perfectas para trabajo pesado. Resisten todo tipo de terreno sin problema.",
                author: "Carlos M.",
                location: "Guadalajara, MX",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1a1a1a] p-8 rounded-3xl border border-stone-800"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <QuoteIcon className="w-10 h-10 text-green-800 mb-4" />
                <p className="text-stone-300 text-xl italic mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="border-t border-stone-700 pt-6">
                  <p className="text-white font-bold text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-stone-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-gradient-to-b from-black to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center px-10 relative z-10"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
            ¿Listo Para Tu Próximo Par?
          </h2>
          <p className="text-stone-400 text-2xl mb-12 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y experimenta la diferencia de
            la verdadera artesanía mexicana.
          </p>
          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl bg-green-800 hover:bg-green-900 text-white font-bold py-4 px-10 rounded-xl transition-all"
            >
              <Link href="/boots">Ver Catálogo</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setModalOpen(true);
                setShowRegisterForm(true);
              }}
              className="text-2xl bg-transparent border-2 border-green-800 hover:bg-green-900/20 text-white font-bold py-4 px-10 rounded-xl transition-all"
            >
              Crear Cuenta
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default HomePage;
