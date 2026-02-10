"use client";
import { motion } from "framer-motion";
import { QuoteIcon, Star } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "./animations";

const testimonials = [
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
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-32 bg-black px-4 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-8xl text-white text-center mb-10 md:mb-20 font-rancho"
        >
          Calidad que nos Respalda
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {testimonials.map((testimonial, index) => (
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
                    className="size-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <QuoteIcon className="size-6 text-primary mb-4" />
              <p className="text-stone-300 text-lg italic mb-6">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="border-t border-stone-700 pt-6">
                <p className="text-white font-bold text-md">
                  {testimonial.author}
                </p>
                <p className="text-stone-500 text-sm">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
