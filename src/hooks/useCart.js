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

  const addToCart = (product, showAlert, size = null) => {
    const cartKey = size ? `${product.id}-${size}` : product.id;

    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.cartKey === cartKey);

      if (existe) {
        return prevCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        if (showAlert) {
          addToCartAlert(product.title);
        }
        return [...prevCart, { ...product, quantity: 1, size, cartKey }];
      }
    });
  };

  const removeFromCart = (cartKey) => {
    const itemToRemove = cart.find((item) => item.cartKey === cartKey);
    setDeletedItem(itemToRemove);
    setCart((prevCart) => prevCart.filter((item) => item.cartKey !== cartKey));

    setTimeout(() => {
      setDeletedItem(null);
    }, 5000);
  };

  const decreaseQuantity = (cartKey) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartKey === cartKey && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const undoRemove = () => {
    if (deletedItem) {
      addToCart(deletedItem, false, deletedItem.size);
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
    cleanCart,
  };
}
