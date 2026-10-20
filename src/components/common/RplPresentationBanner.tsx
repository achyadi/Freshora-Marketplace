import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  UserCheck, 
  ShieldCheck, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ShoppingBag,
  Sparkles,
  FolderArchive,
  Settings,
  X,
  Presentation
} from 'lucide-react';
import { LocalhostModal } from './LocalhostModal';

export const RplPresentationBanner: React.FC = () => {
  const { 
    currentUser, 
    switchDemoRole, 
    resetDemoData, 
    navigate, 
    currentRoute,
    products,
    orders,
    showPresentationBanner,
    setShowPresentationBanner,
    addToast
  } = useApp();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isLocalhostModalOpen, setIsLocalhostModalOpen] = useState(false);

  const steps = [
    { num: 1, title: 'Buka Homepage Freshora', route: '/', desc: 'Hero section, kategori buah & sayur, produk unggulan, jaminan kesegaran' },
    { num: 2, title: 'Katalog & Pencarian', route: '/products', desc: 'Filter kategori, cari nama, sortir harga termurah/termahal' },
    { num: 3, title: 'Login Pembeli Demo', action: () => switchDemoRole('buyer'), desc: 'Masuk sebagai pembeli demo (Sumanto)' },
    { num: 4, title: 'Keranjang & Checkout', route: '/cart', desc: 'Validasi stok, pilih kurir dingin & metode pembayaran' },
    { num: 5, title: 'Riwayat Pesanan Pembeli', route: '/account', desc: 'Cek status pesanan awal (Menunggu)' },
    { num: 6, title: 'Login Admin Dashboard', action: () => switchDemoRole('admin'), desc: 'Masuk dashboard terpisah administrator' },
    { num: 7, title: 'Dashboard & Statistik', route: '/admin/dashboard', desc: 'Cek total pesanan, grafik omzet, & notifikasi stok rendah' },
    { num: 8, title: 'Tambah / Edit Produk', route: '/admin/products', desc: 'Ubah harga/stok atau tambah produk buah/sayur baru' },
    { num: 9, title: 'Kelola & Ubah Status Pesanan', route: '/admin/orders', desc: 'Ubah status pesanan ke "Diproses" / "Dikirim" / "Selesai"' },
  ];

  // If user chose to hide the top bar into settings (default):
  // We keep a sleek floating launcher button for quick access to Pengaturan Sistem
  if (!showPresentationBanner) {
    return (
      <>
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={() => navigate('/admin/settings')}
            className="px-3.5 py-2 rounded-full bg-[#243528]/95 hover:bg-[#243528] text-white text-xs font-semibold shadow-xl border border-[#8BCF8B]/40 hover:border-[#8BCF8B] flex items-center gap-2 transition-all hover:scale-105 backdrop-blur-xs group"
            title="Sistem & Alat Demonstrasi RPL telah dimasukkan ke Pengaturan Sistem. Klik untuk membuka."
          >
            <span className="w-2 h-2 rounded-full bg-[#8BCF8B] animate-pulse"></span>
            <Settings className="w-3.5 h-3.5 text-[#8BCF8B] group-hover:rotate-45 transition-transform" />
            <span className="text-[11px] font-bold text-white tracking-wide">Pengaturan Sistem</span>
            <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-white/70">RPL</span>
          </button>
        </div>

        <LocalhostModal 
          isOpen={isLocalhostModalOpen} 
          onClose={() => setIsLocalhostModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Top micro bar */}
      <aside aria-label="Mode Presentasi RPL" className="bg-[#243528] text-white text-xs border-b border-[#3B543F] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#8BCF8B]/20 text-[#8BCF8B] font-semibold text-[11px] border border-[#8BCF8B]/40">
              <GraduationCap className="w-3.5 h-3.5" />
              Mode Presentasi RPL
            </span>
            <span className="hidden sm:inline text-white/80">
              Peran Saat Ini: <strong className="text-white">{currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Tamu (Belum Login)'}</strong>
            </span>
            <span className="hidden md:inline text-white/50">•</span>
            <span className="hidden md:inline text-white/70">
              {products.length} Produk Segar • {orders.length} Pesanan Aktif
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switch Buttons */}
            <button
              onClick={() => switchDemoRole('buyer')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                currentUser?.role === 'buyer'
                  ? 'bg-[#8BCF8B] text-[#243528] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Ganti peran ke Pembeli Demo"
            >
              <UserCheck className="w-3 h-3" />
              Pembeli Demo
            </button>

            <button
              onClick={() => switchDemoRole('admin')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                currentUser?.role === 'admin'
                  ? 'bg-[#8BCF8B] text-[#243528] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Ganti peran ke Admin Demo"
            >
              <ShieldCheck className="w-3 h-3" />
              Admin Demo
            </button>

            {/* Link to Pengaturan Sistem */}
            <button
              onClick={() => navigate('/admin/settings')}
              className="px-2.5 py-1 rounded-md text-[11px] bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-all"
              title="Buka Pengaturan Sistem & Konfigurasi"
            >
              <Settings className="w-3 h-3 text-[#8BCF8B]" />
              <span className="hidden sm:inline">Pengaturan Sistem</span>
            </button>

            <button
              onClick={() => navigate('/figma-sesi1')}
              className="px-2.5 py-1 rounded-md text-[11px] bg-[#8BCF8B] text-[#243528] font-bold hover:bg-[#7abe7a] transition-all flex items-center gap-1 shadow-xs"
              title="Buka Figma, Flowchart, ERD & PPT Sesi 1"
            >
              <Presentation className="w-3 h-3" />
              <span>Sesi 1 (Figma)</span>
            </button>

            <button
              onClick={() => navigate('/rpl-docs')}
              className="px-2.5 py-1 rounded-md text-[11px] bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-all"
              title="Lihat Arsitektur, ERD & Use Case"
            >
              <FileText className="w-3 h-3" />
              <span className="hidden sm:inline">Dokumen</span> RPL
            </button>

            <button
              onClick={() => setIsLocalhostModalOpen(true)}
              className="px-2.5 py-1 rounded-md text-[11px] bg-[#8BCF8B] text-[#243528] font-bold hover:bg-[#7abe7a] transition-all flex items-center gap-1 shadow-xs"
              title="Unduh paket ZIP proyek untuk dijalankan di localhost"
            >
              <FolderArchive className="w-3 h-3" />
              <span className="hidden sm:inline">Unduh ZIP</span> Localhost
            </button>

            <button
              onClick={resetDemoData}
              className="px-2 py-1 rounded-md text-[11px] text-red-200 hover:text-white hover:bg-red-900/40 transition-all flex items-center gap-1"
              title="Reset data demo kembali ke nilai awal"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden lg:inline">Reset Demo</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-1 rounded-md bg-[#8BCF8B]/20 text-[#8BCF8B] hover:bg-[#8BCF8B]/30 font-medium flex items-center gap-1 transition-all"
              title="Buka panduan alur 9 langkah presentasi RPL"
            >
              <Sparkles className="w-3 h-3" />
              <span>Skenario Demo</span>
              {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Sembunyikan ke Pengaturan Sistem button */}
            <button
              onClick={() => {
                setShowPresentationBanner(false);
                addToast('Bilah sistem disembunyikan. Anda dapat membukanya kembali kapan saja melalui menu Pengaturan Sistem.', 'info');
              }}
              className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/20 transition-all ml-1"
              title="Sembunyikan bilah ini (Semua kontrol telah dimasukkan ke Pengaturan Sistem)"
              aria-label="Sembunyikan bilah"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Accordion panel showing the 9-step RPL presentation checklist */}
      {isOpen && (
        <div className="bg-white border-b border-[#E1EBDD] shadow-xl text-[#243528] animate-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E1EBDD]">
              <div>
                <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 text-[#243528]">
                  <GraduationCap className="w-5 h-5 text-[#4D9954]" />
                  Panduan Urutan Demonstrasi Pengujian Aplikasi (Tugas RPL)
                </h3>
                <p className="text-xs text-[#718071]">
                  Klik salah satu langkah di bawah untuk langsung menuju halaman atau tindakan terkait saat demonstrasi di depan dosen penguji.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/admin/settings')}
                  className="text-xs font-semibold px-3 py-1.5 bg-[#E4F4E4] border border-[#8BCF8B] rounded-lg hover:bg-[#8BCF8B]/40 text-[#243528] flex items-center gap-1"
                >
                  <Settings className="w-3 h-3 text-[#4D9954]" />
                  Buka di Pengaturan Sistem
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold px-3 py-1.5 bg-[#F7FBF5] border border-[#E1EBDD] rounded-lg hover:bg-[#E4F4E4] text-[#4D9954]"
                >
                  Tutup Panduan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps.map((step) => {
                const isActive = step.route ? currentRoute === step.route : false;
                return (
                  <div
                    key={step.num}
                    onClick={() => {
                      if (step.action) {
                        step.action();
                      } else if (step.route) {
                        navigate(step.route);
                      }
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all hover:scale-[1.01] ${
                      isActive
                        ? 'border-[#4D9954] bg-[#E4F4E4]/60 ring-2 ring-[#8BCF8B]/50'
                        : 'border-[#E1EBDD] bg-[#F7FBF5] hover:bg-white hover:border-[#8BCF8B]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#4D9954] text-white text-[11px] font-bold flex items-center justify-center">
                        {step.num}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-semibold text-[#4D9954] bg-white px-2 py-0.5 rounded-full border border-[#8BCF8B]">
                          Halaman Aktif
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#243528] mb-0.5">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#718071] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E1EBDD] flex flex-wrap items-center justify-between text-xs text-[#718071] gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#243528]">Kredensial Akun Presentasi:</span>
                <span className="bg-[#E4F4E4] text-[#243528] px-2 py-0.5 rounded font-mono text-[11px]">Admin: admin@freshora.demo</span>
                <span className="bg-[#E4F4E4] text-[#243528] px-2 py-0.5 rounded font-mono text-[11px]">Pembeli: pembeli@freshora.demo</span>
              </div>
              <button
                onClick={() => {
                  navigate('/rpl-docs');
                  setIsOpen(false);
                }}
                className="text-[#4D9954] font-semibold hover:underline flex items-center gap-1"
              >
                Buka Spesifikasi Lengkap & Entity Relationship Diagram (ERD) &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Unduh ZIP & Panduan Localhost */}
      <LocalhostModal 
        isOpen={isLocalhostModalOpen} 
        onClose={() => setIsLocalhostModalOpen(false)} 
      />
    </div>
  );
};
