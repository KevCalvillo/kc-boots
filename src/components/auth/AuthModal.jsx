"use client";
import { motion } from "framer-motion";
import Modal from "../Modal";
import Auth from "./Auth";

export default function AuthModal({
  isOpen,
  onClose,
  showRegisterForm,
  setShowRegisterForm,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        src="/rancho.webp"
        alt=""
        className="w-140 h-190 rounded-2xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Auth
          setModalOpen={onClose}
          showRegisterForm={showRegisterForm}
          setShowRegisterForm={setShowRegisterForm}
        />
      </motion.div>
    </Modal>
  );
}
