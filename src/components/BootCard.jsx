import { useAuth } from "@/context/AuthContext";
import Heart from "@/ui/icons/Heart";
import Link from "next/link";

export default function BootCard({ bota }) {
  const {
    user,
    setModalOpen,
    setShowRegisterForm,
    toggleFavorite,
    isFavorite,
  } = useAuth();

  function verificaFavoritos(e, bota) {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleFavorite(bota);
    } else {
      setModalOpen(true);
      setShowRegisterForm(false);
    }
  }

  const isInFavorites = isFavorite(bota.id);

  return (
    <Link href={`/boots/${bota.slug}`}>
      <div className="h-full flex flex-col w-42 md:w-70 lg:w-80 mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] duration-300 cursor-pointer">
        <div className="relative bg-linear-to-br from-stone-400 to-stone-200 flex items-center justify-center md:p-12 py-8">
          <img
            src={bota.imageUrl}
            className="w-full md:h-50 h-30 object-contain transform"
            alt={bota.title}
          />
        </div>

        <div className="relative z-10 -mt-6 p-6 flex flex-col flex-1 gap-2 text-stone-100 bg-[#1d1d1d] rounded-t-3xl">
          <h1 className="md:text-2xl text-xl font-bold font-rancho">
            {bota.title}
          </h1>

          <p className="md:text-sm text-[10px] line-clamp-2 flex-1 text-stone-400">
            {bota.description}
          </p>

          <div className="flex justify-between items-center mt-auto pt-2">
            <div className="flex flex-col">
              <span className="lg:text-sm md:text-xs text-[10px] uppercase font-bold text-primary">
                Precio
              </span>
              <span className="lg:text-2xl md:text-xl text-[16px]">
                ${bota.price}
              </span>
            </div>

            <button
              onClick={(e) => verificaFavoritos(e, bota)}
              className="lg:p-4 md:p-2 p-2 rounded-xl hover:scale-110 transition-all cursor-pointer group"
            >
              <Heart
                className={`lg:size-8 md:size-6 size-5 stroke-2 stroke-[#95812f] transition-colors ${isInFavorites ? "fill-primary" : "fill-transparent"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
