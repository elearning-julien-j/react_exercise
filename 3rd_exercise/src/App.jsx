import React, { useState, useEffect } from "react";

const API_URL = "https://restapi.fr/api/books";

function BookManager() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : [data]))
      .catch((err) => setError(err.message));
  }, []);

  const addBook = async (e) => {
    e.preventDefault();

    // Vérification manuelle des champs
    if (!title || !author || !year) {
      setFormError("Tous les champs sont requis !");
      return;
    }

    const newBook = { title, author, year };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      const addedBook = await response.json();
      setBooks([...books, addedBook]);
      setTitle("");
      setAuthor("");
      setYear("");
      setFormError(""); // Réinitialiser le message d'erreur du formulaire
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Gestion de la bibliothèque</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={addBook}>
        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="number" placeholder="Année" value={year} onChange={(e) => setYear(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} ({book.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <BookManager />
    </div>
  );
}
