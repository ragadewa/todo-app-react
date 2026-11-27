import { useState, useEffect } from "react";

const API_URL = 'https://dummyjson.com/todos';

export default function SuggestionsPage({ todos, onAdd }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Server membalas dengan status " + res.status);
        }
        const data = await res.json();
        if (!ignore) {
          setItems(data.todos);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.message === "Failed to fetch"
              ? "Tidak bisa terhubung ke server. Periksa koneksi internet."
              : err.message
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function handleRetry() {
    setLoading(true);
    setError("");
    setAttempt((prev) => prev + 1);
  }

  function handleAdd(item) {
    onAdd({
      text: item.todo,
      priority: "sedang",
      note: "Diimpor dari API (DummyJSON)",
    });
  }

  return (
    <div>
      <h2>Ide Kegiatan dari API</h2>

      {loading && <p>Memuat data...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>Gagal memuat data: {error}</p>
          <button onClick={handleRetry}>Coba lagi</button>
        </div>
      )}

      {!loading && !error && (
        <ul>
          {items.map((item) => {
            const exists = todos.some((t) => t.text === item.todo);
            return (
              <li key={item.id} style={{ marginBottom: "8px" }}>
                {item.todo}{" "}
                <button onClick={() => handleAdd(item)} disabled={exists}>
                  {exists ? "Sudah ditambahkan" : "Tambah ke daftar"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}