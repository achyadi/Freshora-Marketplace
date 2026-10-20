import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Database, 
  Layers, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Table,
  Workflow,
  Sparkles,
  ArrowRight,
  Presentation
} from 'lucide-react';

export const RplDocPage: React.FC = () => {
  const { switchDemoRole, navigate, products, orders, categories, users } = useApp();

  return (
    <div className="py-10 bg-[#F7FBF5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E1EBDD]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]/40">
                <GraduationCap className="w-3.5 h-3.5" />
                Spesifikasi Rekayasa Perangkat Lunak (RPL)
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528] mt-2">
                Dokumentasi & Arsitektur Sistem Marketplace Freshora
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchDemoRole('admin')}
                className="px-3.5 py-2 rounded-xl bg-[#4D9954] text-white text-xs font-bold hover:bg-[#3d7a43] transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Uji Dashboard Admin
              </button>
              <button
                onClick={() => switchDemoRole('buyer')}
                className="px-3.5 py-2 rounded-xl bg-[#8BCF8B] text-[#243528] text-xs font-bold hover:bg-[#7abe7a] transition-all flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                Uji Mode Pembeli
              </button>
              <button
                onClick={() => navigate('/figma-sesi1')}
                className="px-3.5 py-2 rounded-xl bg-[#243528] text-white text-xs font-bold hover:bg-[#1E2922] transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Presentation className="w-4 h-4 text-[#8BCF8B]" />
                Presentasi Sesi 1 (Figma & Diagram)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs text-[#718071]">
            <div>
              <span className="block font-bold text-[#243528] text-sm">{products.length} Entitas</span>
              Katalog Produk Aktif
            </div>
            <div>
              <span className="block font-bold text-[#243528] text-sm">{orders.length} Transaksi</span>
              Data Pesanan Tersimpan
            </div>
            <div>
              <span className="block font-bold text-[#243528] text-sm">{categories.length} Kategori</span>
              Struktur Komoditas
            </div>
            <div>
              <span className="block font-bold text-[#243528] text-sm">{users.length} Akun</span>
              Multi-Role (Admin/Buyer)
            </div>
          </div>
        </div>

        {/* Banner Khusus Sesi 1 / Minggu 1 */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#243528] via-[#2F4734] to-[#243528] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-[#3B543F]">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8BCF8B]/20 text-[#8BCF8B] text-xs font-bold border border-[#8BCF8B]/40">
              Agenda Presentasi Minggu 1 (Sesi 1)
            </span>
            <h3 className="font-bold text-base sm:text-lg text-white">
              Buka Desain Figma Interaktif, Diagram Flowchart & ERD Terpisah
            </h3>
            <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
              Sesuai instruksi sidang/tugas, presentasi Sesi 1 hanya menampilkan PPT dan Figma tanpa mendemokan live web terlebih dahulu.
            </p>
          </div>
          <button
            onClick={() => navigate('/figma-sesi1')}
            className="px-5 py-3 rounded-2xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs shadow-sm flex items-center gap-2 whitespace-nowrap self-start sm:self-auto transition-all"
          >
            <Presentation className="w-4 h-4" />
            <span>Tampilkan Figma & PPT Sesi 1 &rarr;</span>
          </button>
        </div>

        {/* 1. Alur Use Case Sistem */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#243528]">
                1. Matriks Aktor & Use Case
              </h2>
              <p className="text-xs text-[#718071]">
                Pembagian fungsi sistem berdasarkan peran pengguna (Role-Based Access Control)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Aktor Pembeli */}
            <div className="p-5 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E1EBDD]">
                <h3 className="font-bold text-sm text-[#243528] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#4D9954]" />
                  Aktor: Pembeli (Buyer)
                </h3>
                <span className="text-[11px] font-mono text-[#4D9954] bg-white px-2 py-0.5 rounded border border-[#8BCF8B]">
                  pembeli@freshora.demo
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#718071]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-01: Melihat katalog dan mencari komoditas buah/sayur</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-02: Memfilter produk berdasarkan kategori, harga, & keaslian organik</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-03: Menambahkan produk ke keranjang & validasi batas stok</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-04: Mengubah kuantitas item dan menghitung subtotal/ongkir</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-05: Melakukan checkout simulasi pembayaran (QRIS, VA, COD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-06: Memantau riwayat & perubahan status pesanan secara berkala</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-07: Membatalkan pesanan yang berstatus &quot;Menunggu&quot;</span>
                </li>
              </ul>
            </div>

            {/* Aktor Admin */}
            <div className="p-5 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E1EBDD]">
                <h3 className="font-bold text-sm text-[#243528] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4D9954]" />
                  Aktor: Administrator (Admin)
                </h3>
                <span className="text-[11px] font-mono text-[#4D9954] bg-white px-2 py-0.5 rounded border border-[#8BCF8B]">
                  admin@freshora.demo
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#718071]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-08: Mengakses dashboard metrik omzet, pesanan, & stok menipis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-09: Manajemen Produk (Create, Read, Update, Delete)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-10: Mengelola kategori komoditas segar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-11: Mengubah status pesanan (Menunggu &rarr; Diproses &rarr; Dikirim &rarr; Selesai)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-12: Melihat daftar pelanggan dan riwayat transaksi pembeli</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-13: Menghasilkan ringkasan laporan penjualan dan ekspor data CSV</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8F50] shrink-0" />
                  <span>UC-14: Reset data demonstrasi ke kondisi awal untuk presentasi</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 2. Skema Relasi Database (ERD) */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#243528]">
                2. Skema Relasi Database (Entity Relationship Diagram - ERD)
              </h2>
              <p className="text-xs text-[#718071]">
                Struktur 5 tabel relasional terhubung: users, categories, products, orders, order_items
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Table Users */}
            <div className="border border-[#E1EBDD] rounded-2xl p-4 bg-[#F7FBF5]">
              <div className="flex items-center justify-between font-mono font-bold text-xs text-[#243528] pb-2 border-b border-[#E1EBDD] mb-2">
                <span>Tabel: users</span>
                <span className="text-[#4D9954]">PK: id</span>
              </div>
              <ul className="text-[11px] font-mono text-[#718071] space-y-1">
                <li><strong className="text-[#243528]">id</strong>: VARCHAR (PK)</li>
                <li>name: VARCHAR</li>
                <li>email: VARCHAR (UNIQUE)</li>
                <li>role: ENUM(&apos;admin&apos;,&apos;buyer&apos;)</li>
                <li>phone: VARCHAR</li>
                <li>address: TEXT</li>
                <li>createdAt: TIMESTAMP</li>
              </ul>
            </div>

            {/* Table Categories */}
            <div className="border border-[#E1EBDD] rounded-2xl p-4 bg-[#F7FBF5]">
              <div className="flex items-center justify-between font-mono font-bold text-xs text-[#243528] pb-2 border-b border-[#E1EBDD] mb-2">
                <span>Tabel: categories</span>
                <span className="text-[#4D9954]">PK: id</span>
              </div>
              <ul className="text-[11px] font-mono text-[#718071] space-y-1">
                <li><strong className="text-[#243528]">id</strong>: VARCHAR (PK)</li>
                <li>name: VARCHAR</li>
                <li>slug: VARCHAR</li>
                <li>description: TEXT</li>
                <li>icon: VARCHAR</li>
              </ul>
            </div>

            {/* Table Products */}
            <div className="border border-[#E1EBDD] rounded-2xl p-4 bg-[#F7FBF5]">
              <div className="flex items-center justify-between font-mono font-bold text-xs text-[#243528] pb-2 border-b border-[#E1EBDD] mb-2">
                <span>Tabel: products</span>
                <span className="text-[#4D9954]">PK: id</span>
              </div>
              <ul className="text-[11px] font-mono text-[#718071] space-y-1">
                <li><strong className="text-[#243528]">id</strong>: VARCHAR (PK)</li>
                <li>name: VARCHAR</li>
                <li><strong className="text-[#4D9954]">categoryId</strong>: FK &rarr; categories</li>
                <li>price: DECIMAL(12,2)</li>
                <li>stock: INTEGER</li>
                <li>unit: VARCHAR</li>
                <li>origin: VARCHAR</li>
                <li>farmer: VARCHAR</li>
                <li>image: VARCHAR</li>
                <li>isOrganic: BOOLEAN</li>
              </ul>
            </div>

            {/* Table Orders */}
            <div className="border border-[#E1EBDD] rounded-2xl p-4 bg-[#F7FBF5] md:col-span-2">
              <div className="flex items-center justify-between font-mono font-bold text-xs text-[#243528] pb-2 border-b border-[#E1EBDD] mb-2">
                <span>Tabel: orders</span>
                <span className="text-[#4D9954]">PK: id</span>
              </div>
              <ul className="text-[11px] font-mono text-[#718071] grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <li><strong className="text-[#243528]">id</strong>: VARCHAR (PK)</li>
                <li>orderNumber: VARCHAR (UNIQUE)</li>
                <li><strong className="text-[#4D9954]">userId</strong>: FK &rarr; users</li>
                <li>customerName: VARCHAR</li>
                <li>customerPhone: VARCHAR</li>
                <li>customerAddress: TEXT</li>
                <li>shippingCourier: VARCHAR</li>
                <li>shippingCost: DECIMAL(10,2)</li>
                <li>paymentMethod: VARCHAR</li>
                <li>status: ENUM(&apos;Menunggu&apos;,&apos;Diproses&apos;,&apos;Dikirim&apos;,&apos;Selesai&apos;,&apos;Dibatalkan&apos;)</li>
                <li>subtotal: DECIMAL(12,2)</li>
                <li>total: DECIMAL(12,2)</li>
                <li>createdAt: TIMESTAMP</li>
              </ul>
            </div>

            {/* Table Order Items */}
            <div className="border border-[#E1EBDD] rounded-2xl p-4 bg-[#F7FBF5]">
              <div className="flex items-center justify-between font-mono font-bold text-xs text-[#243528] pb-2 border-b border-[#E1EBDD] mb-2">
                <span>Tabel: order_items</span>
                <span className="text-[#4D9954]">PK: id / composite</span>
              </div>
              <ul className="text-[11px] font-mono text-[#718071] space-y-1">
                <li><strong className="text-[#4D9954]">orderId</strong>: FK &rarr; orders</li>
                <li><strong className="text-[#4D9954]">productId</strong>: FK &rarr; products</li>
                <li>productName: VARCHAR</li>
                <li>price: DECIMAL(12,2)</li>
                <li>quantity: INTEGER</li>
                <li>unit: VARCHAR</li>
                <li>subtotal: DECIMAL(12,2)</li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. Skenario Pengujian 9 Langkah */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#243528]">
                3. Panduan Skenario Pengujian Presentasi Sidang / Tugas RPL
              </h2>
              <p className="text-xs text-[#718071]">
                Urutan demonstrasi fungsional langsung dari awal hingga akhir
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '1',
                title: 'Buka Homepage Freshora',
                detail: 'Tampilkan identitas merk, tagline “Segar dari Alam, Mudah Sampai di Rumah”, hero section, kategori, produk unggulan, dan jaminan mutu.',
                action: () => navigate('/'),
                label: 'Buka Beranda',
              },
              {
                step: '2',
                title: 'Tunjukkan Katalog & Pencarian Produk',
                detail: 'Tunjukkan fitur pencarian nama komoditas, filter kategori sayur/buah, filter harga, dan penyortiran.',
                action: () => navigate('/products'),
                label: 'Buka Katalog',
              },
              {
                step: '3',
                title: 'Login Sebagai Pembeli',
                detail: 'Gunakan akun demo pembeli (Sumanto - pembeli@freshora.demo). Tunjukkan navbar menyapa pembeli.',
                action: () => switchDemoRole('buyer'),
                label: 'Login Pembeli',
              },
              {
                step: '4',
                title: 'Tambahkan Produk ke Keranjang & Checkout Simulasi',
                detail: 'Pilih apel atau bayam, masukkan ke keranjang, atur kuantitas (cek validasi batas stok), pilih kurir pendingin & metode pembayaran lalu selesaikan transaksi.',
                action: () => navigate('/cart'),
                label: 'Buka Keranjang',
              },
              {
                step: '5',
                title: 'Buka Riwayat Pesanan Pembeli',
                detail: 'Buka halaman Akun Pembeli & tunjukkan pesanan baru telah tercatat dengan status awal "Menunggu".',
                action: () => navigate('/account'),
                label: 'Cek Pesanan Pembeli',
              },
              {
                step: '6',
                title: 'Logout & Login Sebagai Admin',
                detail: 'Keluar dari akun pembeli, masuk ke dashboard admin terpisah dengan kredensial admin@freshora.demo.',
                action: () => switchDemoRole('admin'),
                label: 'Masuk Dashboard Admin',
              },
              {
                step: '7',
                title: 'Tunjukkan Dashboard Admin',
                detail: 'Tampilkan statistik total omzet penjualan, total pesanan, grafik tren, tabel transaksi baru, dan daftar produk stok menipis.',
                action: () => navigate('/admin/dashboard'),
                label: 'Lihat Metrik Admin',
              },
              {
                step: '8',
                title: 'Tambahkan atau Edit Produk',
                detail: 'Buka menu Manajemen Produk. Tambah produk buah/sayur baru atau ubah harga & stok. Perubahan langsung tercermin di sisi pembeli.',
                action: () => navigate('/admin/products'),
                label: 'Kelola Produk',
              },
              {
                step: '9',
                title: 'Ubah Status Pesanan & Cek Perubahan Realtime',
                detail: 'Di Manajemen Pesanan admin, ubah status pesanan pembeli tadi dari "Menunggu" menjadi "Diproses" lalu "Dikirim". Beralih kembali ke akun pembeli untuk memverifikasi status terupdate.',
                action: () => navigate('/admin/orders'),
                label: 'Kelola Pesanan',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#8BCF8B] transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#4D9954] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#243528]">
                      Langkah {item.step}: {item.title}
                    </h4>
                    <p className="text-xs text-[#718071] mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <button
                  onClick={item.action}
                  className="px-4 py-2 rounded-xl bg-white border border-[#8BCF8B] text-[#4D9954] text-xs font-bold hover:bg-[#E4F4E4] transition-all shrink-0 flex items-center gap-1 self-end sm:self-center"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
