import "./App.css";
import React, { useState } from "react";

function ParentComponent() {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => setMessage(e.target.value.trim() ? e.target.value : "");

  return (
    <>
      <h1>Parent</h1>
      <input type="text" placeholder="Message pour l'enfant" value={message} onChange={handleMessageChange} />
      <ChildComponent message={message} setMessage={setMessage} />

      {message ? <p>Message retourné par l'enfant : {message}</p> : <p>Message vide</p>}
    </>
  );
}

function ChildComponent({ message, setMessage }) {
  const handleChildMessageChange = (e) => setMessage(e.target.value);

  return (
    <>
      <h1>Enfant</h1>
      {message && <p>Message reçu : {message}</p>}
      <input type="text" placeholder="Modifier le message" value={message} onChange={handleChildMessageChange} />
    </>
  );
}

export default () => <ParentComponent />;
