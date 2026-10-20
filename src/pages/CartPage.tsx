import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  AlertCircle
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    cartItemCount, 
    navigate,
    products
  } = useApp();

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const discount = cartTotal >= 100000 ? 10000 : 0;
  const estimatedShipping = cart.length > 0 ? 10000 : 0;
  const finalTotal = cartTotal + estimatedShipping - discount;

  if (cart.length === 0) {
    return (
      <div className="py-16 bg-[#F7FBF5] min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-white border border-[#E1EBDD] flex items-center justify-center mx-auto mb-5 shadow-sm text-[#718071]">
            <ShoppingBag className="w-10 h-10 text-[#4D9954]" />
          </div>
          <h2 className="text-2xl font-bold text-[#243528] mb-2">
            Keranjang Belanja Anda Kosong
          </h2>
          <p className="text-sm text-[#718071] mb-6">
            Segarkan hari Anda dengan buah manis dan sayuran hijau langsung dari petani lokal kami.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Mulai Belanja Buah & Sayur</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-[#F7FBF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528]">
              Keranjang Belanja
            </h1>
            <p className="text-xs sm:text-sm text-[#718071] mt-0.5">
              Anda memiliki {cartItemCount} item segar dalam keranjang belanja.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#D9534F] hover:underline font-semibold"
          >
            Kosongkan Keranjang
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item) => {
              // Find real-time stock from state
              const liveProduct = products.find((p) => p.id === item.product.id) || item.product;
              const isMaxStock = item.quantity >= liveProduct.stock;

              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-[#E1EBDD] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-[#8BCF8B] transition-all"
                >
                  {/* Image & Basic Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E1EBDD] bg-[#F7FBF5] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] text-[#718071] block">
                        {item.product.categoryName || 'Komoditas'} • {item.product.unit}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-[#243528] truncate">
                        {item.product.name}
                      </h3>
                      <div className="text-xs sm:text-sm font-extrabold text-[#4D9954] mt-0.5">
                        {formatRupiah(item.product.price)}
                      </div>
                      
                      {/* Stock availability indicator */}
                      <span className="text-[11px] text-[#718071]">
                        Stok gudang: {liveProduct.stock} {item.product.unit}
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#E1EBDD]">
                    {/* Quantity Selector */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center border border-[#E1EBDD] bg-[#F7FBF5] rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 text-[#718071] hover:text-[#243528] hover:bg-white"
                          title="Kurangi"
                          aria-label="Kurangi"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 font-bold text-xs text-[#243528] min-w-[34px] text-center bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={isMaxStock}
                          className="p-2 text-[#718071] hover:text-[#243528] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                          title={isMaxStock ? 'Stok maksimum tercapai' : 'Tambah'}
                          aria-label="Tambah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {isMaxStock && (
                        <span className="text-[10px] text-amber-600 font-semibold mt-1">
                          Batas stok
                        </span>
                      )}
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[90px]">
                      <span className="text-[10px] text-[#718071] block">Subtotal</span>
                      <span className="font-extrabold text-sm sm:text-base text-[#243528]">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 rounded-xl text-[#718071] hover:text-[#D9534F] hover:bg-red-50 transition-colors"
                      title="Hapus dari keranjang"
                      aria-label="Hapus produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Back to Shopping button */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/products')}
                className="text-xs sm:text-sm font-semibold text-[#4D9954] hover:underline inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Lanjut Pilih Buah & Sayur Lainnya</span>
              </button>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-xs sticky top-28 space-y-4">
              <h2 className="font-bold text-lg text-[#243528] pb-3 border-b border-[#E1EBDD]">
                Ringkasan Belanja
              </h2>

              {/* Promo Banner if eligible or teaser */}
              {discount > 0 ? (
                <div className="p-3 rounded-xl bg-[#E4F4E4] border border-[#8BCF8B] text-xs text-[#3B8F50] font-semibold flex items-center gap-2">
                  <span>🎉 Promo Belanja &gt; Rp 100.000: Diskon Rp 10.000 aktif!</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-xs text-[#718071]">
                  💡 Belanja Rp {(100000 - cartTotal).toLocaleString('id-ID')} lagi untuk mendapatkan diskon otomatis Rp 10.000!
                </div>
              )}

              {/* Price Details */}
              <div className="space-y-2.5 text-xs sm:text-sm text-[#718071]">
                <div className="flex justify-between">
                  <span>Total Harga ({cartItemCount} item)</span>
                  <span className="font-semibold text-[#243528]">{formatRupiah(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimasi Ongkos Kirim</span>
                  <span className="font-semibold text-[#243528]">{formatRupiah(estimatedShipping)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#3B8F50]">
                    <span>Potongan Diskon Promo</span>
                    <span className="font-bold">- {formatRupiah(discount)}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-[#E1EBDD] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#718071] block">Total Pembayaran</span>
                  <span className="text-xl font-extrabold text-[#4D9954]">
                    {formatRupiah(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-[#718071] space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4D9954]" />
                  <span>Stok diverifikasi langsung secara realtime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#4D9954]" />
                  <span>Pengiriman boks bersegel higienis</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
