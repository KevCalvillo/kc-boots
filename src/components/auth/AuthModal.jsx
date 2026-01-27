"use client";
import { motion } from "framer-motion";
import Modal from "../Modal";
import LoginForm from "../../forms/Login";
import RegisterForm from "../../forms/Register";

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
        <div className="p-10 pb-0 w-96">
          {showRegisterForm ? (
            <RegisterForm
              onClose={onClose}
              setShowRegisterForm={setShowRegisterForm}
            />
          ) : (
            <>
              <LoginForm
                onClose={onClose}
                setShowRegisterForm={setShowRegisterForm}
              />
            </>
          )}
        </div>
      </motion.div>
    </Modal>
  );
}
