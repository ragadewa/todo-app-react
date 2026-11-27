import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import SuggestionsPage from "./pages/SuggestionsPage";

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

  function addTodo(data) {
    const newTodo = {
      id: Date.now(),
      text: data.text,
      priority: data.priority,
      note: data.note,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

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
        <NavLink to="/saran" style={navStyle}>
          Ide dari API
        </NavLink>
        <NavLink to="/tambah" style={navStyle}>
          Tambah
        </NavLink>
        <NavLink end to="/" style={navStyle}>
          Beranda
        </NavLink>
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
        <Route path="/tambah" element={<AddPage onAdd={addTodo} />} />
        <Route
          path="/todo/:id"
          element={
            <DetailPage
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          }
        />
        <Route
          path="/saran"
          element={<SuggestionsPage todos={todos} onAdd={addTodo} />}
        />
        <Route
          path="*"
          element={
            <p>
              Halaman tidak ditemukan. <Link to="/">Kembali ke Beranda</Link>
            </p>
          }
        />
      </Routes>
    </div>
  );
}