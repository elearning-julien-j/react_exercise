import { useTodos } from "./TodoContext";

export default function TodoList() {
  const { todos, deleteTodo } = useTodos();

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
