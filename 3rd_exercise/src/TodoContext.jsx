import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (todo.trim() === "") return;
    setTodos([...todos, todo]);
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  return useContext(TodoContext);
}
