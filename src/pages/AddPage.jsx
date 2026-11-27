import { useState } from "react";
import { useNavigate } from "react-router";

// Fungsi pemeriksa: menerima isi form, mengembalikan daftar pesan error
function validate(values) {
  const errors = {};
  const text = values.text.trim();

  if (text === "") {
    errors.text = "Judul kegiatan wajib diisi.";
  } else if (text.length < 3) {
    errors.text = "Judul minimal 3 karakter.";
  } else if (text.length > 50) {
    errors.text = "Judul maksimal 50 karakter.";
  }

  if (values.priority === "") {
    errors.priority = "Pilih salah satu prioritas.";
  }

  if (values.note.length > 100) {
    errors.note = "Catatan maksimal 100 karakter.";
  }

  return errors;
}

// Props: onAdd (fungsi dari App)
// State: form (isi kolom), errors (pesan error)
export default function AddPage({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ text: "", priority: "", note: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = validate(form);
    setErrors(result);
    if (Object.keys(result).length > 0) return; // ada error, berhenti

    onAdd({
      text: form.text.trim(),
      priority: form.priority,
      note: form.note.trim(),
    });
    navigate("/"); // pindah ke Beranda
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Tambah Kegiatan</h2>

      <div>
        <label htmlFor="text">Judul kegiatan</label>
        <br />
        <input id="text" name="text" value={form.text} onChange={handleChange} />
        {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}
      </div>

      <div>
        <label htmlFor="priority">Prioritas</label>
        <br />
        <select
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="">-- Pilih prioritas --</option>
          <option value="rendah">Rendah</option>
          <option value="sedang">Sedang</option>
          <option value="tinggi">Tinggi</option>
        </select>
        {errors.priority && <p style={{ color: "red" }}>{errors.priority}</p>}
      </div>

      <div>
        <label htmlFor="note">Catatan (opsional)</label>
        <br />
        <textarea id="note" name="note" value={form.note} onChange={handleChange} />
        {errors.note && <p style={{ color: "red" }}>{errors.note}</p>}
      </div>

      <button type="submit">Simpan</button>
    </form>
  );
}