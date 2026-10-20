import React from 'react';
import { useApp } from '../../context/AppContext';
import { Apple, Salad, Carrot, Sparkles, Leaf, ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { categories, products, navigate } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="w-6 h-6 text-[#4D9954]" />;
      case 'Salad':
        return <Salad className="w-6 h-6 text-[#4D9954]" />;
      case 'Carrot':
        return <Carrot className="w-6 h-6 text-[#4D9954]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#4D9954]" />;
      default:
        return <Leaf className="w-6 h-6 text-[#4D9954]" />;
    }
  };

  return (
    <section className="py-12 bg-white border-b border-[#E1EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4D9954] block mb-1">
              Pilihan Komoditas Segar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#243528]">
              Jelajahi Berdasarkan Kategori
            </h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs sm:text-sm font-bold text-[#4D9954] hover:text-[#3d7a43] flex items-center gap-1 group self-start sm:self-auto"
          >
            Lihat Semua Produk
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.id}`)}
                className="group p-4 sm:p-5 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:bg-[#E4F4E4]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#E1EBDD] group-hover:border-[#8BCF8B] flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-xs">
                  {getIcon(cat.icon)}
                </div>
                <h3 className="font-bold text-sm text-[#243528] group-hover:text-[#4D9954] transition-colors mb-1">
                  {cat.name}
                </h3>
                <span className="text-xs text-[#718071]">
                  {count} Komoditas
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
