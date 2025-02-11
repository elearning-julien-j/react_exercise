import React, { useState, useEffect } from "react";
import useFavorites from "./useFavorites";

const API_URL = "https://restapi.fr/api/articles";

export default function App() {
  const [articles, setArticles] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data) ? data : [data]));
  }, []);

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
