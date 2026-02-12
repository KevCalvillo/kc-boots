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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[95%] md:w-full md:max-w-5xl"
    >
      <motion.div
        className="flex flex-col md:flex-row overflow-hidden"
        initial={false}
        animate={{
          height: showRegisterForm ? "85vh" : "65vh",
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          maxHeight: "85vh",
        }}
      >
        {/* LADO IZQUIERDO: IMAGEN (45% del ancho) */}
        <div className="relative hidden md:block md:w-[45%] overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src="/rancho.webp"
            alt="Rancho KC Boots"
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-transparent"></div>

          <div className="absolute bottom-12 left-10 right-10 text-white z-10">
            <h3 className="text-5xl font-rancho mb-4 text-white">Familia KC</h3>
            <p className="text-stone-300 font-roboto text-lg leading-relaxed">
              Únete a nuestra comunidad de auténticos conocedores y recibe
              acceso exclusivo a preventas.
            </p>
          </div>
        </div>

        {/* LADO DERECHO: FORMULARIO (55% del ancho) */}
        <div className="w-full md:w-[55%] bg-[#121212] flex flex-col relative">
          {/* Scroll container para el formulario */}
          <div className="flex-1 p-4 md:p-16 pt-4 md:pt-16">
            <motion.div
              key={showRegisterForm ? "register" : "login"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {showRegisterForm ? (
                <RegisterForm
                  onClose={onClose}
                  setShowRegisterForm={setShowRegisterForm}
                />
              ) : (
                <LoginForm
                  onClose={onClose}
                  setShowRegisterForm={setShowRegisterForm}
                />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
