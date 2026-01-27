"use client";
import Header from "./Header";
import AuthModal from "./auth/AuthModal";
import CartModal from "./cart/CartModal";
import DeletedItemNotification from "./cart/DeletedItem"
import { useAuth } from "@/context/AuthContext";

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

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        showRegisterForm={showRegisterForm}
        setShowRegisterForm={setShowRegisterForm}
      />

      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cart={cart}
        onDecrease={decreaseQuantity}
        onIncrease={addToCart}
        onRemove={removeFromCart}
        onCancel={cancelCart}
      />

      <DeletedItemNotification deletedItem={deletedItem} onUndo={undoRemove} />
    </>
  );
}
