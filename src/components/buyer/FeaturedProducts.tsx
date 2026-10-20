import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { Product } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, navigate } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'buah' | 'sayur' | 'organik'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'buah') return p.categoryId === 'cat-buah';
    if (activeTab === 'sayur') return p.categoryId.includes('sayur') || p.categoryId === 'cat-umbi-bumbu';
    if (activeTab === 'organik') return p.isOrganic;
    return p.isFeatured;
  }).slice(0, 8);

  return (
    <section className="py-14 bg-[#F7FBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4D9954] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Paling Diminati Pekan Ini
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#243528]">
              Produk Unggulan Segar
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-[#4D9954] text-white shadow-xs'
                  : 'bg-white text-[#718071] border border-[#E1EBDD] hover:text-[#243528]'
              }`}
            >
              Semua Unggulan
            </button>
            <button
              onClick={() => setActiveTab('buah')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'buah'
                  ? 'bg-[#4D9954] text-white shadow-xs'
                  : 'bg-white text-[#718071] border border-[#E1EBDD] hover:text-[#243528]'
              }`}
            >
              Buah Segar
            </button>
            <button
              onClick={() => setActiveTab('sayur')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'sayur'
                  ? 'bg-[#4D9954] text-white shadow-xs'
                  : 'bg-white text-[#718071] border border-[#E1EBDD] hover:text-[#243528]'
              }`}
            >
              Sayuran Segar
            </button>
            <button
              onClick={() => setActiveTab('organik')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'organik'
                  ? 'bg-[#4D9954] text-white shadow-xs'
                  : 'bg-white text-[#718071] border border-[#E1EBDD] hover:text-[#243528]'
              }`}
            >
              100% Organik
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 rounded-xl bg-white border border-[#8BCF8B] text-[#243528] font-bold text-sm hover:bg-[#E4F4E4] inline-flex items-center gap-2 shadow-xs transition-all"
          >
            <span>Buka Seluruh Katalog ({products.length} Komoditas)</span>
            <ArrowRight className="w-4 h-4 text-[#4D9954]" />
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
