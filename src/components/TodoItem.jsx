import { useState } from "react";

// Props: todo, onToggle, onDelete, onEdit
// State: isEditing (lagi mode ubah atau tidak), draft (teks yang lagi diubah)
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function handleSave() {
    if (draft.trim() === "") return;
    onEdit(todo.id, draft.trim());
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(todo.text);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button onClick={handleSave}>Simpan</button>
        <button onClick={handleCancel}>Batal</button>
      </li>
    );
  }

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
      <button onClick={() => setIsEditing(true)}>Ubah</button>
      <button onClick={() => onDelete(todo.id)}>Hapus</button>
    </li>
  );
}