import { useState } from "react";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    const newTodo = { id: Date.now(), text: text, done: false };
    setTodos([...todos, newTodo]);
  }

  return (
    <div>
      <h1>Daftar Kegiatan</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}