"use client";
import Header from "./Header";
import Modal from "./Modal";
import Auth from "../forms/Auth";
import MinusCircle from "@/ui/icons/Minus";
import { useAuth } from "@/context/AuthContext";
import CirclePlus from "@/ui/icons/CirclePlus";
import Delete from "@/ui/icons/Delete";

export default function NavbarLayout({ children }) {
  const {
    modalOpen,
    setModalOpen,
    showRegisterForm,
    setShowRegisterForm,
    cartModalOpen,
    setCartModalOpen,
    cart,
    decreaseQuantity,
    removeFromCart,
    addToCart,
    cancelCart,
    deletedItem,
    undoRemove,
  } = useAuth();

  return (
    <>
      <Header
        setModalOpen={setModalOpen}
        setShowRegisterForm={setShowRegisterForm}
        setCartModalOpen={setCartModalOpen}
      />
      {children}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} title="">
          <img src="/rancho.webp" alt="" className="w-140 h-190 rounded-2xl" />
          <Auth
            setModalOpen={setModalOpen}
            showRegisterForm={showRegisterForm}
            setShowRegisterForm={setShowRegisterForm}
          />
        </Modal>
      )}
      {cartModalOpen && (
        <Modal onClose={() => setCartModalOpen(false)}>
          {cart.length === 0 ? (
            <div className="text-center text-white text-2xl px-20 py-10">
              <h1>Carrito Vacio</h1>
            </div>
          ) : (
            <div className="p-10">
              <table className="w-full text-white text-2xl border-collapse">
                <thead>
                  <tr className="border-b border-stone-600 text-center">
                    <th className="px-10 py-5">Articulo</th>
                    <th className="px-10 py-5">Precio</th>
                    <th className="px-10 py-5">Cantidad</th>
                    <th className="px-10 py-5">Acciones</th>
                  </tr>
                </thead>
                <tbody className="overflow-hidden rounded-3xl">
                  {cart.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-[#141414a9] border-b border-gray-600"
                      >
                        <td className="px-10 py-5 flex items-center gap-10">
                          <div className="relative bg-linear-to-br from-stone-400 to-stone-200 flex items-center justify-center p-4 rounded-2xl">
                            <img
                              src={item.imageUrl}
                              className="w-full h-20 object-contain transform"
                              alt={item.title}
                            />
                          </div>
                          {item.title}
                        </td>
                        <td className="text-center ">$ {item.price} USD</td>
                        <td className="text-center ">{item.quantity}</td>
                        <td className="text-center space-x-3 ">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className=""
                          >
                            <MinusCircle className="w-6 h-6 hover:fill-green-600 hover:scale-110 transition-all duration-300 cursor-pointer " />
                          </button>
                          <button onClick={() => addToCart(item)}>
                            <CirclePlus className="w-6 h-6 hover:fill-green-600 hover:scale-110 transition-all duration-300 cursor-pointer " />
                          </button>
                          <button onClick={() => removeFromCart(item.id)}>
                            <Delete className="w-6 h-6 hover:fill-green-600 hover:scale-110 transition-all duration-300 cursor-pointer " />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-10 flex items-center justify-center gap-10">
                <button
                  onClick={() => {
                    cancelCart();
                    setCartModalOpen(false);
                  }}
                  className="text-2xl mt-5 bg-red-700 hover:bg-red-900 hover:scale-105 duration-300 text-white font-bold py-2 px-4 rounded transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button className="text-2xl mt-5 bg-green-800 hover:bg-green-900 hover:scale-105 duration-300 text-white font-bold py-2 px-7 rounded transition-all cursor-pointer">
                  Pagar
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {deletedItem && (
        <div className="fixed bottom-5 right-5 bg-stone-800 text-white p-4 rounded-lg shadow-lg flex items-center gap-4 animate-bounce-in z-50 text-2xl">
          <p>Se eliminó {deletedItem.title}</p>
          <button
            onClick={undoRemove}
            className="text-blue-400 font-bold hover:underline"
          >
            DESHACER
          </button>
        </div>
      )}
    </>
  );
}
