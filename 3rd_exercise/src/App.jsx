import "./App.css";
import React, { useState } from "react";

function ParentComponent() {
  const [message, setMessage] = useState("");

  return (
    <>
      <h1>Parent</h1>
      <input placeholder="Message pour l'enfant" value={message} onChange={(e) => setMessage(e.target.value)} />
      <ChildComponent message={message} onMessageUpdate={setMessage} />
      <p>Message retourné par l'enfant : {message}</p>
    </>
  );
}

function ChildComponent({ message, onMessageUpdate }) {
  const [childMessage, setChildMessage] = useState(message);

  const handleChange = (e) => {
    setChildMessage(e.target.value);
    onMessageUpdate(e.target.value);
  };

  return (
    <>
      <h2>Enfant</h2>
      {message && <p>Message reçu : {message}</p>}
      <input placeholder="Modifier le message" value={childMessage} onChange={handleChange} />
    </>
  );
}

export default () => <ParentComponent />;
