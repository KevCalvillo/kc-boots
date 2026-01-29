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
    <footer className="bg-black border-t border-stone-900 pt-20 pb-10 px-10 font-roboto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* COLUMNA 1: BRANDING */}
        <div className="flex flex-col gap-6">
          <h2 className="font-rancho text-5xl text-white">KC Boots</h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            Orgullosamente fabricadas en León, Guanajuato. Llevando la tradición
            vaquera a cada rincón del mundo con pieles exóticas y calidad
            inigualable.
          </p>
          <div className="flex gap-4 text-stone-400">
            <Facebook className="hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        {/* COLUMNA 2: ENLACES RÁPIDOS */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white text-xl font-bold uppercase tracking-widest">
            Navegación
          </h3>
          <ul className="flex flex-col gap-4 text-stone-400 text-lg">
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

        {/* COLUMNA 3: CONTACTO */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white text-xl font-bold uppercase tracking-widest">
            Contacto
          </h3>
          <ul className="flex flex-col gap-4 text-stone-400 text-lg">
            <li className="flex items-center gap-3">
              <MapPin className="text-primary w-5 h-5" />
              León, Guanajuato, México
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-primary w-5 h-5" />
              +52 (477) 123 4567
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-primary w-5 h-5" />
              ventas@kcboots.com
            </li>
          </ul>
        </div>

        {/* COLUMNA 4: NEWSLETTER (ESTILO PREMIUM) */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white text-xl font-bold uppercase tracking-widest">
            Únete al Gremio
          </h3>
          <p className="text-stone-500 text-lg">
            Recibe ofertas exclusivas y lanzamientos de ediciones limitadas.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Tu mejor email"
              className="w-full bg-stone-900 border border-stone-800 rounded-full py-4 px-6 text-white focus:outline-none focus:border-primary transition-all font-light"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-hover text-white px-6 rounded-full font-bold transition-all text-sm uppercase tracking-tighter"
            >
              Unirme
            </button>
          </form>
        </div>
      </div>

      {/* LÍNEA FINAL DE COPYRIGHT */}
      <div className="container mx-auto pt-10 border-t border-stone-900 flex flex-col md:row justify-between items-center gap-4 text-stone-600 text-sm">
        <p>© 2026 KC Boots - Todos los derechos reservados.</p>
        <div className="flex gap-8">
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
