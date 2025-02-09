import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) alert("Connexion réussie");
  }

  return (
    <>
      <form>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" name="email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="mot de passe" name="password" />
        <button onClick={handleSubmit}>Se connecter</button>
      </form>

      {(!email || !password) && <span>Tous les champs sont requis</span>}
    </>
  );
}

export default App;
