import { useState } from "react";
import FilterBar from "../components/FilterBar";
import TodoItem from "../components/TodoItem";

// Props: todos dan fungsi-fungsi dari App
// State: filter (hanya dipakai di halaman ini)
export default function HomePage({ todos, onToggle, onDelete, onEdit }) {
  const [filter, setFilter] = useState("all");

  let visibleTodos = todos;
  if (filter === "active") {
    visibleTodos = todos.filter((t) => t.done === false);
  } else if (filter === "done") {
    visibleTodos = todos.filter((t) => t.done === true);
  }

  return (
    <div>
      <FilterBar filter={filter} onChange={setFilter} />
      {visibleTodos.length === 0 ? (
        <p>Belum ada kegiatan di daftar ini.</p>
      ) : (
        <ul>
          {visibleTodos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}