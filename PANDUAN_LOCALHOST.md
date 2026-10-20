# 🥬 Panduan Lengkap Menjalankan Freshora di Localhost (Komputer Sendiri)

> **Catatan Proyek:** Dibuat untuk Tugas Bu Tiara Cantik ❤️  
> Platform: Marketplace Buah & Sayur Segar Freshora (React 19 + TypeScript + Vite + Tailwind CSS)

---

## 📋 Prasyarat Sistem
Sebelum menjalankan aplikasi di komputer Anda, pastikan sudah terpasang:
1. **Node.js** versi 18 atau versi LTS terbaru (20+ direkomendasikan).  
   *Jika belum terpasang, unduh gratis di: [https://nodejs.org/](https://nodejs.org/)*
2. Peramban web modern (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).

---

## 🚀 Cara Menjalankan (Pilihan Cepat - 1 Klik)

### Untuk Pengguna Windows:
1. Ekstrak file `freshora-project.zip` ke folder di komputer Anda (misalnya `D:\freshora` atau di Desktop).
2. Masuk ke dalam folder hasil ekstrak.
3. Klik ganda (**Double Click**) file **`run-localhost.bat`**.
4. File batch akan otomatis memeriksa Node.js, mengunduh modul (`npm install`), dan menjalankan server (`npm run dev`).
5. Buka browser di: **`http://localhost:3000`** atau **`http://localhost:5173`**.

### Untuk Pengguna macOS / Linux:
1. Ekstrak file zip.
2. Buka Terminal di folder tersebut.
3. Jalankan perintah:
   ```bash
   bash run-localhost.sh
   ```
4. Buka browser di: **`http://localhost:3000`** atau **`http://localhost:5173`**.

---

## 🛠️ Cara Menjalankan Secara Manual (Terminal / Command Prompt)

Jika Anda ingin menjalankan secara manual langkah demi langkah:

### Langkah 1: Buka Terminal di Folder Proyek
- Di Windows: Buka folder proyek, tekan `Shift + Klik Kanan` pada area kosong, pilih **"Open in Terminal"** atau **"Open PowerShell window here"** (bisa juga ketik `cmd` di address bar Windows Explorer).
- Di macOS / Linux: Buka Terminal dan arahkan (`cd`) ke direktori proyek.

### Langkah 2: Pasang Pustaka Dependensi
Ketik perintah berikut lalu tekan Enter:
```bash
npm install
```
*Tunggu hingga proses pengunduhan dependensi selesai (membutuhkan koneksi internet untuk unduhan awal).*

### Langkah 3: Jalankan Server Pengembangan
Ketik perintah:
```bash
npm run dev
```

### Langkah 4: Buka di Browser
Buka peramban favorit Anda dan kunjungi:
```
http://localhost:3000
```
*(Atau alamat port yang ditampilkan pada terminal Anda, seperti `http://localhost:5173`)*.

---

## 👤 Akun Demo untuk Pengujian & Presentasi

Aplikasi telah dilengkapi data awal (80 produk segar asli, kategori lengkap, dan pesanan aktif). Anda bisa langsung masuk menggunakan akun pengujian:

| Peran (Role) | Email | Nama | Keterangan |
| :--- | :--- | :--- | :--- |
| **Pembeli (Buyer)** | `pembeli@freshora.demo` | **Sumanto** | Belanja produk, checkout, pilih kurir, lihat invoice |
| **Administrator** | `admin@freshora.demo` | **Admin Toko** | Akses penuh dashboard admin, kelola stok & ubah status pesanan |

> **Tips Presentasi Cepat:**  
> Pada bagian paling atas halaman (Top Bar Mode Presentasi RPL), terdapat tombol cepat **"Pembeli Demo"** dan **"Admin Demo"** untuk berganti akun secara instan tanpa perlu mengetik ulang password.

---

## 📦 Struktur Berkas Utama Proyek
```text
freshora/
├── public/                 # Aset statis & 80 foto asli buah & sayuran (/products/)
├── src/
│   ├── assets/             # Aset gambar & ilustrasi
│   ├── components/         # Komponen UI modular (Buyer, Admin, Common)
│   ├── context/            # Manajemen State Global (AppContext & LocalStorage)
│   ├── data/               # 80 Katalog produk lengkap & data inisialisasi
│   ├── pages/              # Halaman web (Beranda, Katalog, Checkout, Admin, dll.)
│   └── types/              # Definisi TypeScript interface & tipe data
├── PANDUAN_LOCALHOST.md    # Panduan lengkap ini
├── run-localhost.bat       # Launcher 1-klik untuk Windows
├── run-localhost.sh        # Launcher 1-klik untuk Mac/Linux
├── package.json            # Daftar dependensi & scripts
└── vite.config.ts          # Konfigurasi bundler Vite
```

---

## ❓ Kendala Umum (Troubleshooting)

1. **Port 3000 sedang terpakai?**  
   Vite secara otomatis akan memilih port alternatif (misalnya 3001 atau 5173). Cukup perhatikan link yang muncul di terminal setelah mengetik `npm run dev`.

2. **Perintah `node` atau `npm` tidak dikenali?**  
   Pastikan Anda telah mengunduh dan menginstal Node.js dari [nodejs.org](https://nodejs.org/), kemudian restart terminal/CMD Anda.

3. **Ingin mereset seluruh data kembali ke kondisi awal?**  
   Klik tombol **"Reset Demo"** pada bar Presentasi RPL di bagian paling atas aplikasi, atau bersihkan LocalStorage pada menu inspect browser (F12 -> Application -> Local Storage).
