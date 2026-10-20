import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Star, 
  MapPin, 
  User, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Check, 
  Sparkles,
  Truck
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, navigate } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    const ok = addToCart(product, quantity);
    if (ok) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    const ok = addToCart(product, quantity);
    if (ok) {
      onClose();
      navigate('/cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E1EBDD] animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-[#E1EBDD] bg-[#F7FBF5]">
          <span className="text-xs font-semibold text-[#4D9954] uppercase tracking-wider">
            Detail Produk Segar • Freshora
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#718071] hover:text-[#243528] hover:bg-white transition-colors"
            aria-label="Tutup detail produk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F7FBF5] border border-[#E1EBDD]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = `/products/${product.id}.jpg`;
                  }
                }}
              />
              {product.isOrganic && (
                <div className="absolute top-3 left-3 bg-[#4D9954] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  100% Organik
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-3.5">
              <div>
                <span className="text-xs font-semibold text-[#718071] block mb-1">
                  {product.categoryName || 'Kategori Buah & Sayur'}
                </span>
                <h2 className="text-xl font-bold text-[#243528] leading-snug">
                  {product.name}
                </h2>
              </div>

              {/* Rating & Sold */}
              <div className="flex items-center gap-3 text-xs text-[#718071]">
                <div className="flex items-center gap-1 font-bold text-[#243528]">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>Terjual {product.soldCount} {product.unit}</span>
                <span>•</span>
                <span className="text-[#3B8F50] font-semibold">Tersedia {product.stock} {product.unit}</span>
              </div>

              {/* Price */}
              <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD]">
                <span className="text-[11px] text-[#718071] block">Harga per {product.unit}</span>
                <div className="text-2xl font-extrabold text-[#4D9954]">
                  {formatRupiah(product.price)}
                </div>
              </div>

              {/* Farmer and Origin */}
              <div className="space-y-1.5 text-xs text-[#718071] bg-white border border-[#E1EBDD] p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#4D9954]" />
                  <span>Asal: <strong className="text-[#243528]">{product.origin}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#4D9954]" />
                  <span>Mitra Kebun: <strong className="text-[#243528]">{product.farmer}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-[#E1EBDD]">
            <h4 className="font-bold text-sm text-[#243528]">Deskripsi Produk:</h4>
            <p className="text-xs sm:text-sm text-[#718071] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#E4F4E4]/40 p-3 rounded-xl border border-[#8BCF8B]/30 text-[#243528]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4D9954] shrink-0" />
              <span>Garansi 100% Segar Baru</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#4D9954] shrink-0" />
              <span>Pengiriman Box Dingin</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E1EBDD] bg-[#F7FBF5] flex flex-wrap items-center justify-between gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#718071]">Jumlah:</span>
            <div className="flex items-center border border-[#E1EBDD] bg-white rounded-xl overflow-hidden">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1 || product.stock <= 0}
                className="p-2 text-[#718071] hover:text-[#243528] hover:bg-gray-50 disabled:opacity-40"
                aria-label="Kurangi jumlah"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 py-1 font-bold text-xs text-[#243528] min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= product.stock || product.stock <= 0}
                className="p-2 text-[#718071] hover:text-[#243528] hover:bg-gray-50 disabled:opacity-40"
                aria-label="Tambah jumlah"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-[#718071]">{product.unit}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
                product.stock <= 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isAdded
                  ? 'bg-[#3B8F50] text-white'
                  : 'bg-white border border-[#4D9954] text-[#4D9954] hover:bg-[#E4F4E4]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dimasukkan!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Tambah Keranjang</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="px-5 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs sm:text-sm transition-all shadow-xs disabled:bg-gray-200 disabled:text-gray-500"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
