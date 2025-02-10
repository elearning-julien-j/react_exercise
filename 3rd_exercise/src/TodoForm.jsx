import { useState } from "react";
import { useTodos } from "./TodoContext";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
}
