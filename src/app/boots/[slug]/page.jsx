"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Minus,
  Plus,
  Star,
  ArrowRight,
  ShieldCheck,
  Truck,
  Ruler,
  ShoppingBasket,
} from "lucide-react";
import Heart from "@/ui/icons/Heart";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    addToCart,
    user,
    setModalOpen,
    setShowRegisterForm,
    toggleFavorite,
    isFavorite,
  } = useAuth();

  useEffect(() => {
    if (slug) {
      fetch(`/api/products/${slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          router.push("/boots");
        });
    }
  }, [slug, router]);

  function handleAddToCart() {
    if (!user) {
      setModalOpen(true);
      setShowRegisterForm(false);
      return;
    }
    if (!selectedSize) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "warning",
        title: "Selecciona tu talla",
        background: "#121212",
        color: "#fff",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, true, selectedSize);
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Agregado al carrito",
      background: "#121212",
      color: "#fff",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!product) return null;

  const isInFavorites = isFavorite(product.id);

  return (
    // CORRECCIÓN: pt-32 aquí asegura que NADA quede oculto por tu Header Global
    <div className="min-h-screen bg-[#050505] text-white font-roboto selection:bg-primary selection:text-black pt-32 pb-20">
      <main className="container mx-auto px-4 md:px-10">
        {/* NAVEGACIÓN (Breadcrumbs y Botón Atrás) */}
        {/* Ya no es fixed, fluye con la página debajo del header global */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-white transition-all text-md font-medium group cursor-pointer hover:scale-105 hover:text-primary"
          >
            <div className="p-2 rounded-full transition-all">
              <ArrowLeft className="size-5" />
            </div>
            <span>Volver</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500">
            <Link
              href="/boots"
              className="hover:text-stone-300 transition-colors"
            >
              Catálogo
            </Link>
            <span className="text-stone-700">/</span>
            <span className="text-stone-300 font-bold">{product.title}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* COLUMNA IZQUIERDA: GALERÍA */}
          <div className="w-full lg:w-3/5 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-linear-to-br from-stone-500 to-stone-200 rounded-3xl border border-stone-800 overflow-hidden aspect-4/3 lg:aspect-16/10 group"
            >
              {/* Badge discreto */}
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-stone-900/80 backdrop-blur-md text-white border border-stone-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  {product.category?.name || "Premium"}
                </span>
              </div>

              <motion.img
                key={currentImageIndex} // Para animar si cambias de foto
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.imageUrl}
                alt={product.title}
                draggable="false"
                className="w-full h-full object-contain p-6 md:p-12 transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Grid de miniaturas */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`bg-linear-to-br from-stone-500 to-stone-300 rounded-xl border aspect-4/3 flex items-center justify-center p-2 transition-all cursor-pointer ${currentImageIndex === i ? "border-primary ring-1 ring-primary" : "border-stone-800 hover:border-stone-600"}`}
                >
                  <img
                    src={product.imageUrl}
                    draggable="false"
                    className={`w-full h-full object-contain ${currentImageIndex === i ? "opacity-100" : "opacity-60"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO (Limpia y funcional) */}
          <div className="w-full lg:w-2/5">
            <div className="lg:top-32">
              {" "}
              {/* Ajustado top-32 para que no choque con el header al scrollear */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mb-8 border-b border-stone-800 pb-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-4xl md:text-5xl font-rancho text-white leading-none">
                    {product.title}
                  </h1>
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="absolute top-8 right-8 transition-colors group"
                  >
                    <Heart
                      className={`size-12  transition-all hover:scale-105 cursor-pointer duration-300 ${isInFavorites ? "fill-primary stroke-primary" : "stroke-primary group-hover:stroke-primary-hover"}`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold text-white font-mono">
                    ${Number(product.price).toLocaleString()}
                    <span className="text-sm font-sans font-normal text-stone-500 ml-2">
                      MXN
                    </span>
                  </div>
                  <div className="h-6 w-px bg-stone-800"></div>
                  <div className="flex items-center gap-1 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-sm text-white font-bold">4.9</span>
                    <span className="text-xs text-stone-500">(128)</span>
                  </div>
                </div>

                <p className="text-base text-stone-400 leading-relaxed">
                  {product.description ||
                    "Botas artesanales fabricadas con piel de primera calidad, diseñadas para durabilidad y confort. Cada par es único gracias a nuestro proceso de acabado manual."}
                </p>
              </motion.div>
              {/* SELECCIÓN */}
              <div className="space-y-8">
                {/* Tallas */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-white uppercase tracking-wide">
                      Seleccionar Talla
                    </span>
                    <button className="flex items-center gap-1 text-xs text-primary hover:text-white transition-colors underline decoration-primary/30">
                      <Ruler className="w-3 h-3" /> Guía de medidas
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {product.sizes &&
                      product.sizes.map((sizeObj) => (
                        <button
                          key={sizeObj.size}
                          onClick={() =>
                            sizeObj.stock > 0 && setSelectedSize(sizeObj.size)
                          }
                          disabled={sizeObj.stock === 0}
                          className={`h-12 rounded-full text-sm font-bold transition-all duration-200 border relative overflow-hidden group cursor-pointer
                          ${
                            sizeObj.stock === 0
                              ? "bg-[#0a0a0a] text-stone-700 border-stone-900 cursor-not-allowed line-through"
                              : selectedSize === sizeObj.size
                                ? "bg-primary text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105"
                                : "bg-[#161616] text-stone-400 border-stone-800 hover:border-stone-600 hover:text-white"
                          }`}
                        >
                          {sizeObj.size}
                        </button>
                      ))}
                  </div>
                  {selectedSize && product.sizes && (
                    <p className="text-xs text-stone-500 mt-3">
                      Stock disponible:{" "}
                      <span className="text-primary font-bold">
                        {
                          product.sizes.find((s) => s.size === selectedSize)
                            ?.stock
                        }
                      </span>{" "}
                      pares
                    </p>
                  )}
                  {!selectedSize && (
                    <div className="flex items-center gap-2 mt-3 text-red-400/80 text-xs animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      Selecciona una talla para continuar
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex gap-4">
                  <div className="flex items-center bg-[#161616] rounded-full border border-stone-800 h-14">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-full flex items-center cursor-pointer justify-center text-stone-400 hover:text-white hover:bg-stone-800 rounded-l-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-full flex items-center cursor-pointer justify-center text-stone-400 hover:text-white hover:bg-stone-800 rounded-r-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-hover hover:scale-102 text-black font-bold text-lg rounded-full flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer"
                  >
                    Agregar al Carrito <ShoppingBasket className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* TABS INFORMACIÓN EXTRA */}
              <div className="mt-10">
                <div className="flex border-b border-stone-800 mb-6">
                  {["details", "shipping"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 pb-3 text-xs cursor-pointer font-bold tracking-widest border-b-2 transition-colors ${activeTab === tab ? "border-primary text-white" : "border-transparent text-stone-600 hover:text-stone-400"}`}
                    >
                      {tab === "details"
                        ? "Especificaciones"
                        : "Envío y Garantía"}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-stone-400 leading-relaxed min-h-[100px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "details" ? (
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                          <div>
                            <h4 className="text-white text-xs uppercase font-bold mb-1">
                              Material
                            </h4>
                            <p>Piel Genuina Premium</p>
                          </div>
                          <div>
                            <h4 className="text-white text-xs uppercase font-bold mb-1">
                              Construcción
                            </h4>
                            <p>Goodyear Welt</p>
                          </div>
                          <div>
                            <h4 className="text-white text-xs uppercase font-bold mb-1">
                              Suela
                            </h4>
                            <p>Cuero con injerto de hule</p>
                          </div>
                          <div>
                            <h4 className="text-white text-xs uppercase font-bold mb-1">
                              Origen
                            </h4>
                            <p>León, Guanajuato</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="bg-stone-900 p-2 rounded-lg h-fit">
                              <Truck className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-white text-xs uppercase font-bold">
                                Envío Express
                              </h4>
                              <p className="text-xs mt-1">
                                Recíbelo en 3-5 días hábiles. Gratis en compras
                                mayores a $2000.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-stone-900 p-2 rounded-lg h-fit">
                              <ShieldCheck className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-white text-xs uppercase font-bold">
                                Garantía KC
                              </h4>
                              <p className="text-xs mt-1">
                                Protección de 90 días contra defectos de
                                fabricación.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
