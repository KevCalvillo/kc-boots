import Plus from "@/ui/icons/Add";
import { useAuth } from "@/context/AuthContext";
import Heart from "@/ui/icons/Heart";
export default function BootCard({ bota }) {
  const { addToCart, user, setModalOpen, setShowRegisterForm } = useAuth();

  function verificaUser(product) {
    if (user) {
      addToCart(product, true);
    } else {
      setModalOpen(true);
      setShowRegisterForm(false);
    }
  }
  return (
    <div className="max-w-xs rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] duration-300">
      <div className="relative bg-linear-to-br from-stone-400 to-stone-200 flex items-center justify-center p-10">
        <img
          src={bota.imageUrl}
          className="w-full h-60 object-contain transform"
          alt={bota.title}
        />
        <Heart className="absolute top-8 right-8 w-8 h-8 cursor-pointer hover:scale-110 transition-transform z-20" />
      </div>

      <div className="relative z-10 -mt-6 p-6 flex flex-col gap-2 text-stone-100 bg-[#1d1d1d] rounded-t-3xl">
        <h1 className="text-2xl font-bold ">{bota.title}</h1>

        <p className="text-sm line-clamp-2">
          Calidad artesanal y durabilidad premium para cualquier terreno.
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold">Precio</span>
            <span className="text-2xl">${bota.price}</span>
          </div>

          <button
            onClick={() => verificaUser(bota)}
            className="bg-[#42763f] p-3 rounded-xl hover:bg-[#335331] transition-colors cursor-pointer shadow-lg shadow-green-900/20 group"
          >
            <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
