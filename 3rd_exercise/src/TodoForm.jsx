import { useState } from "react";
import { useTodos } from "./TodoContext";

export default function TodoForm() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;
    addTodo(input);
    setInput("");
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nouvelle tâche" />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
}
