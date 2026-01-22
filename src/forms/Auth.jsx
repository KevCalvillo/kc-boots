"use client";
import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";


export default function Auth({ setModalOpen }) {
  const [showRegisterForm, setShowRegisterForm] = useState(true);

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







