"use client";
import { createContext, useState, useContext } from "react";
import { useCart } from "@/hooks/useCart";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const cartLogic = useCart();

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
