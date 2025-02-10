import { createContext, useState, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return <TodoContext value={{ todos, addTodo, deleteTodo }}>{children}</TodoContext>;
};

export const useTodos = () => useContext(TodoContext);
