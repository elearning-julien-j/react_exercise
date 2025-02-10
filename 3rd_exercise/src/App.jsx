import { useState } from "react";
import { useReducer } from "react";

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
};

function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count > 0 ? state.count - 1 : 0 };
    case ACTIONS.RESET:
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h2>Compteur : {state.count}</h2>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>Incrémenter</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>Décrémenter</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>Réinitialiser</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Application de compteur</h1>
      <Counter />
    </div>
  );
}
