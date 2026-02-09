import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-stone-900 pt-8 md:pt-20 pb-6 md:pb-10 px-4 md:px-10 font-roboto">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-16">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="font-rancho text-3xl md:text-5xl text-white">
            KC Boots
          </h2>
          <p className="text-stone-500 text-sm md:text-lg leading-relaxed">
            Orgullosamente fabricadas en León, Guanajuato. Llevando la tradición
            vaquera a cada rincón del mundo con pieles exóticas y calidad
            inigualable.
          </p>
          <div className="flex gap-3 md:gap-4 text-stone-400">
            <Facebook className="w-5 h-5 md:w-6 md:h-6 hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 md:w-6 md:h-6 hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 md:w-6 md:h-6 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-white text-base md:text-xl font-bold uppercase tracking-widest">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2 md:gap-4 text-stone-400 text-sm md:text-lg">
            <li className="hover:text-white transition-colors">
              <Link href="/boots">Catálogo Completo</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/nosotros">Nuestra Historia</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/cuidados">Cuidado de la Piel</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/contacto">Soporte</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-white text-base md:text-xl font-bold uppercase tracking-widest">
            Contacto
          </h3>
          <ul className="flex flex-col gap-2 md:gap-4 text-stone-400 text-sm md:text-lg">
            <li className="flex items-center gap-2 md:gap-3">
              <MapPin className="text-primary w-4 h-4 md:w-5 md:h-5" />
              León, Guanajuato, México
            </li>
            <li className="flex items-center gap-2 md:gap-3">
              <Phone className="text-primary w-4 h-4 md:w-5 md:h-5" />
              +52 (449) 217 9211
            </li>
            <li className="flex items-center gap-2 md:gap-3">
              <Mail className="text-primary w-4 h-4 md:w-5 md:h-5" />
              kevincalvillo26@gmail.com
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="text-white text-base md:text-xl font-bold uppercase tracking-widest">
            Únete al Gremio
          </h3>
          <p className="text-stone-500 text-sm md:text-lg">
            Recibe ofertas exclusivas y lanzamientos de ediciones limitadas.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Tu mejor email"
              className="w-full bg-stone-900 border border-stone-800 rounded-full py-3 px-4 md:py-4 md:px-6 text-sm md:text-base text-white focus:outline-none focus:border-primary transition-all font-light"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 md:right-2 md:top-2 md:bottom-2 bg-primary hover:bg-primary-hover px-4 md:px-6 rounded-full font-bold transition-all text-xs md:text-sm uppercase tracking-tighter"
            >
              Unirme
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto pt-4 md:pt-10 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-stone-600 text-xs md:text-sm">
        <p>© 2026 KC Boots - Todos los derechos reservados.</p>
        <div className="flex gap-4 md:gap-8">
          <span className="hover:text-stone-400 cursor-pointer">
            Términos y Condiciones
          </span>
          <span className="hover:text-stone-400 cursor-pointer">
            Política de Privacidad
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
