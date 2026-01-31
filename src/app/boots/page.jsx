"use client";
import React, { useEffect, useState, useMemo } from "react";
import BootCard from "../../components/BootCard";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AllBoots() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Lógica de filtrado combinada (Búsqueda + Categoría + Orden)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtro por Buscador
    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 2. Filtro por Categoría
    if (categoryFilter !== "all") {
      //Logica pra filtrado por categoria
    }

    // 3. Ordenamiento
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break; 
    }

    return result;
  }, [products, sortBy, searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#050505] font-roboto">
      {/* 1. HERO HEADER - Impacto Visual */}
      <div className="relative h-[62vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/bgBotas5.webp')] bg-cover bg-center "></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-[#050505]"></div>

        <div className="relative z-10 mr-auto ml-30 text-left mt-10">
          <h1 className="text-7xl md:text-9xl text-white font-rancho drop-shadow-2xl">
            Catálogo
          </h1>
          <p className="text-primary tracking-widest text-xl mt-4 max-w-lg mx-auto font-light">
            Explora nuestra colección exclusiva de pieles exóticas y diseños
            artesanales
          </p>
        </div>
      </div>

      {/* 2. BARRA DE HERRAMIENTAS - Búsqueda y Filtros */}
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-y border-stone-800 py-6 px-4 md:px-10">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Tabs de Categorías (Visual) */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {["all", "exotic", "work", "western"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap
                  ${
                    categoryFilter === cat
                      ? "bg-primary border-primary text-white font-bold"
                      : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-white"
                  }`}
              >
                {cat === "all"
                  ? "Todas"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Select Personalizado */}
            <div className="relative min-w-50">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-stone-900 text-white px-4 py-2.5 rounded-xl border border-stone-800 cursor-pointer focus:outline-none focus:border-primary pr-10 hover:bg-stone-800 transition-colors"
                >
                  <option value="default">Relevancia</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A - Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GRID DE PRODUCTOS */}
      <div className="container mx-auto px-4 md:px-10 py-16 min-h-[50vh]">
        {loading ? (
          // SKELETON LOADING (Estado de carga)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-stone-900/50 rounded-2xl h-[400px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          // LISTA DE PRODUCTOS CON ANIMACIÓN
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
          >
            <AnimatePresence>
              {filteredProducts.map((bota) => (
                <motion.div
                  layout
                  key={bota.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BootCard bota={bota} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // ESTADO SIN RESULTADOS
          <div className="flex flex-col items-center justify-center py-20 text-stone-500">
            <Search className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-2xl font-bold text-stone-400">
              No encontramos botas
            </h3>
            <p>Intenta con otra búsqueda o filtro.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
              className="mt-6 text-primary hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBoots;
