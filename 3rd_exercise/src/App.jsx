import "./App.css";
import { TodoProvider } from "./TodoContext";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function App() {
  return (
    <TodoProvider>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </TodoProvider>
  );
}
