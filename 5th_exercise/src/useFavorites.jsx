import { useState, useEffect } from "react";

const FAVORITES_URL = "https://restapi.fr/api/favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(FAVORITES_URL)
      .then((res) => res.json())
      .then((data) => setFavorites(Array.isArray(data) ? data.map((fav) => fav.articleId) : []));
  }, []);

  const addFavorite = async (articleId) => {
    await fetch(FAVORITES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    });
    setFavorites([...favorites, articleId]);
  };

  const removeFavorite = async (articleId) => {
    await fetch(`${FAVORITES_URL}?articleId=${articleId}`, { method: "DELETE" });
    setFavorites(favorites.filter((fav) => fav !== articleId));
  };

  const toggleFavorite = async (articleId) => {
    if (favorites.includes(articleId)) {
      await removeFavorite(articleId);
    } else {
      await addFavorite(articleId);
    }
  };

  return { favorites, toggleFavorite };
}
