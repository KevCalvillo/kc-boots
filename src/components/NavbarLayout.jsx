"use client"; // Indispensable porque usamos useState
import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import Auth from "../forms/Auth";
import { useAuth } from "@/context/AuthContext";

export default function NavbarLayout({ children }) {
  const { modalOpen, setModalOpen, showRegisterForm, setShowRegisterForm } =
    useAuth();

  return (
    <>
      <Header
        setModalOpen={setModalOpen}
        setShowRegisterForm={setShowRegisterForm}
      />
      {children}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} title="">
          <img src="/rancho.webp" alt="" className="w-140 h-190 rounded-2xl" />
          <Auth
            setModalOpen={setModalOpen}
            showRegisterForm={showRegisterForm}
            setShowRegisterForm={setShowRegisterForm}
          />
        </Modal>
      )}
    </>
  );
}
