import { Link, useParams, useNavigate } from "react-router";

// Props: todos, onToggle, onDelete (dari App)
export default function DetailPage({ todos, onToggle, onDelete }) {
  const { id } = useParams(); // ambil :id dari alamat
  const navigate = useNavigate();

  // id dari alamat berupa TEKS, id di data berupa ANGKA, jadi dijadikan teks dulu
  const todo = todos.find((t) => String(t.id) === id);

  if (!todo) {
    return (
      <div>
        <p>Kegiatan tidak ditemukan.</p>
        <Link to="/">Kembali ke Beranda</Link>
      </div>
    );
  }

  function handleDelete() {
    onDelete(todo.id);
    navigate("/");
  }

  return (
    <div>
      <h2>{todo.text}</h2>
      <p>Status: {todo.done ? "Selesai" : "Belum selesai"}</p>
      <p>Prioritas: {todo.priority || "-"}</p>
      <p>Catatan: {todo.note || "-"}</p>

      <button onClick={() => onToggle(todo.id)}>
        {todo.done ? "Tandai belum selesai" : "Tandai selesai"}
      </button>
      <button onClick={handleDelete}>Hapus</button>
      <br />
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}