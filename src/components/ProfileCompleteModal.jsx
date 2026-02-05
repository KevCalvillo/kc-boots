"use client";
import { useState } from "react";
import Modal from "./Modal";
import { UserCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function ProfileCompleteModal({
  isOpen,
  onClose,
  user,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zip: user?.zip || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      const updatedUser = await res.json();
      onUpdate(updatedUser);

      Swal.fire({
        title: "¡Perfil actualizado!",
        text: "Tu información ha sido guardada correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        background: "#1d1d1de8",
        color: "#ffffff",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar tu perfil",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        background: "#1d1d1de8",
        color: "#ffffff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-stone-900 border border-stone-800 text-white py-3 px-5 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-stone-600";
  const labelStyle = "text-sm text-stone-400 ml-1 mb-2 block";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-lg p-8 font-roboto">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-stone-800">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <UserCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl text-white font-rancho">
              Completa tu perfil
            </h2>
            <p className="text-stone-400 text-sm">
              Esta información nos ayuda a mejorar tu experiencia
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelStyle}>Teléfono</label>
            <input
              name="phone"
              type="tel"
              placeholder="(477) 123 4567"
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Dirección</label>
            <input
              name="address"
              type="text"
              placeholder="Av. Revolución 123, Col. Centro"
              value={formData.address}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Ciudad</label>
              <input
                name="city"
                type="text"
                placeholder="León"
                value={formData.city}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Estado</label>
              <input
                name="state"
                type="text"
                placeholder="Guanajuato"
                value={formData.state}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Código Postal</label>
            <input
              name="zip"
              type="text"
              placeholder="37000"
              value={formData.zip}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 transition-all"
            >
              Después
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
