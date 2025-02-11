import React, { useState, useEffect } from "react";

const API_URL = "https://restapi.fr/api/articles";
const FAVORITES_URL = "https://restapi.fr/api/favorites";
const GENERATOR_URL = "https://restapi.fr/generator";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fonction pour générer des articles s'il n'y en a pas
  const generateArticlesIfEmpty = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!data || (Array.isArray(data) && data.length === 0)) {
        await fetch(GENERATOR_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            times: 5,
            resourceName: "articles",
            title: "sentence",
            content: "paragraph",
          }),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des articles :", error);
    }
  };

  useEffect(() => {
    const fetchArticlesAndFavorites = async () => {
      await generateArticlesIfEmpty();

      try {
        const articlesRes = await fetch(API_URL);
        const articlesData = await articlesRes.json();
        setArticles(Array.isArray(articlesData) ? articlesData : [articlesData]);

        const favoritesRes = await fetch(FAVORITES_URL);
        const favoritesData = await favoritesRes.json();
        setFavorites(Array.isArray(favoritesData) ? favoritesData.map((fav) => fav.articleId) : []);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchArticlesAndFavorites();
  }, []);

  const addFavorite = async (articleId) => {
    try {
      await fetch(FAVORITES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });

      setFavorites([...favorites, articleId]);
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };

  const removeFavorite = async (articleId) => {
    try {
      await fetch(`${FAVORITES_URL}?articleId=${articleId}`, { method: "DELETE" });

      setFavorites(favorites.filter((fav) => fav !== articleId));
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  const toggleFavorite = async (articleId) => {
    if (favorites.includes(articleId)) {
      await removeFavorite(articleId);
    } else {
      await addFavorite(articleId);
    }
  };

  return (
    <div>
      <h2>Liste des articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            {article.title}
            <button onClick={() => toggleFavorite(article._id)}>{favorites.includes(article._id) ? "❤️" : "🖤"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
