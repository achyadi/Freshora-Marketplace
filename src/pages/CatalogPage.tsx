import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/buyer/ProductCard';
import { ProductDetailModal } from '../components/buyer/ProductDetailModal';
import { Product } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  PackageX, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { products, categories, selectedProductId } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    try {
      const hash = window.location.hash;
      const search = hash.includes('?') ? hash.split('?')[1] : '';
      if (search) {
        const params = new URLSearchParams(search);
        const cat = params.get('category');
        if (cat) return cat;
      }
    } catch {
      // ignore
    }
    return 'all';
  });
  const [priceRange, setPriceRange] = useState<string>('all'); // all, under20, 20to30, above30
  const [sortBy, setSortBy] = useState<string>('popular'); // popular, priceAsc, priceDesc, nameAsc
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  React.useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash;
        const search = hash.includes('?') ? hash.split('?')[1] : '';
        if (search) {
          const params = new URLSearchParams(search);
          const cat = params.get('category');
          if (cat) setSelectedCategory(cat);
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Active product modal
  const [detailProduct, setDetailProduct] = useState<Product | null>(() => {
    if (selectedProductId) {
      return products.find((p) => p.id === selectedProductId) || null;
    }
    return null;
  });

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search by name, farmer, or origin
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.farmer.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'all_buah') {
          if (p.categoryId !== 'cat-buah') return false;
        } else if (selectedCategory === 'all_sayur') {
          if (p.categoryId === 'cat-buah') return false;
        } else if (selectedCategory === 'organik') {
          if (!p.isOrganic) return false;
        } else if (p.categoryId !== selectedCategory) {
          return false;
        }
      }

      // Price filter
      if (priceRange === 'under20' && p.price >= 20000) return false;
      if (priceRange === '20to30' && (p.price < 20000 || p.price > 30000)) return false;
      if (priceRange === 'above30' && p.price <= 30000) return false;

      // Organic toggle
      if (onlyOrganic && !p.isOrganic) return false;

      // Stock toggle
      if (onlyInStock && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'nameAsc') return a.name.localeCompare(b.name);
      // default: popular (sold count & rating)
      return b.soldCount - a.soldCount;
    });
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, onlyOrganic, onlyInStock]);

  const fruitCount = useMemo(() => products.filter((p) => p.categoryId === 'cat-buah').length, [products]);
  const vegCount = useMemo(() => products.filter((p) => p.categoryId !== 'cat-buah').length, [products]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('popular');
    setOnlyOrganic(false);
    setOnlyInStock(false);
  };

  return (
    <div className="py-8 bg-[#F7FBF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528]">
              Katalog Buah & Sayuran Segar
            </h1>
            <p className="text-xs sm:text-sm text-[#718071] mt-1">
              Menampilkan {filteredProducts.length} dari total {products.length} komoditas segar ({fruitCount} Buah-buahan & {vegCount} Sayur-sayuran) langsung dari petani lokal.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-semibold self-start sm:self-auto border border-[#8BCF8B]/50">
            <span>40 Buah & 40 Sayuran Segar</span>
          </div>
        </div>

        {/* Quick Category Navigation Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#4D9954] text-white shadow-xs'
                : 'bg-white text-[#718071] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:text-[#243528]'
            }`}
          >
            <span>Semua Komoditas</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#E4F4E4] text-[#4D9954]'}`}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('all_buah')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all_buah' || selectedCategory === 'cat-buah'
                ? 'bg-[#4D9954] text-white shadow-xs'
                : 'bg-white text-[#718071] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:text-[#243528]'
            }`}
          >
            <span>Buah Segar</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedCategory === 'all_buah' || selectedCategory === 'cat-buah' ? 'bg-white/20 text-white' : 'bg-[#E4F4E4] text-[#4D9954]'}`}>
              {fruitCount}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('all_sayur')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all_sayur'
                ? 'bg-[#4D9954] text-white shadow-xs'
                : 'bg-white text-[#718071] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:text-[#243528]'
            }`}
          >
            <span>Semua Sayuran</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedCategory === 'all_sayur' ? 'bg-white/20 text-white' : 'bg-[#E4F4E4] text-[#4D9954]'}`}>
              {vegCount}
            </span>
          </button>

          {categories.filter((c) => c.id !== 'cat-buah').map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === c.id
                    ? 'bg-[#4D9954] text-white shadow-xs'
                    : 'bg-white text-[#718071] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:text-[#243528]'
                }`}
              >
                <span>{c.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedCategory === c.id ? 'bg-white/20 text-white' : 'bg-[#F7FBF5] text-[#718071]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1EBDD] shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#718071] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama buah, sayur, atau asal kebun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#718071] hover:text-[#243528]"
                >
                  Batal
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              >
                <option value="all">Semua Kategori ({products.length})</option>
                <option value="all_buah">Semua Buah Segar ({fruitCount})</option>
                <option value="all_sayur">Semua Sayuran ({vegCount})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({products.filter((p) => p.categoryId === c.id).length})
                  </option>
                ))}
                <option value="organik">Khusus Organik</option>
              </select>
            </div>

            {/* Price Range Select */}
            <div className="md:col-span-2">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              >
                <option value="all">Semua Harga</option>
                <option value="under20">&lt; Rp 20.000</option>
                <option value="20to30">Rp 20.000 - Rp 30.000</option>
                <option value="above30">&gt; Rp 30.000</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] font-medium"
              >
                <option value="popular">Terpopuler</option>
                <option value="priceAsc">Harga: Termurah</option>
                <option value="priceDesc">Harga: Termahal</option>
                <option value="nameAsc">Nama: A - Z</option>
              </select>
            </div>

          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E1EBDD] text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#718071] font-medium">Filter Cepat:</span>
              <button
                onClick={() => setOnlyOrganic(!onlyOrganic)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 transition-all ${
                  onlyOrganic
                    ? 'bg-[#4D9954] text-white border-[#4D9954]'
                    : 'bg-white text-[#718071] border-[#E1EBDD] hover:border-[#8BCF8B]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Hanya Organik
              </button>

              <button
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
                  onlyInStock
                    ? 'bg-[#4D9954] text-white border-[#4D9954]'
                    : 'bg-white text-[#718071] border-[#E1EBDD] hover:border-[#8BCF8B]'
                }`}
              >
                Hanya Stok Tersedia
              </button>
            </div>

            {(searchQuery || selectedCategory !== 'all' || priceRange !== 'all' || sortBy !== 'popular' || onlyOrganic || onlyInStock) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#D9534F] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Semua Filter
              </button>
            )}
          </div>
        </div>

        {/* Product Grid / Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={(prod) => setDetailProduct(prod)}
              />
            ))}
          </div>
        ) : (
          /* Empty State as requested */
          <div className="bg-white rounded-2xl border border-[#E1EBDD] p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex items-center justify-center mx-auto mb-4 text-[#718071]">
              <PackageX className="w-8 h-8 text-[#718071]" />
            </div>
            <h3 className="font-bold text-lg text-[#243528] mb-1">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#718071] mb-5">
              Tidak ada komoditas buah atau sayuran yang sesuai dengan kata kunci atau filter yang Anda pilih.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs shadow-xs"
            >
              Reset Filter & Tampilkan Semua
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
        />
      )}
    </div>
  );
};
