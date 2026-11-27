import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router";
import HomePage from "./pages/HomePage";

function navStyle({ isActive }) {
  return { fontWeight: isActive ? "bold" : "normal", marginRight: "12px" };
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  return (
    <div>
      <h1>Daftar Kegiatan</h1>
      <nav>
        <NavLink to="/" style={navStyle}>Beranda</NavLink>
      </nav>
      <hr />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          }
        />
      </Routes>
    </div>
  );
}