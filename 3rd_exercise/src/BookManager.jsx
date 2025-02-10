import React, { useState, useEffect } from "react";

const API_URL = "https://restapi.fr/api/books";

function BookManager() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : [data]))
      .catch((err) => setError(err.message));
  }, []);

  const addOrUpdateBook = async (e) => {
    e.preventDefault();

    if (!title || !author || !year) {
      setFormError("Tous les champs sont requis !");
      return;
    }

    const bookData = { title, author, year };

    try {
      const response = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'opération");

      const updatedBook = await response.json();

      if (editId) {
        setBooks(books.map((book) => (book._id === editId ? updatedBook : book)));
      } else {
        setBooks([...books, updatedBook]);
      }

      setTitle("");
      setAuthor("");
      setYear("");
      setEditId(null);
      setFormError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const editBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setEditId(book._id);
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Gestion de la bibliothèque</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={addOrUpdateBook}>
        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="number" placeholder="Année" value={year} onChange={(e) => setYear(e.target.value)} />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} ({book.year})<button onClick={() => editBook(book)}>Modifier</button>
            <button onClick={() => deleteBook(book._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManager;
