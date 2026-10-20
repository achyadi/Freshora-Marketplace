import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  GraduationCap,
  ExternalLink,
  Download
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, switchDemoRole } = useApp();

  return (
    <footer className="bg-white border-t border-[#E1EBDD] mt-20 text-[#243528]">
      {/* Value Badges Banner */}
      <div className="border-b border-[#E1EBDD] bg-[#F7FBF5]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#243528]">100% Petik Segar</h4>
                <p className="text-xs text-[#718071]">Langsung dari petani lokal setiap subuh</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#243528]">Pengiriman Cepat</h4>
                <p className="text-xs text-[#718071]">Instant & Same Day berpendingin khusus</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#243528]">Jaminan Kualitas</h4>
                <p className="text-xs text-[#718071]">Garansi ganti baru jika buah busuk/rusak</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#243528]">Proyek Tugas RPL</h4>
                <p className="text-xs text-[#718071]">Rekayasa Perangkat Lunak 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8BCF8B] to-[#4D9954] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#243528]">Freshora</span>
            </div>
            <p className="text-xs leading-relaxed text-[#718071]">
              Freshora adalah marketplace digital yang menghubungkan pembeli dengan penjual buah dan sayuran segar langsung dari kebun terpercaya.
            </p>
            <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-[11px] text-[#4D9954] font-medium">
              &ldquo;Segar dari Alam, Mudah Sampai di Rumah.&rdquo;
            </div>
          </div>

          {/* Navigasi Pembeli */}
          <div>
            <h5 className="font-bold text-sm text-[#243528] mb-3.5">Navigasi Belanja</h5>
            <ul className="space-y-2 text-xs text-[#718071]">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-[#4D9954] transition-colors">
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-[#4D9954] transition-colors">
                  Semua Produk Segar
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cart')} className="hover:text-[#4D9954] transition-colors">
                  Keranjang Belanja
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-[#4D9954] transition-colors">
                  Riwayat & Status Pesanan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#4D9954] transition-colors">
                  Tentang Freshora
                </button>
              </li>
            </ul>
          </div>

          {/* Area Khusus & Akademik */}
          <div>
            <h5 className="font-bold text-sm text-[#243528] mb-3.5">Administrasi & RPL</h5>
            <ul className="space-y-2 text-xs text-[#718071]">
              <li>
                <button onClick={() => navigate('/admin/dashboard')} className="hover:text-[#4D9954] flex items-center gap-1 transition-colors font-semibold text-[#243528]">
                  Dashboard Administrator <ExternalLink className="w-3 h-3 text-[#4D9954]" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin/settings')} className="hover:text-[#4D9954] flex items-center gap-1 transition-colors font-semibold text-[#243528]">
                  Pengaturan Sistem & Demonstrasi RPL
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin/products')} className="hover:text-[#4D9954] transition-colors">
                  Manajemen Katalog Produk
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin/orders')} className="hover:text-[#4D9954] transition-colors">
                  Manajemen Pesanan Masuk
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/rpl-docs')} className="hover:text-[#4D9954] transition-colors font-medium text-[#4D9954]">
                  Dokumen RPL (ERD & Use Case)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/figma-sesi1')} className="hover:text-[#4D9954] transition-colors font-bold text-[#4D9954] flex items-center gap-1">
                  Presentasi Minggu 1 (Figma & Diagram)
                </button>
              </li>
              <li>
                <button onClick={() => switchDemoRole('admin')} className="text-[#3B8F50] hover:underline transition-colors">
                  Login Cepat Akun Admin Demo
                </button>
              </li>
              <li>
                <a 
                  href="/freshora-project.zip" 
                  download="freshora-project.zip" 
                  className="hover:text-[#4D9954] transition-colors font-bold text-[#4D9954] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh ZIP Proyek (Localhost)
                </a>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h5 className="font-bold text-sm text-[#243528] mb-3.5">Pusat Layanan & Kontak</h5>
            <div className="space-y-2.5 text-xs text-[#718071]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#4D9954] shrink-0 mt-0.5" />
                <span>Jl. Agrikultur Sentra Hijau No. 8, Jakarta Selatan, DKI Jakarta 12560</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4D9954] shrink-0" />
                <span>+62 812-3456-7890 (Customer Care)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4D9954] shrink-0" />
                <span>halo@freshora.id</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#E4F4E4] text-[#4D9954] font-semibold text-[11px]">
                  Jam Layanan: 06.00 - 21.00 WIB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-10 pt-6 border-t border-[#E1EBDD] flex flex-col sm:flex-row items-center justify-between text-xs text-[#718071] gap-3">
          <p>
            &copy; {new Date().getFullYear()} Freshora Marketplace. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[11px] bg-[#F7FBF5] px-3.5 py-1.5 rounded-full border border-[#E1EBDD] font-medium text-[#243528] flex items-center gap-1.5">
            <span>Dibuat untuk Tugas Bu Tiara Cantik</span>
            <span className="text-red-500 animate-pulse" aria-label="love">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
