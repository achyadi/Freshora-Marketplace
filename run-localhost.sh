#!/usr/bin/env bash

echo "======================================================================="
echo "  FRESHORA MARKETPLACE - LAUNCHER LOCALHOST"
echo "  Platform Marketplace Buah & Sayur Segar"
echo "  Dibuat untuk Tugas Bu Tiara Cantik"
echo "======================================================================="
echo ""

# 1. Cek Node.js
if ! command -v node &> /dev/null; then
    echo "[GAGAL] Node.js belum terpasang di komputer Anda!"
    echo "Silakan unduh dan pasang Node.js (LTS v18 atau v20+) di https://nodejs.org/"
    exit 1
fi

echo "[BERHASIL] Node.js terdeteksi: $(node -v)"
echo ""

# 2. Cek npm install
if [ ! -d "node_modules" ]; then
    echo "[INFO] Mengunduh dependensi awal (npm install)..."
    npm install
else
    echo "[INFO] Dependensi sudah ada. Memverifikasi..."
    npm install
fi

echo ""
echo "======================================================================="
echo "  Server aktif! Buka browser Anda di salah satu alamat:"
echo "  -> http://localhost:3000"
echo "  -> http://localhost:5173"
echo ""
echo "  Akun Demo Siap Pakai:"
echo "  - Pembeli : pembeli@freshora.demo  (Nama: Sumanto)"
echo "  - Admin   : admin@freshora.demo    (Akses Dashboard Manajemen)"
echo ""
echo "  Tekan CTRL + C untuk mematikan server."
echo "======================================================================="
echo ""

npm run dev
