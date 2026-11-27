// Props: todo (datanya), onToggle, onDelete (fungsi dari App)
// Belum punya state, nanti ditambah buat fitur ubah
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Hapus</button>
    </li>
  );
}