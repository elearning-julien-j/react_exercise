import { useState } from "react";
import "./App.css";

function App() {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(!isVisible)}>Afficher / Cacher</button>

      {isVisible && <p>Contenu visible</p>}
    </>
  );
}

export default App;
