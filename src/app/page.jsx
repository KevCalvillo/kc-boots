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
      {/* HERO SECTION */}
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
              className="text-[8rem] mb-5 font-bold leading-none drop-shadow-2xl font-rancho tracking-wide"
            >
              Bienvenidos a <br />
              KC Boots
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[3rem] font-rancho"
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
              className="flex items-center mt-8 gap-5"
            >
              <button
                onClick={() => {
                  setModalOpen(true);
                  setShowRegisterForm(true);
                }}
                className="text-2xl bg-primary hover:bg-primary-hover text-black hover:scale-105 duration-300 font-bold py-3 px-8 rounded-full transition-all cursor-pointer shadow-lg"
              >
                Registrarme
              </button>
              <button className="text-2xl bg-secondary/40 backdrop-blur-md hover:bg-secondary-hover hover:scale-102 duration-300 font-bold py-3 px-8 rounded-full transition-all border border-white/20">
                <Link href="/boots">Explorar Nuestro Catálogo</Link>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#000000] to-transparent z-10"></div>
      </section>
      {/* BENEFICIOS */}
      <section className="py-20 border-y">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-roboto">
            {[
              {
                icon: Truck,
                title: "Envío Gratis",
                desc: "En compras mayores a $1,500",
              },
              {
                icon: Award,
                title: "Garantía Elite",
                desc: "2 años en manufactura",
              },
              {
                icon: Clock,
                title: "Entrega Rápida",
                desc: "3-5 días hábiles",
              },
              { icon: Star, title: "Calidad 100%", desc: "Satisfacción total" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="flex flex-col items-center text-center gap-4 group"
              >
                <benefit.icon className="w-14 h-14 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white text-2xl font-bold tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-stone-500 text-lg font-light">
                  {benefit.desc}
                </p>
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
        >
          <motion.div variants={fadeInUp} className="text-center mb-24">
            <h2 className="text-8xl font-rancho text-white mb-4">
              Modelos de Temporada
            </h2>
            <p className="text-primary font-roboto text-xl uppercase tracking-[0.3em]">
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

          <motion.div variants={fadeInUp} className="text-center mt-20">
            <Link href="/boots">
              <button className="text-2xl bg-primary hover:bg-primary-hover hover:scale-105 cursor-pointer font-roboto font-bold py-4 px-10 rounded-full transition-all inline-flex items-center gap-4 shadow-xl">
                Ver Todo el Catálogo
                <ArrowRight className="w-7 h-7" />
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
            className="text-5xl md:text-8xl text-white leading-tight font-rancho"
          >
            Tradición en <br /> Cada Costura
          </motion.h2>
          <motion.p
            variants={slideInRight}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-2xl font-roboto font-light text-stone-300 leading-relaxed italic border-l-2 border-primary pl-4"
          >
            Nuestras botas son fabricadas por manos expertas en León,
            Guanajuato, utilizando técnicas centenarias y pieles de la más alta
            calidad.
          </motion.p>
          <motion.button
            variants={slideInRight}
            whileHover={{ scale: 1.05 }}
            onClick={() => setVideoModalOpen(true)}
            className="text-xl font-roboto cursor-pointer mt-10 hover:text-bgprimary bg-white/10 hover:bg-primary backdrop-blur-sm w-fit px-10 py-3 rounded-full text-white font-bold transition-all duration-300 border border-white/20"
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
      <section className="min-h-screen flex flex-col items-center justify-center bg-black py-32 px-10 md:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-8xl font-rancho text-white mb-6"
          >
            Ingeniería Artesanal
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-stone-400 text-2xl max-w-3xl mx-auto font-roboto font-light"
          >
            Combinamos el diseño vanguardista con la durabilidad que solo el
            trabajo a mano puede ofrecer.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-roboto">
          {[
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
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="bg-stone-900/40 p-12 rounded-[2rem] text-center border border-stone-800 hover:border-primary transition-all duration-500"
            >
              <div className="mb-8 inline-block p-5 bg-primary/10 rounded-2xl">
                <feature.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-stone-400 leading-relaxed text-xl font-light">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NÚMEROS/ESTADÍSTICAS */}
      <section className="py-38 bg-gradient-to-b from-black via-stone-900 to-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-10"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-8xl  text-white text-center mb-20 font-rancho"
          >
            Nuestra Historia en Números
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { num: "25+", label: "Años de Herencia", icon: Clock },
              { num: "50K+", label: "Clientes Reales", icon: Users },
              { num: "100%", label: "Orgullo Mexicano", icon: MapPin },
              { num: "4.9★", label: "Reputación", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-12 bg-black/70 rounded-3xl border border-white/5"
              >
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-6 " />
                <h3 className="text-5xl font-bold text-white mb-2">
                  {stat.num}
                </h3>
                <p className="text-stone-500 text-lg uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
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
            className="text-8xl  text-white text-center mb-20 font-rancho"
          >
            Calidad que nos Respalda
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
                <QuoteIcon className="w-10 h-10 text-primary mb-4" />
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
      <section className="py-40 bg-black relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto text-center px-10 relative z-10 font-roboto"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
          <h2 className="text-8xl md:text-8xl font-rancho text-white mb-10 leading-tight relative">
            ¿Listo Para Tu <br /> Próximo Par?
          </h2>
          <p className="text-stone-400 text-2xl mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Únete a la familia KC Boots y experimenta la diferencia de caminar
            con calzado premium fabricado para durar.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(161, 128, 70, 0.4)",
              }}
              className="text-2xl bg-primary font-bold py-5 px-14 rounded-full cursor-pointer duration-300 transition-all"
            >
              <Link href="/boots">Ver Catálogo Completo</Link>
            </motion.button>
            <motion.button
              onClick={() => {
                setModalOpen(true);
                setShowRegisterForm(true);
              }}
              className="text-2xl bg-stone-700/40 border-2 cursor-pointer border-stone-700 hover:border-primary text-white font-bold py-5 px-14 rounded-full transition-all"
            >
              Crear Cuenta Gratis
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default HomePage;
