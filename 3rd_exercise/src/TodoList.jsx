import { useTodos } from "./TodoContext";

export default function TodoList() {
  const { todos, removeTodo } = useTodos();

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo} <button onClick={() => removeTodo(index)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}

// import { useState } from "react";

// export default function Child({ message, onMessageUpdate }) {
//   const [childMessage, setChildMessage] = useState(message);

//   const handleChange = (e) => {
//     setChildMessage(e.target.value);
//     onMessageUpdate(e.target.value);
//   };

//   return (
//     <div>
//       <h2>Enfant</h2>
//       {message && <p>Message reçu : {message}</p>}
//       <input
//         placeholder="Modifier le message"
//         value={childMessage}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }
