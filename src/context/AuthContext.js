"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
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
        setUser,
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

export function useAuth() {
  return useContext(AuthContext);
}
