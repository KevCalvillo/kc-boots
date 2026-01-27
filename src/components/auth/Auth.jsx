"use client";
import { useState } from "react";
import LoginForm from "../../forms/Login";
import RegisterForm from "../../forms/Register";

export default function Auth({
  setModalOpen,
  showRegisterForm,
  setShowRegisterForm,
}) {
  return (
    <div className="p-10 pb-0 w-96">
      {showRegisterForm ? (
        <RegisterForm
          setModalOpen={setModalOpen}
          setShowRegisterForm={setShowRegisterForm}
        />
      ) : (
        <>
          <LoginForm
            setModalOpen={setModalOpen}
            setShowRegisterForm={setShowRegisterForm}
          />
        </>
      )}
    </div>
  );
}
