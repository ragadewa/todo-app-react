import { useState } from "react";

// Props: onAdd (fungsi dari App buat nambah kegiatan)
// State: text (isi kotak yang lagi diketik)
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis kegiatan..."
      />
      <button type="submit">Tambah</button>
    </form>
  );
}