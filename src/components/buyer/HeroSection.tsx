import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Users, 
  Leaf,
  Upload,
  Camera,
  RotateCcw,
  Check
} from 'lucide-react';
import { FloatingParticles } from '../common/FloatingParticles';

const DEFAULT_HERO_IMAGE = '/src/assets/images/freshora_hero_farmer_1791877824293.jpg';
const STORAGE_KEY = 'freshora_custom_hero_image';

export const HeroSection: React.FC = () => {
  const { navigate, addToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_HERO_IMAGE;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Harap pilih file gambar (JPG, PNG, WebP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setHeroImage(result);
        setIsCustom(true);
        localStorage.setItem(STORAGE_KEY, result);
        addToast('Foto asli Anda berhasil dipasang pada landing page tanpa perubahan!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(STORAGE_KEY);
    setHeroImage(DEFAULT_HERO_IMAGE);
    setIsCustom(false);
    addToast('Foto landing page dikembalikan ke default.', 'info');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pb-20 bg-gradient-to-b from-[#F7FBF5] via-[#E4F4E4]/40 to-[#F7FBF5]">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#8BCF8B]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#4D9954]/10 blur-3xl pointer-events-none" />

      {/* Floating Animated Botanical Particles (Bintik-bintik bergerak) */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E1EBDD] text-xs font-semibold text-[#4D9954] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#4D9954] animate-ping" />
              <Leaf className="w-3.5 h-3.5 text-[#4D9954]" />
              Marketplace Buah & Sayuran Segar Terpercaya
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#243528] tracking-tight leading-[1.18]">
              Buah dan Sayur Segar, <br />
              <span className="text-[#4D9954] underline decoration-[#8BCF8B] decoration-wavy decoration-2">
                Pilihan Lebih Mudah.
              </span>
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-base sm:text-lg text-[#718071] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Freshora menghubungkan Anda langsung dengan kelompok tani lokal terpercaya. 
              Dipetik saat matang pohon, disortir higienis, dan dikirim cepat hingga ke dapur rumah Anda.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm sm:text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Belanja Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/rpl-docs')}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#F7FBF5] text-[#243528] font-semibold text-sm sm:text-base border border-[#E1EBDD] flex items-center gap-2 shadow-xs transition-all"
              >
                <span>Dokumentasi Sistem RPL</span>
              </button>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-6 border-t border-[#E1EBDD] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#243528]">50+</div>
                <div className="text-xs text-[#718071]">Petani Mitra Lokal</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#4D9954]">100%</div>
                <div className="text-xs text-[#718071]">Alami & Terverifikasi</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#243528]">1-2 Jam</div>
                <div className="text-xs text-[#718071]">Pengiriman Instant</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Hidden File Input for uploading custom user photo */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload foto asli Anda"
              />

              {/* Main Visual Image Card */}
              <div 
                className="rounded-3xl overflow-hidden border border-[#E1EBDD] shadow-xl bg-white relative group"
              >
                <img
                  src={heroImage}
                  alt="Petani mitra Freshora memanen hasil kebun segar berkualitas"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Quick Upload Button on top right of the image */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                  {isCustom && (
                    <button
                      onClick={handleResetImage}
                      className="px-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-[11px] font-semibold backdrop-blur-xs border border-white/20 transition-all flex items-center gap-1"
                      title="Kembalikan foto default"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-[#243528] text-[11px] font-bold shadow-md backdrop-blur-xs border border-[#E1EBDD] transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                    title="Pilih dan pasang file gambar asli Anda (misal WhatsApp Image) tanpa perubahan"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#4D9954]" />
                    <span>{isCustom ? 'Ganti Foto Asli' : 'Pasang Foto Asli Anda'}</span>
                  </button>
                </div>
                
                {/* Gradient overlay with tagline banner */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-5 sm:p-6 pointer-events-none">
                  <div className="text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8BCF8B]/95 text-[#243528] text-[11px] font-extrabold uppercase tracking-wider mb-1.5 shadow-xs">
                      Petani Mitra Terverifikasi
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold leading-tight text-white drop-shadow-sm">
                      &ldquo;Segar dari Alam, Mudah Sampai di Rumah.&rdquo;
                    </h3>
                    <p className="text-xs text-white/90 mt-1">
                      Dipanen langsung oleh petani kebun lokal saat kematangan optimal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating micro badges */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#E1EBDD] shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#243528]">Dipetik Subuh Hari</div>
                  <div className="text-[11px] text-[#718071]">Garansi renyah & manis</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#E1EBDD] shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8BCF8B]/30 text-[#4D9954] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#243528]">Garansi Uang Kembali</div>
                  <div className="text-[11px] text-[#718071]">Jika ada produk busuk</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
