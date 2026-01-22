"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import RegisterForm from "../forms/Register";
import Modal from "@/components/Modal";
import Link from "next/link";
import { ShieldCheck, Layers, Zap, QuoteIcon} from "lucide-react";

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
          <Header />
          <div className="flex-1 flex flex-col justify-center px-20 text-white">
            <h1 className="text-[7rem] font-bold leading-none drop-shadow-2xl">
              Bienvenidos a <br />
              KC Boots
            </h1>
            <h2 className="text-[2.5rem]">Calidad artesanal en cada paso</h2>
            <p className="text-[1.5rem]">
              Registrate y Explora todo nuestro catálogo de botas premium 100%
              fabricadas en Mexico.
            </p>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setModalOpen(true)}
                className="text-2xl mt-5 bg-green-800 hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all"
              >
                Registrate
              </button>
              <button className="text-2xl mt-5 bg-[#7272728c] hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all">
                <Link href="/boots">Explora Nuestro Catalogo</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#000000] to-transparent z-10"></div>
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} title="Crea tu Cuenta">
            <RegisterForm setModalOpen={setModalOpen} />
          </Modal>
        )}
      </section>

      <section className="relative justify-end min-h-screen w-full flex items-center overflow-hidden bg-black px-10">
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black via-black/30 to-transparent"></div>

        <div className="absolute left-0 top-0 w-full h-full md:w-3/5 z-10">
          <div className="relative h-full w-full">
            {/* Overlay de sombra para fundir la imagen con el fondo negro a la izquierda */}
            <div className="absolute inset-0 z-20 bg-gradient-to-l from-black via-black/30 to-transparent"></div>

            <img
              src="/bota2.webp"
              alt="Bota artesanal"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute bottom-0 left-0 w-full h-62 bg-gradient-to-t from-black to-transparent z-20"></div>
          </div>
        </div>
        <div className="relative z-30 w-full md:w-1/3 flex flex-col gap-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Tradición en <br /> Cada Costura
          </h2>
          <p className="text-3xl text-stone-300 max-w-lg">
            Nuestras botas son fabricadas por manos expertas en León,
            Guanajuato, utilizando técnicas centenarias y pieles de la más alta
            calidad.
          </p>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="text-2xl mt-5 bg-[#7272728c] hover:bg-green-900 w-fit px-10 hover:scale-105 duration-300 text-white font-bold py-2 rounded transition-all"
          >
            Conoce el proceso
          </button>
          {videoModalOpen && (
            <Modal
              setModalOpen={setVideoModalOpen}
              title="Créditos a los creadores"
            >
              <iframe
                width="1080"
                height="600"
                src="https://www.youtube.com/embed/DSKx36EpUZg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Modal>
          )}
        </div>
      </section>

      <section className="h-screen flex flex-col items-center justify-center bg-black px-10 md:px-20 relative overflow-hidden">
        {/* Título de la sección */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tighter">
            Ingeniería Artesanal
          </h2>
          <p className="text-stone-400 text-3xl max-w-2xl mx-auto font-light">
            No solo es estética, seleccionamos cada componente para que tus
            botas duren décadas, no temporadas.
          </p>
        </div>

        {/* Grid de Materiales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Material 1 */}
          <div className="bg-[#1d1d1dbc] p-10 rounded-3xl border border-stone-800 hover:border-green-800 transition-colors duration-500 group">
            <div className="mb-6 inline-block p-4 bg-stone-800 rounded-2xl group-hover:bg-green-900/30 transition-colors">
              <ShieldCheck className="w-10 h-10 text-green-700" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">
              Piel de Grano Entero
            </h3>
            <p className="text-stone-400 leading-relaxed text-2xl">
              Utilizamos la capa más resistente de la piel, manteniendo las
              marcas naturales que hacen que cada bota sea única e irrepetible.
            </p>
          </div>

          {/* Material 2 */}
          <div className="bg-[#1d1d1dbc] p-10 rounded-3xl border border-stone-800 hover:border-green-800 transition-colors duration-500 group">
            <div className="mb-6 inline-block p-4 bg-stone-800 rounded-2xl group-hover:bg-green-900/30 transition-colors">
              <Layers className="w-10 h-10 text-green-700" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">
              Construcción Welt
            </h3>
            <p className="text-stone-400 leading-relaxed text-2xl">
              El método Goodyear Welt permite que la bota sea totalmente
              resoleable, extendiendo su vida útil por muchos años.
            </p>
          </div>

          {/* Material 3 */}
          <div className="bg-[#1d1d1dbc] p-10 rounded-3xl border border-stone-800 hover:border-green-800 transition-colors duration-500 group">
            <div className="mb-6 inline-block p-4 bg-stone-800 rounded-2xl group-hover:bg-green-900/30 transition-colors">
              <Zap className="w-10 h-10 text-green-700" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">
              Suela de Nitrilo
            </h3>
            <p className="text-stone-400 leading-relaxed text-2xl">
              Resistencia extrema al aceite y la abrasión, diseñada para ofrecer
              tracción máxima en cualquier terreno difícil.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black flex flex-col items-center px-10">
        <QuoteIcon className="w-12 h-12 text-green-800 mb-8" />
        <p className="text-4xl md:text-5xl text-center text-white italic max-w-4xl font-light">
          &quot;Nunca había tenido unas botas que se sintieran como una segunda piel
          desde el primer día, la calidad de KC es insuperable.&quot;
        </p>
        <span className="mt-10 text-xl font-bold text-green-700 uppercase tracking-widest">
          — Juan R. (Chihuahua, MX)
        </span>
      </section>
    </>
  );
}

export default HomePage;
