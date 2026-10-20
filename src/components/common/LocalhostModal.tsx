import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Download, 
  Terminal, 
  Check, 
  Copy, 
  X, 
  Laptop, 
  FolderArchive, 
  FileCode, 
  Upload, 
  HelpCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface LocalhostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalhostModal: React.FC<LocalhostModalProps> = ({ isOpen, onClose }) => {
  const { products, orders, currentUser, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'download' | 'guide' | 'data'>('download');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    addToast('Perintah berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // Export current store state as JSON backup
  const handleExportData = () => {
    try {
      const backupData = {
        exportedAt: new Date().toISOString(),
        appName: 'Freshora Marketplace',
        user: currentUser,
        productsCount: products.length,
        ordersCount: orders.length,
        freshora_products: localStorage.getItem('freshora_products'),
        freshora_cart: localStorage.getItem('freshora_cart'),
        freshora_orders: localStorage.getItem('freshora_orders'),
        freshora_users: localStorage.getItem('freshora_users'),
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `freshora-backup-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('Data toko berhasil diekspor!', 'success');
    } catch {
      addToast('Gagal mengekspor data.', 'error');
    }
  };

  // Import store state from JSON
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (parsed.freshora_products) {
          localStorage.setItem('freshora_products', parsed.freshora_products);
        }
        if (parsed.freshora_cart) {
          localStorage.setItem('freshora_cart', parsed.freshora_cart);
        }
        if (parsed.freshora_orders) {
          localStorage.setItem('freshora_orders', parsed.freshora_orders);
        }
        if (parsed.freshora_users) {
          localStorage.setItem('freshora_users', parsed.freshora_users);
        }

        addToast('Data toko berhasil diimpor! Halaman akan dimuat ulang...', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch {
        addToast('Format file JSON tidak valid.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#E1EBDD] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#243528] via-[#2F4734] to-[#243528] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8BCF8B]/20 text-[#8BCF8B] text-xs font-bold border border-[#8BCF8B]/40 flex items-center gap-1.5">
              <FolderArchive className="w-3.5 h-3.5" />
              Paket Proyek Lengkap (ZIP)
            </span>
            <span className="text-white/60 text-xs">• Siap Localhost</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Unduh & Jalankan di Localhost
          </h3>
          <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-lg">
            Ekspor seluruh kode sumber, konfigurasi Vite, 80 foto asli buah & sayuran, serta skrip launcher otomatis 1-klik.
          </p>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-5 border-t border-white/10 pt-4">
            <button
              onClick={() => setActiveTab('download')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'download'
                  ? 'bg-[#8BCF8B] text-[#243528] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              Unduh ZIP Proyek
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-[#8BCF8B] text-[#243528] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Panduan Menjalankan
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'data'
                  ? 'bg-[#8BCF8B] text-[#243528] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Impor / Ekspor Data
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#243528]">
          {activeTab === 'download' && (
            <div className="space-y-5">
              {/* Main Download Card */}
              <div className="p-5 rounded-2xl bg-[#F7FBF5] border-2 border-[#8BCF8B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base sm:text-lg text-[#243528]">
                      freshora-project.zip
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#E4F4E4] text-[#4D9954]">
                      ~52 MB
                    </span>
                  </div>
                  <p className="text-xs text-[#718071]">
                    Berisi 80 gambar asli, skrip batch otomatis (<code className="bg-white px-1 py-0.5 rounded text-[11px] border">run-localhost.bat</code>), TypeScript, & panduan lengkap.
                  </p>
                </div>

                <a
                  href="/freshora-project.zip"
                  download="freshora-project.zip"
                  className="px-5 py-3 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
                >
                  <Download className="w-4 h-4 animate-bounce" />
                  Unduh ZIP Sekarang
                </a>
              </div>

              {/* What is included */}
              <div>
                <h4 className="text-xs font-bold text-[#718071] uppercase tracking-wider mb-2.5">
                  Isi Dalam Paket ZIP Ini:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span><strong>80 Foto Asli</strong> Buah & Sayuran di folder <code>/public/products</code></span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span><strong>run-localhost.bat</strong> untuk 1-Klik jalankan di Windows</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span><strong>Akun Demo Otomatis</strong> (Sumanto & Admin Toko)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span><strong>PANDUAN_LOCALHOST.md</strong> panduan langkah demi langkah</span>
                  </div>
                </div>
              </div>

              {/* Quick Terminal Command */}
              <div className="p-4 rounded-2xl bg-[#1E2922] text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#8BCF8B] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    Perintah Cepat di Terminal / Command Prompt:
                  </span>
                  <button
                    onClick={() => copyToClipboard('npm install && npm run dev', 'cmd1')}
                    className="text-[11px] font-semibold text-white/70 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all"
                  >
                    {copiedCmd === 'cmd1' ? (
                      <>
                        <Check className="w-3 h-3 text-[#8BCF8B]" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Salin Perintah
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-xs bg-black/40 p-2.5 rounded-lg overflow-x-auto text-[#8BCF8B]">
                  npm install && npm run dev
                </pre>
                <p className="text-[11px] text-white/60 mt-2">
                  Setelah selesai, buka browser di <span className="text-[#8BCF8B] font-mono">http://localhost:3000</span>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#E4F4E4] border border-[#8BCF8B] text-xs text-[#243528]">
                <strong>Prasyarat:</strong> Pastikan komputer sudah terinstall <strong>Node.js (v18+)</strong>. Jika belum, unduh gratis di{' '}
                <a 
                  href="https://nodejs.org/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-bold underline text-[#4D9954]"
                >
                  nodejs.org
                </a>.
              </div>

              <ol className="space-y-3 text-xs">
                <li className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4D9954] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <h5 className="font-bold text-sm text-[#243528]">Ekstrak Berkas ZIP</h5>
                    <p className="text-[#718071] mt-0.5">
                      Klik kanan berkas <code>freshora-project.zip</code>, lalu pilih <strong>Extract All...</strong> (Ekstrak Semua) ke folder pilihan Anda.
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4D9954] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <h5 className="font-bold text-sm text-[#243528]">Jalankan Script 1-Klik (Windows)</h5>
                    <p className="text-[#718071] mt-0.5">
                      Cukup klik ganda file <strong><code>run-localhost.bat</code></strong>. Script otomatis menginstall modul dan menyalakan server.
                    </p>
                    <p className="text-[11px] text-[#718071] mt-1 italic">
                      *Pengguna Mac / Linux bisa membuka Terminal lalu ketik <code>bash run-localhost.sh</code>.
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4D9954] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <h5 className="font-bold text-sm text-[#243528]">Buka di Peramban Browser</h5>
                    <p className="text-[#718071] mt-0.5">
                      Buka Google Chrome atau Edge, lalu akses:
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="bg-[#F7FBF5] px-2 py-1 rounded border border-[#E1EBDD] font-mono font-bold text-[#4D9954]">
                        http://localhost:3000
                      </code>
                      <span className="text-[11px] text-[#718071]">(atau http://localhost:5173)</span>
                    </div>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-white border border-[#E1EBDD] flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4D9954] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </span>
                  <div>
                    <h5 className="font-bold text-sm text-[#243528]">Masuk Menggunakan Akun Demo</h5>
                    <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">
                        <div className="font-bold text-[#4D9954] flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" /> Pembeli (Sumanto)
                        </div>
                        <div className="text-[11px] text-[#718071]">Email: <code>pembeli@freshora.demo</code></div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">
                        <div className="font-bold text-[#243528] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Admin Toko
                        </div>
                        <div className="text-[11px] text-[#718071]">Email: <code>admin@freshora.demo</code></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-xs text-[#718071]">
                Fitur ini berguna jika Anda ingin memindahkan data produk, pesanan, dan keranjang belanja antara web preview dan lingkungan localhost Anda.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ekspor Data */}
                <div className="p-4 rounded-2xl bg-white border border-[#E1EBDD] space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#243528]">
                    <Download className="w-4 h-4 text-[#4D9954]" />
                    Ekspor Data Toko
                  </div>
                  <p className="text-xs text-[#718071]">
                    Unduh file JSON berisi semua produk, pesanan terkini, dan keranjang belanja Anda.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="w-full py-2.5 rounded-xl bg-[#F7FBF5] hover:bg-[#E4F4E4] border border-[#E1EBDD] hover:border-[#8BCF8B] text-xs font-bold text-[#4D9954] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh Cadangan JSON
                  </button>
                </div>

                {/* Impor Data */}
                <div className="p-4 rounded-2xl bg-white border border-[#E1EBDD] space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#243528]">
                    <Upload className="w-4 h-4 text-[#4D9954]" />
                    Impor Data Toko
                  </div>
                  <p className="text-xs text-[#718071]">
                    Pulihkan data produk atau pesanan dari file cadangan JSON yang Anda miliki.
                  </p>
                  <label className="w-full py-2.5 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    Pilih File JSON
                    <input 
                      type="file" 
                      accept=".json" 
                      className="hidden" 
                      onChange={handleImportData}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F7FBF5] border-t border-[#E1EBDD] flex flex-col sm:flex-row items-center justify-between text-xs text-[#718071] gap-2">
          <span>Dibuat untuk Tugas Bu Tiara Cantik ❤️</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-[#E1EBDD] hover:bg-[#E4F4E4] text-[#243528] font-bold text-xs transition-all"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
