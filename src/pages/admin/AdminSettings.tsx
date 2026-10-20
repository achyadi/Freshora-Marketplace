import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LocalhostModal } from '../../components/common/LocalhostModal';
import { 
  Settings, 
  RotateCcw, 
  Save, 
  ShieldCheck, 
  GraduationCap, 
  Sprout, 
  Info,
  Server,
  UserCheck,
  FileText,
  FolderArchive,
  Download,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  ExternalLink,
  Presentation,
  Sun,
  Moon
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { 
    currentUser,
    switchDemoRole,
    resetDemoData, 
    navigate,
    products,
    orders,
    showPresentationBanner,
    setShowPresentationBanner,
    theme,
    setTheme,
    addToast 
  } = useApp();

  const [marketName, setMarketName] = useState('Freshora Marketplace');
  const [tagline, setTagline] = useState('Segar dari Alam, Mudah Sampai di Rumah.');
  const [csPhone, setCsPhone] = useState('+62 812-3456-7890');
  const [minOrder, setMinOrder] = useState(20000);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(100000);
  const [operatingHours, setOperatingHours] = useState('06.00 - 21.00 WIB');
  const [isLocalhostModalOpen, setIsLocalhostModalOpen] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Pengaturan sistem toko berhasil disimpan.', 'success');
  };

  const steps = [
    { num: 1, title: 'Buka Homepage Freshora', route: '/', desc: 'Hero section, kategori buah & sayur, produk unggulan, jaminan kesegaran' },
    { num: 2, title: 'Katalog & Pencarian', route: '/products', desc: 'Filter kategori, cari nama komoditas, sortir harga termurah/termahal' },
    { num: 3, title: 'Login Pembeli Demo', action: () => switchDemoRole('buyer'), desc: 'Masuk sebagai akun pembeli demo (Sumanto)' },
    { num: 4, title: 'Keranjang & Checkout', route: '/cart', desc: 'Validasi stok, pilih kurir pendingin & metode pembayaran' },
    { num: 5, title: 'Riwayat Pesanan Pembeli', route: '/account', desc: 'Cek status pesanan awal (Menunggu Pembayaran / Diproses)' },
    { num: 6, title: 'Login Admin Dashboard', action: () => switchDemoRole('admin'), desc: 'Masuk dashboard terpisah administrator' },
    { num: 7, title: 'Dashboard & Statistik', route: '/admin/dashboard', desc: 'Cek total pesanan, grafik omzet, & notifikasi stok' },
    { num: 8, title: 'Tambah / Edit Produk', route: '/admin/products', desc: 'Ubah harga/stok atau tambah produk buah/sayur baru' },
    { num: 9, title: 'Kelola Status Pesanan', route: '/admin/orders', desc: 'Ubah status pesanan ke "Diproses" / "Dikirim" / "Selesai"' },
  ];

  return (
    <AdminLayout 
      activeNav="settings" 
      title="Pengaturan Sistem & Konfigurasi" 
      subtitle="Kelola parameter operasional pasar, utilitas sistem presentasi RPL, dan konfigurasi demonstrasi."
    >
      <div className="max-w-4xl space-y-6">
        
        {/* CARD UTAMA: Sistem & Mode Presentasi RPL (Dipindahkan dari Bilah Atas ke Pengaturan Sistem) */}
        <div className="bg-white rounded-3xl border-2 border-[#8BCF8B] shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#243528] via-[#2F4734] to-[#243528] text-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8BCF8B]/20 text-[#8BCF8B] font-bold text-xs border border-[#8BCF8B]/40">
                <GraduationCap className="w-4 h-4" />
                Sistem Pengujian & Mode Demonstrasi RPL
              </span>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <span>Peran: <strong className="text-white">{currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Tamu'}</strong></span>
                <span>•</span>
                <span>{products.length} Produk</span>
                <span>•</span>
                <span>{orders.length} Pesanan</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Pusat Kendali Demonstrasi Tugas RPL
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl leading-relaxed">
              Seluruh sistem pengujian, pergantian peran akun (Sumanto / Admin), skenario 9 langkah, dan paket ZIP localhost dikelola secara terpusat di sini agar halaman depan toko tetap bersih dan profesional.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Toggle Sakelar Visibilitas Bilah Atas */}
            <div className="p-4 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-bold text-sm text-[#243528]">
                  {showPresentationBanner ? (
                    <Eye className="w-4 h-4 text-[#4D9954]" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-[#718071]" />
                  )}
                  <span>Bilah Cepat Mode Presentasi di Bagian Atas Layar</span>
                </div>
                <p className="text-xs text-[#718071]">
                  {showPresentationBanner 
                    ? 'Bilah cepat saat ini AKTIF di bagian paling atas setiap halaman web.' 
                    : 'Bilah cepat saat ini DISEMBUNYIKAN. Tampilan toko menjadi bersih seperti marketplace asli.'}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    const next = !showPresentationBanner;
                    setShowPresentationBanner(next);
                    addToast(
                      next 
                        ? 'Bilah mode presentasi diaktifkan di bagian atas layar.' 
                        : 'Bilah mode presentasi disembunyikan. Kontrol tetap tersedia di menu Pengaturan Sistem ini.',
                      'info'
                    );
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    showPresentationBanner
                      ? 'bg-[#4D9954] text-white shadow-xs'
                      : 'bg-white border border-[#E1EBDD] text-[#243528] hover:border-[#8BCF8B]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${showPresentationBanner ? 'bg-[#8BCF8B] animate-pulse' : 'bg-gray-400'}`}></span>
                  <span>{showPresentationBanner ? 'Bilah Atas Aktif (Tampilkan)' : 'Bilah Atas Sembunyi (Matikan)'}</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Switchers & Action Buttons */}
            <div>
              <h4 className="text-xs font-bold text-[#718071] uppercase tracking-wider mb-3">
                Aksi Cepat & Pergantian Peran:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => switchDemoRole('buyer')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    currentUser?.role === 'buyer'
                      ? 'border-[#4D9954] bg-[#E4F4E4]/60 ring-2 ring-[#8BCF8B]/40'
                      : 'border-[#E1EBDD] bg-white hover:border-[#8BCF8B] hover:bg-[#F7FBF5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold">
                      <UserCheck className="w-4 h-4" />
                    </span>
                    {currentUser?.role === 'buyer' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#4D9954] text-white">
                        Aktif
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#243528]">Pembeli Demo (Sumanto)</h5>
                    <p className="text-[11px] text-[#718071] mt-0.5">pembeli@freshora.demo</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => switchDemoRole('admin')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    currentUser?.role === 'admin'
                      ? 'border-[#4D9954] bg-[#E4F4E4]/60 ring-2 ring-[#8BCF8B]/40'
                      : 'border-[#E1EBDD] bg-white hover:border-[#8BCF8B] hover:bg-[#F7FBF5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#243528] text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    {currentUser?.role === 'admin' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#4D9954] text-white">
                        Aktif
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#243528]">Administrator Toko</h5>
                    <p className="text-[11px] text-[#718071] mt-0.5">admin@freshora.demo</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLocalhostModalOpen(true)}
                  className="p-3.5 rounded-2xl border border-[#E1EBDD] bg-white hover:border-[#8BCF8B] hover:bg-[#F7FBF5] text-left transition-all flex flex-col justify-between gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <FolderArchive className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F7FBF5] border border-[#E1EBDD] text-[#4D9954]">
                      ~52 MB
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#243528] flex items-center gap-1">
                      Unduh ZIP Localhost
                    </h5>
                    <p className="text-[11px] text-[#718071] mt-0.5">Paket lengkap + panduan</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/rpl-docs')}
                  className="p-3.5 rounded-2xl border border-[#E1EBDD] bg-white hover:border-[#8BCF8B] hover:bg-[#F7FBF5] text-left transition-all flex flex-col justify-between gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#718071]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#243528]">Dokumen RPL & ERD</h5>
                    <p className="text-[11px] text-[#718071] mt-0.5">Arsitektur & use case</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/figma-sesi1')}
                  className="p-3.5 rounded-2xl border border-[#4D9954] bg-[#E4F4E4]/50 hover:bg-[#E4F4E4] text-left transition-all flex flex-col justify-between gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#4D9954] text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <Presentation className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#4D9954] text-white">
                      Minggu 1
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#243528]">Figma & PPT Sesi 1</h5>
                    <p className="text-[11px] text-[#718071] mt-0.5">Analisis masalah, Flowchart & ERD</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Skenario Alur Demonstrasi 9 Langkah */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-[#718071] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4D9954]" />
                  Skenario Demonstrasi Pengujian Aplikasi (9 Langkah Terpadu):
                </h4>
                <span className="text-[11px] text-[#718071]">
                  Klik langkah untuk langsung menuju fitur terkait
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    onClick={() => {
                      if (step.action) {
                        step.action();
                      } else if (step.route) {
                        navigate(step.route);
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:bg-white hover:shadow-xs cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#4D9954] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {step.num}
                        </span>
                        <h5 className="font-bold text-xs text-[#243528] group-hover:text-[#4D9954] transition-colors">
                          {step.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-[#718071] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-[#E1EBDD]/60 flex items-center justify-end text-[11px] font-bold text-[#4D9954] gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Langkah</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Demo Data Action */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-xs text-red-900 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-red-600" />
                  <span>Reset Seluruh Data Demonstrasi ke Kondisi Awal</span>
                </div>
                <p className="text-[11px] text-red-700">
                  Mengembalikan 80 katalog produk segar, 3 pesanan awal, dan riwayat demo ke pengaturan pabrik.
                </p>
              </div>
              <button
                type="button"
                onClick={resetDemoData}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Data Sekarang</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tema Tampilan Aplikasi (Dark Mode / Light Mode) */}
        <div className="bg-white p-6 rounded-3xl border border-[#E1EBDD] shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E1EBDD] gap-2">
            <div>
              <h3 className="font-bold text-base text-[#243528] flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-[#8BCF8B]" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>Tema Tampilan Aplikasi (Dark Mode / Light Mode)</span>
              </h3>
              <p className="text-xs text-[#718071]">
                Pilih tampilan gelap untuk suasana malam yang nyaman atau tampilan terang bernuansa hijau segar.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]/40 self-start sm:self-auto">
              {theme === 'dark' ? 'Mode Gelap Aktif' : 'Mode Terang Aktif'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setTheme('light');
                addToast('Tema berhasil diubah ke Mode Terang (Light Mode).', 'info');
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                theme === 'light'
                  ? 'border-[#4D9954] bg-[#E4F4E4]/60 ring-2 ring-[#8BCF8B]/40 shadow-xs'
                  : 'border-[#E1EBDD] bg-[#F7FBF5] hover:bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#243528]">Mode Terang (Light Mode)</h4>
                <p className="text-[11px] text-[#718071] mt-0.5">Warna hijau segar alami dan latar belakang lembut.</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('dark');
                addToast('Tema berhasil diubah ke Mode Gelap (Dark Mode).', 'info');
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                theme === 'dark'
                  ? 'border-[#8BCF8B] bg-[#1A3121] ring-2 ring-[#8BCF8B]/40 shadow-xs'
                  : 'border-[#E1EBDD] bg-[#121A14] text-white hover:border-[#8BCF8B]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#243528] text-[#8BCF8B] flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">Mode Gelap (Dark Mode)</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Nuansa hutan malam pekat dengan aksen emerald menyala.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Store Profile Settings Form */}
        <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-3xl border border-[#E1EBDD] shadow-2xs space-y-5">
          <h3 className="font-bold text-base text-[#243528] pb-3 border-b border-[#E1EBDD]">
            Identitas & Operasional Marketplace Freshora
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Nama Marketplace
              </label>
              <input
                type="text"
                value={marketName}
                onChange={(e) => setMarketName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Tagline Resmi
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                WhatsApp Customer Service
              </label>
              <input
                type="text"
                value={csPhone}
                onChange={(e) => setCsPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Jam Operasional Pengiriman
              </label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Batas Belanja Diskon Otomatis (Rp)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Batas Minimum Pemesanan (Rp)
              </label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E1EBDD] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Toko</span>
            </button>
          </div>
        </form>

        {/* Custom Hero Photo Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E1EBDD] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E1EBDD]">
            <div>
              <h3 className="font-bold text-base text-[#243528]">
                Foto Banner Hero Landing Page
              </h3>
              <p className="text-xs text-[#718071]">
                Pasang file gambar asli Anda (misal foto kiriman WhatsApp) tanpa perubahan atau filter AI sedikit pun.
              </p>
            </div>
            {localStorage.getItem('freshora_custom_hero_image') && (
              <span className="px-2.5 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]">
                Foto Kustom Aktif
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs flex items-center gap-2 shadow-2xs transition-all">
              <span>Pilih & Upload File Foto Asli</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    if (result) {
                      localStorage.setItem('freshora_custom_hero_image', result);
                      addToast('Foto asli Anda berhasil dipasang di landing page!', 'success');
                      window.location.reload();
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>

            {localStorage.getItem('freshora_custom_hero_image') && (
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('freshora_custom_hero_image');
                  addToast('Foto hero dikembalikan ke default.', 'info');
                  window.location.reload();
                }}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs font-semibold text-[#718071] hover:text-[#D9534F] hover:bg-red-50 transition-all"
              >
                Kembalikan Foto Bawaan
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Modal Unduh ZIP Localhost */}
      <LocalhostModal 
        isOpen={isLocalhostModalOpen} 
        onClose={() => setIsLocalhostModalOpen(false)} 
      />
    </AdminLayout>
  );
};
