"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(product) {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      html: `<p style="color:#a8a29e">Estás a punto de eliminar <strong style="color:white">${product.title}</strong>. Esta acción no se puede deshacer.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#292524",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      // Eliminar del state local sin recargar
      setProducts((prev) => prev.filter((p) => p.id !== product.id));

      Swal.fire({
        title: "¡Eliminado!",
        text: "El producto se eliminó del catálogo",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        background: "#1d1d1de8",
        color: "#ffffff",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el producto",
        icon: "error",
        background: "#1d1d1de8",
        color: "#ffffff",
      });
    }
  }

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-roboto pb-20">
      {/* 1. HERO HEADER */}
      <div className="relative h-[25vh] w-full flex items-center justify-center overflow-hidden border-b border-stone-800/50">
        <div className="absolute inset-0 bg-radial-gradient from-stone-900/40 via-[#050505] to-[#050505] opacity-60 pointer-events-none" />
        <h1 className="relative z-10 text-6xl md:text-8xl text-white font-rancho drop-shadow-2xl">
          Catálogo
        </h1>
      </div>

      {/* 2. BARRA DE HERRAMIENTAS */}
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-stone-800 py-4 px-4 md:px-10 shadow-xl">
        <div className="container mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Buscador */}
          <div className="relative w-full sm:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121212] border border-stone-800 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href="/admin/products/create"
              className="w-full sm:w-auto bg-primary hover:bg-[#8a6d3b] text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 text-sm"
            >
              <Plus className="w-5 h-5" />
              Agregar Producto
            </Link>
          </div>
        </div>
      </div>

      {/* 3. TABLA DE PRODUCTOS */}
      <div className="container mx-auto px-4 md:px-10 pt-10">
        <div className="bg-[#121212] rounded-2xl border border-stone-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              {/* CABECERA */}
              <thead>
                <tr className="bg-stone-900/50 border-b border-stone-800 text-stone-400 text-xs uppercase tracking-widest">
                  <th className="px-6 py-5 font-medium">Producto</th>
                  <th className="px-6 py-5 font-medium text-right">Precio</th>
                  <th className="px-6 py-5 font-medium text-center">Stock</th>
                  <th className="px-6 py-5 font-medium text-right">Acciones</th>
                </tr>
              </thead>

              {/* CUERPO */}
              <tbody>
                <AnimatePresence>
                  {loading ? (
                    [...Array(4)].map((_, idx) => (
                      <tr
                        key={`skel-${idx}`}
                        className="border-b border-stone-800/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-stone-800 rounded-xl animate-pulse"></div>
                            <div className="h-4 w-32 bg-stone-800 rounded animate-pulse"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-16 bg-stone-800 rounded animate-pulse ml-auto"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 w-16 bg-stone-800 rounded-full animate-pulse mx-auto"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-8 w-20 bg-stone-800 rounded animate-pulse ml-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-16 text-center text-stone-500"
                      >
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium text-stone-400">
                          {search
                            ? "No se encontraron productos"
                            : "No hay productos registrados"}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <motion.tr
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={product.id}
                        className="border-b border-stone-800/50 hover:bg-stone-900/30 transition-colors group"
                      >
                        {/* Imagen y Título */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-stone-400 to-stone-200 rounded-xl p-1.5 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.title}
                                  className="w-full h-full object-contain drop-shadow-md"
                                />
                              ) : (
                                <div className="w-full h-full bg-stone-300 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="w-5 h-5 text-stone-500" />
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-white text-base block">
                                {product.title}
                              </span>
                              {product.category && (
                                <span className="text-xs text-stone-500">
                                  {product.category.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Precio */}
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-white">
                            $
                            {Number(product.price).toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </td>

                        {/* Stock Badge */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold border
                            ${
                              product.stock > 10
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : product.stock > 0
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  : "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} disp.`
                              : "Agotado"}
                          </span>
                        </td>

                        {/* Acciones */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() =>
                                router.push(
                                  `/admin/products/edit/${product.id}`,
                                )
                              }
                              className="p-2 bg-stone-900 hover:bg-primary/20 text-stone-400 hover:text-primary border border-stone-800 hover:border-primary/50 rounded-lg transition-all cursor-pointer"
                              title="Editar"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product)}
                              className="p-2 bg-stone-900 hover:bg-red-500/20 text-stone-400 hover:text-red-500 border border-stone-800 hover:border-red-500/50 rounded-lg transition-all cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {!loading && products.length > 0 && (
            <div className="bg-stone-900/30 border-t border-stone-800 px-6 py-4 text-xs text-stone-400 flex justify-between items-center">
              <span>
                {search
                  ? `${filteredProducts.length} de ${products.length} productos`
                  : `Total de productos: ${products.length}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProductsPage;
