import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Plus, Star, MapPin, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart } = useApp();
  const [isAdded, setIsAdded] = React.useState(false);

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    const ok = addToCart(product, 1);
    if (ok) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1200);
    }
  };

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-[#E1EBDD] overflow-hidden hover:border-[#8BCF8B] hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer relative"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F7FBF5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedFallback) {
              target.dataset.triedFallback = 'true';
              target.src = `/products/${product.id}.jpg`;
            }
          }}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 bg-[#4D9954] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              Organik
            </span>
          )}
          {product.isFeatured && !product.isOrganic && (
            <span className="inline-flex items-center gap-1 bg-[#E09F3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Pilihan
            </span>
          )}
        </div>

        {/* Stock status badge */}
        <div className="absolute top-2.5 right-2.5">
          {isOutOfStock ? (
            <span className="bg-[#D9534F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Stok Habis
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
              Sisa {product.stock}
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#718071] mb-1.5">
            <span className="flex items-center gap-1 truncate max-w-[140px]" title={product.origin}>
              <MapPin className="w-3 h-3 text-[#4D9954] shrink-0" />
              {product.origin.split(',')[0]}
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#243528]">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base text-[#243528] group-hover:text-[#4D9954] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Unit / Weight */}
          <p className="text-xs text-[#718071] mb-2.5">
            Satuan: <span className="font-medium text-[#243528]">{product.unit}</span>
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-[#E1EBDD] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-[#718071] block leading-none">Harga</span>
            <span className="text-sm sm:text-base font-extrabold text-[#4D9954]">
              {formatRupiah(product.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isAdded
                ? 'bg-[#3B8F50] text-white'
                : 'bg-[#8BCF8B] text-[#243528] hover:bg-[#7bc47b] active:scale-95'
            }`}
            title={isOutOfStock ? 'Stok produk habis' : 'Tambah ke Keranjang'}
            aria-label="Tambah produk ke keranjang"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Beli</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
