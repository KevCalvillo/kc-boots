import { useState, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos del servidor
  const fetchFavorites = useCallback(async (userId) => {
    if (!userId) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/favorites?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar a favoritos (en servidor y estado local)
  const addToFavorites = async (product, userId) => {
    if (!userId) {
      // Si no hay usuario, solo agregar localmente
      setFavorites((prev) => [...prev, product]);
      return;
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product.id }),
      });

      if (res.ok) {
        const savedProduct = await res.json();
        setFavorites((prev) => [...prev, savedProduct]);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Quitar de favoritos (en servidor y estado local)
  const removeFromFavorites = async (productId, userId) => {
    // Actualizar estado local inmediatamente
    setFavorites((prev) => prev.filter((item) => item.id !== productId));

    if (!userId) return;

    try {
      await fetch(`/api/favorites?userId=${userId}&productId=${productId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  // Verificar si un producto está en favoritos
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // Toggle favorito
  const toggleFavorite = async (product, userId) => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id, userId);
    } else {
      await addToFavorites(product, userId);
    }
  };

  // Limpiar favoritos (para logout)
  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    setFavorites,
    loading,
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
