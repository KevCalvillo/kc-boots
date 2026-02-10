"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

const AuthContext = createContext();

function AuthContextInner({ children }) {
  const { data: session, status } = useSession();
  const user = session?.user || null;

  const [modalOpen, setModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const cartLogic = useCart();
  const favoritesLogic = useFavorites();

  useEffect(() => {
    if (user?.id) {
      favoritesLogic.fetchFavorites(user.id);
    } else {
      favoritesLogic.clearFavorites();
    }
  }, [user?.id]);

  const toggleFavoriteWithUser = (product) => {
    return favoritesLogic.toggleFavorite(product, user?.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        modalOpen,
        setModalOpen,
        showRegisterForm,
        setShowRegisterForm,
        cartModalOpen,
        setCartModalOpen,
        ...cartLogic,
        ...favoritesLogic,
        toggleFavorite: toggleFavoriteWithUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AuthContextInner>{children}</AuthContextInner>
    </SessionProvider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
