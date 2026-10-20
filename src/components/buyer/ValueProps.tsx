import React from 'react';
import { Leaf, Award, Truck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const points = [
    {
      icon: <Leaf className="w-7 h-7 text-[#4D9954]" />,
      title: 'Segar Langsung Petik',
      desc: 'Buah dan sayuran dipanen pada puncak kematangan untuk menjaga nutrisi dan cita rasa alami terbaik.',
    },
    {
      icon: <Award className="w-7 h-7 text-[#4D9954]" />,
      title: 'Mitra Kebun Terverifikasi',
      desc: 'Setiap kelompok tani terkurasi ketat dan menerapkan praktik budidaya yang aman serta ramah lingkungan.',
    },
    {
      icon: <Truck className="w-7 h-7 text-[#4D9954]" />,
      title: 'Rantai Pasok Dingin',
      desc: 'Pengiriman menggunakan pendingin dan kemasan pelindung khusus agar daun dan buah tetap renyah sampai rumah.',
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-[#4D9954]" />,
      title: 'Harga Adil untuk Petani',
      desc: 'Memotong rantai tengkulak yang panjang sehingga petani mendapat penghasilan layak dan pembeli mendapat harga bersahabat.',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-[#E1EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4D9954] block mb-1">
            Komitmen Kualitas Kami
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#243528] mb-3">
            Mengapa Berbelanja di Freshora?
          </h2>
          <p className="text-sm text-[#718071]">
            Kami membangun platform rantai pasok digital yang memberikan manfaat timbal balik nyata bagi keluarga Anda dan petani Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:shadow-xs transition-all flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E4F4E4] flex items-center justify-center mb-4">
                {pt.icon}
              </div>
              <h3 className="font-bold text-base text-[#243528] mb-2">
                {pt.title}
              </h3>
              <p className="text-xs text-[#718071] leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Banner garansi */}
        <div className="mt-12 p-6 rounded-2xl bg-[#E4F4E4]/60 border border-[#8BCF8B]/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#4D9954] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#243528]">
                Garansi Kepuasan Pelanggan 100%
              </h4>
              <p className="text-xs text-[#718071]">
                Ada buah yang rusak atau sayur yang layu? Cukup foto dan laporkan ke customer service kami dalam 24 jam untuk klaim penggantian instan.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 bg-white text-[#4D9954] font-bold text-xs rounded-xl border border-[#8BCF8B] shrink-0">
            Klaim Tanpa Ribet
          </span>
        </div>
      </div>
    </section>
  );
};
