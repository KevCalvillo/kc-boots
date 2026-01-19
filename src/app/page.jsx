"use client";
import { useEffect, useState } from "react";
import BootCard from "../components/BootCard";
import Header from "../components/Header";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <section className="h-screen flex flex-col relative overflow-hidden">
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
              <button className="text-2xl mt-5 bg-green-800 hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all">
                Registrate
              </button>
              <button className="text-2xl mt-5 bg-[#7272728c] hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all">
                Explora Nuestro Catalogo
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#000000] to-transparent z-10"></div>
      </section>

      <section className="min-h-screen flex flex-col justify-center items-center p-10 z-20">
        <div className="absolute top-224 w-full h-1/2 bg-linear-to-t from-transparent to-black z-10"></div>
        <h1 className="z-20 text-[4rem] font-bold text-center text-white mb-10">
          Nuestras Botas
        </h1>
        <div className="p-2 pb-15 pt-10 flex justify-center items-center z-20">
          <div className="grid grid-cols-4 gap-8">
            {products.map((bota) => (
              <BootCard key={bota.id} bota={bota} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
