"use client";
import { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null)

  const addToCart = (product, showAlert) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === product.id);

      if (existe) {
        return prevCart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        if(showAlert)
          Swal.fire({
            title: "¡Se agrego al carrito!",
            text: `Agregaste ${product.title}`,
            icon: "success",
            timer: 2000,
            background: "#1d1d1de8",
            color: "#ffffff",
            showConfirmButton: false,
          });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const undoRemove = () => {
    if(deletedItem){
      addToCart(deletedItem,false)
      setDeletedItem(null)
    }

  }

  const removeFromCart = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    setDeletedItem(itemToRemove);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    setTimeout(() => {
      setDeletedItem(null);
    }, 5000);
  };;

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const cancelCart = () => {
    setCart([]);
    Swal.fire({
      title: "¡Carrito Vacio!",
      text: `Agrega productos al carrito nuevamente.`,
      icon: "warning",
      timer: 2000,
      background: "#1d1d1de8",
      color: "#ffffff",
      showConfirmButton: false,
    });
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
        cart,
        setCart,
        addToCart,
        cartModalOpen,
        setCartModalOpen,
        removeFromCart,
        decreaseQuantity,
        cancelCart,
        deletedItem,
        undoRemove
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
