# To-Do App React

Aplikasi daftar kegiatan sederhana (Tugas 3 Frontend).

## Fitur
- Tambah kegiatan
- Ubah kegiatan
- Hapus kegiatan
- Tandai selesai
- Filter: Semua / Aktif / Selesai
- Data tersimpan di localStorage

## Komponen
- App: menyimpan state todos dan filter
- TodoForm: input tambah kegiatan
- FilterBar: tombol filter
- TodoItem: satu baris kegiatan (centang, ubah, hapus)

## Cara Menjalankan
1. npm install
2. npm run dev
3. Buka http://localhost:5173

## Tugas 4: Routing, Form Validasi, dan API

Halaman:
- / : Beranda (daftar kegiatan + filter)
- /tambah : Form tambah kegiatan dengan validasi
- /todo/:id : Detail kegiatan
- /saran : Ide kegiatan dari API (JSONPlaceholder)

Teknologi: React, Vite, React Router, localStorage
API: https://dummyjson.com/todos