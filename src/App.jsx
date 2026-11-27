import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  function addTodo(text) {
    const newTodo = { id: Date.now(), text: text, done: false };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  let visibleTodos = todos;
  if (filter === "active") {
    visibleTodos = todos.filter((t) => t.done === false);
  } else if (filter === "done") {
    visibleTodos = todos.filter((t) => t.done === true);
  }

  return (
    <div>
      <h1>Daftar Kegiatan</h1>
      <TodoForm onAdd={addTodo} />
      <FilterBar filter={filter} onChange={setFilter} />
      <ul>
        {visibleTodos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}