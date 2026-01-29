"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);

  const emptyCartAlert = () => {
    Swal.fire({
      title: "¡Carrito Vacío!",
      text: "Agrega productos al carrito.",
      icon: "warning",
      timer: 2000,
      background: "#1d1d1de8",
      color: "#ffffff",
      showConfirmButton: false,
    });
  };

  const addToCartAlert = (product) => {
    Swal.fire({
      title: "¡Se agregó al carrito!",
      text: `Agregaste ${product}`,
      icon: "success",
      timer: 2000,
      background: "#1d1d1de8",
      color: "#ffffff",
      showConfirmButton: false,
    });
  };

  const addToCart = (product, showAlert) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === product.id);

      if (existe) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        if (showAlert) {
          addToCartAlert(product.title);
        }
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    setDeletedItem(itemToRemove);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    setTimeout(() => {
      setDeletedItem(null);
    }, 5000);
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const undoRemove = () => {
    if (deletedItem) {
      addToCart(deletedItem, false);
      setDeletedItem(null);
    }
  };

  const cancelCart = () => {
    setCart([]);
    emptyCartAlert();
  };

  const cleanCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    undoRemove,
    cancelCart,
    deletedItem,
    getCartTotal,
    getCartItemCount,
    emptyCartAlert,
    addToCartAlert,
    cleanCart
  };
}
