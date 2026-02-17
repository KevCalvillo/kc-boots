"use client";
import Header from "./Header";
import AuthModal from "./auth/AuthModal";
import CartModal from "./cart/CartModal";
import DeletedItemNotification from "./cart/DeletedItem";
import { useAuth } from "@/context/AuthContext";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Header
          setModalOpen={setModalOpen}
          setShowRegisterForm={setShowRegisterForm}
          setCartModalOpen={setCartModalOpen}
        />

        {children}

        <Footer />

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

        <DeletedItemNotification
          deletedItem={deletedItem}
          onUndo={undoRemove}
        />
      </>
    );
  }
}
