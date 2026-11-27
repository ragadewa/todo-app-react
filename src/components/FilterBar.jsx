// Props: filter (pilihan sekarang), onChange (fungsi dari App)
// Tidak punya state sendiri
export default function FilterBar({ filter, onChange }) {
  return (
    <div>
      <button onClick={() => onChange("all")} disabled={filter === "all"}>
        Semua
      </button>
      <button onClick={() => onChange("active")} disabled={filter === "active"}>
        Aktif
      </button>
      <button onClick={() => onChange("done")} disabled={filter === "done"}>
        Selesai
      </button>
    </div>
  );
}