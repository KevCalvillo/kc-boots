import Plus from "@/ui/icons/Add";
import { useAuth } from "@/context/AuthContext";
import Heart from "@/ui/icons/Heart";
export default function BootCard({ bota }) {
  const { addToCart, user, setModalOpen, setShowRegisterForm } = useAuth();

  function handleAddToFavorites(id){
    console.log('se agrego a favoritos '+id)
  }

  function verificaUser(product) {
    if (user) {
      addToCart(product, true);
    } else {
      setModalOpen(true);
      setShowRegisterForm(false);
    }
  }
  return (
    <div className="h-full flex flex-col max-w-xs rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] duration-300">
      <div className="relative bg-linear-to-br from-stone-400 to-stone-200 flex items-center justify-center p-10">
        <img
          src={bota.imageUrl}
          className="w-full h-60 object-contain transform"
          alt={bota.title}
        />
        <button onClick={()=>handleAddToFavorites(bota.id)}>
          <Heart className="absolute top-8 right-8 w-10 h-10 cursor-pointer hover:scale-110 transition-transform z-20 fill-[#95812f] " />
        </button>
      </div>

      <div className="relative z-10 -mt-6 p-6 flex flex-col flex-1 gap-2 text-stone-100 bg-[#1d1d1d] rounded-t-3xl">
        <h1 className="text-3xl font-bold font-rancho">{bota.title}</h1>

        <p className="text-sm line-clamp-2 flex-1 text-stone-400">
          {bota.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-sm uppercase font-bold text-primary">
              Precio
            </span>
            <span className="text-2xl">${bota.price}</span>
          </div>

          <button
            onClick={() => verificaUser(bota)}
            className="bg-primary p-3 rounded-xl hover:bg-primary-hover transition-colors cursor-pointer shadow-lg shadow-green-900/20 group"
          >
            <Plus className="w-8 h-8 group-hover:scale-110 transition-transform fill-bgprimary" />
          </button>
        </div>
      </div>
    </div>
  );
}
