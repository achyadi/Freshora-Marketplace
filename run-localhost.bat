@echo off
title Freshora Marketplace - Localhost Runner
color 0A
echo =======================================================================
echo   FRESHORA MARKETPLACE - LAUNCHER LOCALHOST
echo   Platform Marketplace Buah & Sayur Segar
echo   Dibuat untuk Tugas Bu Tiara Cantik
echo =======================================================================
echo.

echo [1/3] Memeriksa instalasi Node.js pada komputer Anda...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [GAGAL] Node.js belum terpasang di komputer Anda!
    echo Silakan unduh dan pasang Node.js (LTS v18 atau v20+) di:
    echo https://nodejs.org/
    echo Setelah selesai dipasang, buka kembali file ini.
    echo.
    pause
    exit /b
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo [BERHASIL] Node.js terdeteksi: %NODE_VER%
echo.

echo [2/3] Memeriksa modul dan pustaka (npm install)...
if not exist "node_modules\" (
    echo Mengunduh paket modul pertama kali... Mohon tunggu sebentar.
    call npm install
) else (
    echo Modul node_modules sudah tersedia. Melakukan verifikasi cepat...
    call npm install
)

if %errorlevel% neq 0 (
    color 0C
    echo [PERINGATAN] npm install mengalami kendala. Mencoba melanjutkan...
)

echo.
echo [3/3] Menjalankan server pengembangan Freshora...
echo.
echo =======================================================================
echo   Server aktif! Buka browser Anda di salah satu alamat berikut:
echo   -^> http://localhost:3000
echo   -^> http://localhost:5173
echo.
echo   Akun Demo Siap Pakai:
echo   - Pembeli : pembeli@freshora.demo  (Nama: Sumanto)
echo   - Admin   : admin@freshora.demo    (Akses Dashboard Manajemen)
echo.
echo   Tekan [CTRL + C] di jendela ini jika ingin mematikan server.
echo =======================================================================
echo.

call npm run dev
pause
