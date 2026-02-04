"use client";
import { useAuth } from "@/context/AuthContext";
import Edit from "@/ui/icons/Edit";
import { Mail, Phone, MapPin, Building2, House  } from "lucide-react";

function ProfilePage() {
  const { user } = useAuth();

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
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
          <h1 className="text-9xl md:text-8xl font-rancho">
            Perfil
            <p className="text-2xl text-primary tracking-widest">
              Aqui puedes ver tus ordenes y editar tus datos.
            </p>
          </h1>
        </div>

        <div className="flex gap-12">
          <div className="w-1/3 bg-[#121212] p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="flex items-center gap-8 mb-8 border-b border-stone-800 pb-4">
              <img
                src="https://placehold.co/100x100"
                className="w-24 h-24 rounded-2xl"
                alt=""
              />
              <div>
                <h1 className="font-rancho text-4xl">{user.name}</h1>
                <p className="text-stone-400 text-sm mt-1 font-roboto">
                  {user.id}
                </p>
              </div>

            </div>

            <div className="flex items-center text-left gap-2">
              <ul>
                <li className="flex items-center gap-2"><Mail className="w-5 h-5 stroke-primary" /> Email: {user.email} <button className="hover:text-primary transition-colors hover:scale-110 duration-300"><Edit className="w-5 h-5 stroke-primary" /></button></li>
                <li className="flex items-center gap-2"><Phone className="w-5 h-5 stroke-primary" /> Telefono: {user.phone} <button className="hover:text-primary transition-colors hover:scale-110 duration-300"><Edit className="w-5 h-5 stroke-primary" /></button></li>
                <li className="flex items-center gap-2"><House className="w-5 h-5 stroke-primary" /> Direccion: {user.address} <button className="hover:text-primary transition-colors hover:scale-110 duration-300"><Edit className="w-5 h-5 stroke-primary" /></button></li>
                <li className="flex items-center gap-2"><Building2 className="w-5 h-5 stroke-primary" /> Ciudad: {user.city} <button className="hover:text-primary transition-colors hover:scale-110 duration-300"><Edit className="w-5 h-5 stroke-primary" /></button></li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 stroke-primary" /> Estado: {user.state} <button className="hover:text-primary transition-colors hover:scale-110 duration-300"><Edit className="w-5 h-5 stroke-primary" /></button></li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 stroke-primary" /> CP: {user.zip} <button className="hover:text-primary transition-colors hover:scale-110 duration-300"><Edit className="w-5 h-5 stroke-primary" /></button></li>
              </ul>
            </div>
            
          </div>
          <div className="w-2/3 bg-[#121212] p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <h2 className="font-rancho text-4xl mb-8 border-b border-stone-800 pb-4">
              Tus Ordenes
            </h2>
            <p className="text-stone-400 text-sm mt-1">{user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
