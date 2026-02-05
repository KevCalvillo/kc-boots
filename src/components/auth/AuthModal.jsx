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
    // CAMBIO CLAVE: w-[95%] para móviles, max-w-5xl para escritorio.
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[95%] md:w-full md:max-w-5xl"
    >
      <div className="flex flex-col md:flex-row h-[85vh] md:h-[650px]">
        {/* LADO IZQUIERDO: IMAGEN (45% del ancho) */}
        <div className="relative hidden md:block md:w-[45%] h-full overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>

          <div className="absolute bottom-12 left-10 right-10 text-white z-10">
            <h3 className="text-5xl font-rancho mb-4 text-white">
              Familia KC
            </h3>
            <p className="text-stone-300 font-roboto text-lg leading-relaxed">
              Únete a nuestra comunidad de auténticos conocedores y recibe
              acceso exclusivo a preventas.
            </p>
          </div>
        </div>

        {/* LADO DERECHO: FORMULARIO (55% del ancho) */}
        <div className="w-full md:w-[55%] bg-[#121212] flex flex-col relative">
          {/* Scroll container para el formulario */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 pt-16">
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
      </div>
    </Modal>
  );
}
