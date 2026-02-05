import { useState, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addToFavorites = async (product, userId) => {
    if (!userId) {
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

  const removeFromFavorites = async (productId, userId) => {
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

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  const toggleFavorite = async (product, userId) => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id, userId);
    } else {
      await addToFavorites(product, userId);
    }
  };

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
