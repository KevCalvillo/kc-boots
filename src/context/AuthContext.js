"use client";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false); 

  return <AuthContext.Provider value={{ user, setUser, modalOpen, setModalOpen, showRegisterForm, setShowRegisterForm}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
