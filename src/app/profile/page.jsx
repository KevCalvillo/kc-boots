"use client";
import { useAuth } from "@/context/AuthContext";
import Edit from "@/ui/icons/Edit";
import { Mail, Phone, MapPin, Building2, House, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import BootCard from "@/components/BootCard";
import ProfileCompleteModal from "@/components/ProfileCompleteModal";

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const isProfileIncomplete = (userData) => {
    return (
      !userData?.phone ||
      !userData?.address ||
      !userData?.city ||
      !userData?.state ||
      !userData?.zip
    );
  };

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/favorites?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data));
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [user?.id]);

  useEffect(() => {
    if (user && isProfileIncomplete(user)) {
      setShowProfileModal(true);
    }
  }, [user]);

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleEditField = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue || "");
  };

  const handleSaveField = async (field) => {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: editValue }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating field:", error);
    }
    setEditingField(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const renderField = (icon, label, field, value) => {
    const Icon = icon;
    const isEditing = editingField === field;

    return (
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 stroke-primary flex-shrink-0" />
        <span className="text-stone-400 min-w-[80px]">{label}:</span>
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 bg-stone-800 border border-stone-700 text-white py-1 px-3 rounded-lg focus:outline-none focus:border-primary text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveField(field);
                if (e.key === "Escape") handleCancelEdit();
              }}
            />
            <button
              onClick={() => handleSaveField(field)}
              className="hover:text-primary transition-colors hover:scale-110 duration-300"
            >
              <Check className="w-5 h-5 stroke-primary" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="hover:text-primary transition-colors hover:scale-110 duration-300"
            >
              <X className="w-5 h-5 stroke-primary" />
            </button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 ${!value ? "text-stone-600 italic" : "text-white"}`}
            >
              {value || "Sin agregar"}
            </span>
            <button
              onClick={() => handleEditField(field, value)}
              className="hover:text-primary transition-colors hover:scale-110 duration-300 ml-auto"
            >
              <Edit className="w-5 h-5 stroke-primary" />
            </button>
          </>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center text-white justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">
          Debes iniciar sesión para ver tu perfil
        </h1>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#050505] text-white pt-32 pb-20 font-roboto">
      <ProfileCompleteModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />

      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-rancho">
            Perfil
            <p className="text-2xl text-primary tracking-widest">
              Aqui puedes ver tus ordenes y editar tus datos.
            </p>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <div className="w-full lg:w-1/3 bg-[#121212] p-6 md:p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8 border-b border-stone-800 pb-4">
              <img
                src="https://placehold.co/100x100"
                className="w-24 h-24 rounded-2xl"
                alt=""
              />
              <div className="text-center sm:text-left">
                <h1 className="font-rancho text-4xl">{user.name}</h1>
                <p className="text-stone-400 text-sm mt-1 font-roboto">
                  {user.id}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-left w-full border-b border-stone-800 pb-4">
                <h2 className="text-white tracking-wider mb-4 font-bold">
                  Contacto
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 stroke-primary flex-shrink-0" />
                    <span className="text-stone-400 min-w-[80px]">Email:</span>
                    <span className="flex-1 text-white">{user.email}</span>
                  </div>
                  {renderField(Phone, "Teléfono", "phone", user.phone)}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white tracking-wider font-bold">
                    Domicilio
                  </h2>
                  {isProfileIncomplete(user) && (
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="text-xs text-primary hover:text-primary-hover transition-colors"
                    >
                      Completar todo
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {renderField(House, "Dirección", "address", user.address)}
                  {renderField(Building2, "Ciudad", "city", user.city)}
                  {renderField(MapPin, "Estado", "state", user.state)}
                  {renderField(MapPin, "CP", "zip", user.zip)}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 bg-[#121212] p-6 md:p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <h2 className="font-rancho text-4xl mb-8 border-b border-stone-800 pb-4">
              Tus Ordenes
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr>
                    <th className="text-left">Orden</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Total</th>
                    <th className="text-left">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="text-left">{order.id}</td>
                      <td className="text-left">{order.status}</td>
                      <td className="text-left">${order.total}</td>
                      <td className="text-left">{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-rancho text-4xl mb-8 border-b border-stone-800 pb-4">
            Tus Favoritos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.length === 0 ? (
              <p className="text-stone-400 text-sm">No tienes favoritos</p>
            ) : (
              favorites.map((favorite) => (
                <BootCard key={favorite.id} bota={favorite} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
