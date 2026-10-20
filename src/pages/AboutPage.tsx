import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Truck, 
  Heart, 
  MapPin, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="py-12 bg-[#F7FBF5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]/40">
            <Sprout className="w-3.5 h-3.5" />
            Tentang Freshora
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243528]">
            Menghadirkan Kesegaran Alam Langsung ke Dapur Rumah Anda
          </h1>
          <p className="text-sm sm:text-base text-[#718071] leading-relaxed">
            Freshora berawal dari keprihatinan atas panjangnya rantai pasok buah dan sayuran di Indonesia, yang seringkali membuat kesegaran menurun dan harga di tingkat petani tertekan.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#243528]">
              Visi & Misi Kami
            </h2>
            <p className="text-xs sm:text-sm text-[#718071] leading-relaxed">
              Membangun ekosistem marketplace pertanian digital yang adil, efisien, dan transparan. Petani lokal memperoleh nilai ekonomi yang sepadan, sementara keluarga perkotaan dapat menikmati buah dan sayuran yang dipetik segar di hari yang sama.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#243528]">
                <Leaf className="w-4 h-4 text-[#4D9954]" />
                <span>100% Bebas Pengawet Kimiawi dan Pewarna Lilin</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#243528]">
                <Users className="w-4 h-4 text-[#4D9954]" />
                <span>Pemberdayaan Lebih Dari 50+ Kelompok Tani Mandiri</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#243528]">
                <ShieldCheck className="w-4 h-4 text-[#4D9954]" />
                <span>Garansi Penggantian Instan Bila Produk Tidak Segar</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E1EBDD] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=700&q=80"
              alt="Petani sayur lokal memanen hasil bumi segar"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>

        {/* Mitra Kebun Kami */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#243528]">
              Sentra Kebun Mitra Freshora
            </h3>
            <p className="text-xs sm:text-sm text-[#718071]">
              Buah dan sayuran kami dipasok langsung dari daerah penghasil terbaik di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#243528]">Batu & Malang, Jatim</h4>
              <p className="text-xs text-[#718071]">
                Sentra perkebunan apel manalagi, jeruk keprok, serta aneka sayuran dataran tinggi sejuk.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#243528]">Lembang & Ciwidey, Jabar</h4>
              <p className="text-xs text-[#718071]">
                Pertanian hidroponik modern, tomat cherry manis, bayam hijau organik, dan brokoli unggul.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#243528]">Berastagi, Sumut</h4>
              <p className="text-xs text-[#718071]">
                Penghasil wortel manis renyah kualitas ekspor, kol kubis, dan rempah alami pegunungan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm inline-flex items-center gap-2 shadow-xs transition-all"
          >
            <span>Mulai Berbelanja Produk Segar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
