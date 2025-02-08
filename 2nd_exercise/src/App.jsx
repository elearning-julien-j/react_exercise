import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const removeTask = (index) => setTasks(tasks.filter((_, idx) => idx !== index));

  function addTask() {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: crypto.randomUUID(), task }]);
      setTask("");
    }
  }

  return (
    <>
      <ul>
        {tasks.map((obj, index) => (
          <li key={obj.id}>
            {obj.task} <button onClick={() => removeTask(index)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <div>
        <input type="text" placeholder="nouvelle tâche" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTask}>Ajouter</button>
      </div>
    </>
  );
}

export default App;
