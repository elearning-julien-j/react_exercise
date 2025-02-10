import React, { useState, useEffect } from "react";
import useLoading from "./useLoading";

const API_URL = "https://restapi.fr/api/users?delay=3";

export default function App() {
  const [users, setUsers] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    startLoading();
    setError(null);

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : [data]))
      .catch(() => setError("Erreur lors du chargement des utilisateurs"))
      .finally(() => stopLoading());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.nomComplet}</li>
          ))}
        </ul>
      )}
      <button onClick={fetchUsers}>Recharger les utilisateurs</button>
    </div>
  );
}
