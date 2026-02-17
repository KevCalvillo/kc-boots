"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  UploadCloud,
  Save,
  X,
  Loader2,
  Plus,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ProductForm({ productId }) {
  const router = useRouter();
  const isEditing = Boolean(productId);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Tallas disponibles para botas
  const AVAILABLE_SIZES = ["24", "25", "26", "27", "28", "29", "30", "31"];
  const [sizes, setSizes] = useState([]);
  // sizes = [{size: "26", stock: 5}, {size: "27", stock: 3}]

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    slug: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  // Cargar categorías
  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  // Si estamos editando, cargar datos del producto
  useEffect(() => {
    if (!productId) return;

    async function loadProduct() {
      try {
        const res = await fetch(`/api/admin/products/${productId}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const product = await res.json();

        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          slug: product.slug || "",
          stock: product.stock ?? "",
          imageUrl: product.imageUrl || "",
          categoryId: product.categoryId || "",
        });

        // Cargar tallas existentes
        if (product.sizes && product.sizes.length > 0) {
          setSizes(
            product.sizes.map((s) => ({ size: s.size, stock: s.stock })),
          );
        }

        if (product.imageUrl) {
          setImagePreview(product.imageUrl);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el producto",
          icon: "error",
          background: "#1d1d1de8",
          color: "#ffffff",
        });
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId, router]);

  // Auto-generar slug a partir del título
  function generateSlug(title) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title") {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  }

  // ---- UPLOAD DE IMÁGENES ----

  async function uploadFile(file) {
    // Validar que sea imagen
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        title: "Formato no válido",
        text: "El archivo debe ser una imagen",
        icon: "warning",
        background: "#1d1d1de8",
        color: "#ffffff",
      });
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        title: "Archivo muy grande",
        text: "La imagen no debe superar los 5MB",
        icon: "warning",
        background: "#1d1d1de8",
        color: "#ffffff",
      });
      return;
    }

    setUploading(true);

    // Preview local inmediato
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al subir imagen");
      }

      const { url } = await res.json();

      // Actualizar con la URL real de Supabase
      setForm((prev) => ({ ...prev, imageUrl: url }));
      setImagePreview(url);

      // Liberar el object URL temporal
      URL.revokeObjectURL(localPreview);
    } catch (error) {
      setImagePreview(null);
      URL.revokeObjectURL(localPreview);
      Swal.fire({
        title: "Error al subir",
        text: error.message,
        icon: "error",
        background: "#1d1d1de8",
        color: "#ffffff",
      });
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  function clearImage() {
    setForm((prev) => ({ ...prev, imageUrl: "" }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.slug.trim()
    ) {
      Swal.fire({
        title: "Campos requeridos",
        text: "Completa el título, descripción, precio y slug",
        icon: "warning",
        background: "#1d1d1de8",
        color: "#ffffff",
      });
      return;
    }

    setSaving(true);

    // Stock general = suma del stock de todas las tallas
    const totalStock = sizes.reduce(
      (sum, s) => sum + (parseInt(s.stock) || 0),
      0,
    );

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      slug: form.slug.trim(),
      stock: totalStock,
      imageUrl: form.imageUrl.trim() || null,
      categoryId: form.categoryId || null,
      sizes: sizes.map((s) => ({
        size: s.size,
        stock: parseInt(s.stock) || 0,
      })),
    };

    try {
      const url = isEditing
        ? `/api/admin/products/${productId}`
        : "/api/admin/products";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }

      Swal.fire({
        title: isEditing ? "¡Producto actualizado!" : "¡Producto creado!",
        text: isEditing
          ? "Los cambios se guardaron correctamente"
          : "El producto se agregó al catálogo",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        background: "#1d1d1de8",
        color: "#ffffff",
      });

      router.push("/admin/products");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        background: "#1d1d1de8",
        color: "#ffffff",
      });
    } finally {
      setSaving(false);
    }
  }

  // Classes reutilizables
  const labelClass =
    "block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2";
  const inputClass =
    "w-full bg-[#121212] border border-stone-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-700";
  const cardClass =
    "bg-[#161616] border border-stone-800 rounded-3xl p-6 md:p-8 shadow-xl";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-roboto p-6 md:p-10 pb-20">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-sm font-medium mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo
          </Link>
          <h1 className="text-4xl font-rancho text-white">
            {isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-xl border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-900 transition-colors font-bold text-sm"
          >
            Cancelar
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-[#8a6d3b] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving
              ? "Guardando..."
              : isEditing
                ? "Guardar Cambios"
                : "Guardar Producto"}
          </button>
        </div>
      </div>

      {/* FORMULARIO */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-2 space-y-8">
          {/* Información Básica */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-stone-800 pb-4">
              Información General
            </h2>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>Nombre del Producto</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ej: Botas Chelsea Exóticas"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="botas-chelsea-exoticas"
                  className={`${inputClass} font-mono text-sm`}
                  required
                />
                <p className="text-stone-600 text-xs mt-1">
                  Se genera automáticamente del título. Puedes editarlo
                  manualmente.
                </p>
              </div>

              <div>
                <label className={labelClass}>Descripción Detallada</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe los materiales, el corte, y los detalles únicos..."
                  className={`${inputClass} resize-none custom-scrollbar`}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Precios e Inventario */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-stone-800 pb-4">
              Precios e Inventario
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Precio (MXN)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`${inputClass} pl-8 font-mono`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Stock Total</label>
                <div
                  className={`${inputClass} font-mono bg-stone-900/50 cursor-not-allowed`}
                >
                  {sizes.reduce((sum, s) => sum + (parseInt(s.stock) || 0), 0)}
                  <span className="text-stone-600 text-xs ml-2">
                    unidades (suma de tallas)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tallas */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-stone-800 pb-4">
              Tallas Disponibles
            </h2>

            {/* Chips de tallas */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {AVAILABLE_SIZES.map((size) => {
                const isActive = sizes.some((s) => s.size === size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        setSizes((prev) => prev.filter((s) => s.size !== size));
                      } else {
                        setSizes((prev) => [...prev, { size, stock: 0 }]);
                      }
                    }}
                    className={`py-3 rounded-xl font-bold text-sm transition-all duration-200 border cursor-pointer
                      ${
                        isActive
                          ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10"
                          : "bg-[#121212] border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                      }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Stock por talla */}
            {sizes.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Stock por talla
                </p>
                {sizes
                  .sort((a, b) => parseFloat(a.size) - parseFloat(b.size))
                  .map((s) => (
                    <div
                      key={s.size}
                      className="flex items-center justify-between bg-[#121212] border border-stone-800 rounded-xl px-4 py-3"
                    >
                      <span className="text-white font-bold text-sm">
                        Talla {s.size}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setSizes((prev) =>
                              prev.map((item) =>
                                item.size === s.size
                                  ? {
                                      ...item,
                                      stock: Math.max(0, item.stock - 1),
                                    }
                                  : item,
                              ),
                            )
                          }
                          className="p-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={s.stock === 0 ? "" : s.stock}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSizes((prev) =>
                              prev.map((item) =>
                                item.size === s.size
                                  ? {
                                      ...item,
                                      stock:
                                        val === "" ? 0 : parseInt(val, 10) || 0,
                                    }
                                  : item,
                              ),
                            );
                          }}
                          placeholder="0"
                          className="w-16 bg-transparent text-center text-white font-mono font-bold text-sm outline-none border-b border-stone-700 focus:border-primary transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSizes((prev) =>
                              prev.map((item) =>
                                item.size === s.size
                                  ? { ...item, stock: item.stock + 1 }
                                  : item,
                              ),
                            )
                          }
                          className="p-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {sizes.length === 0 && (
              <p className="text-stone-600 text-xs text-center py-2">
                Selecciona las tallas disponibles para este producto
              </p>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="space-y-8">
          {/* Imagen - Upload con Drag & Drop */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-stone-800 pb-4">
              Fotografía
            </h2>

            {imagePreview ? (
              <div className="relative aspect-square bg-[#121212] rounded-2xl overflow-hidden border border-stone-800 p-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-xl"
                  onError={() => setImagePreview(null)}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <span className="text-sm text-stone-300">
                        Subiendo...
                      </span>
                    </div>
                  </div>
                )}
                {!uploading && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl bg-[#121212] aspect-square flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300
                  ${
                    dragActive
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-stone-800 hover:border-primary/50 hover:bg-stone-900/50"
                  }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-stone-300 font-bold text-sm">
                      Subiendo imagen...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-4 rounded-full transition-transform duration-300 ${
                        dragActive
                          ? "bg-primary/20 scale-110"
                          : "bg-stone-900 group-hover:scale-110"
                      }`}
                    >
                      <UploadCloud
                        className={`w-8 h-8 ${
                          dragActive ? "text-primary" : "text-primary"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-stone-300 font-bold text-sm">
                        {dragActive
                          ? "Suelta la imagen aquí"
                          : "Arrastra o haz clic para subir"}
                      </p>
                      <p className="text-stone-600 text-xs mt-1">
                        PNG, JPG o WEBP (Max. 5MB)
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {/* Mostrar la URL actual si existe */}
            {form.imageUrl && (
              <p
                className="text-stone-600 text-xs mt-3 truncate"
                title={form.imageUrl}
              >
                📎 {form.imageUrl}
              </p>
            )}
          </div>

          {/* Clasificación */}
          <div className={cardClass}>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-stone-800 pb-4">
              Organización
            </h2>

            <div>
              <label className={labelClass}>Categoría</label>
              <div className="relative">
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer pr-10`}
                >
                  <option value="" className="bg-stone-900">
                    Sin categoría
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="bg-stone-900"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
