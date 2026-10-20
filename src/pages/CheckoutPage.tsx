import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Banknote,
  FileText,
  Printer
} from 'lucide-react';
import { ReceiptModal } from '../components/common/ReceiptModal';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    currentUser, 
    createOrder, 
    navigate,
    lastCreatedOrderId,
    orders 
  } = useApp();

  // Pre-fill form from logged in user if available
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Sumanto');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '0819-8765-4321');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'pembeli@freshora.demo');
  const [customerAddress, setCustomerAddress] = useState(
    currentUser?.address || 'Jl. Anggrek Cendrawasih No. 24, Kebayoran Baru, Jakarta Selatan'
  );
  const [notes, setNotes] = useState('');
  
  // Shipping choice
  const [shippingCourier, setShippingCourier] = useState('Freshora Instant (1-2 Jam)');
  const [shippingCost, setShippingCost] = useState(15000);

  // Payment choice
  const [paymentMethod, setPaymentMethod] = useState('QRIS Instan (GoPay / OVO / ShopeePay / BCA)');

  // Form error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const discount = cartTotal >= 100000 ? 10000 : 0;
  const grandTotal = cartTotal + shippingCost - discount;

  // Handle courier change
  const handleCourierSelect = (courierName: string, cost: number) => {
    setShippingCourier(courierName);
    setShippingCost(cost);
  };

  // If already created order, display order confirmation view
  if (createdOrder) {
    return (
      <div className="py-12 bg-[#F7FBF5] min-h-[85vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-sm text-center">
            
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#E4F4E4] text-[#3B8F50] flex items-center justify-center mx-auto mb-4 animate-in zoom-in-75">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] font-bold text-xs mb-2">
              Pesanan Diterima oleh Sistem Freshora
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528] mb-2">
              Terima Kasih, {createdOrder.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#718071] max-w-md mx-auto mb-6">
              Pesanan Anda telah berhasil dibuat dengan nomor faktur resmi. Data telah tersinkronisasi langsung ke sistem kasir dan admin.
            </p>

            {/* Fitur Cetak Struk Manual Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-[#E4F4E4]/60 border border-[#8BCF8B]/60 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3B8F50] animate-ping" />
                  <span className="font-bold text-xs sm:text-sm text-[#243528]">
                    Layanan Cetak Struk Mandiri (Self-Service)
                  </span>
                </div>
                <p className="text-[11px] text-[#718071] leading-relaxed">
                  Bebas mau cetak struk ataupun tidak. Memudahkan Anda mencetak bukti transaksi sah tanpa perlu kasir mencoret-coret lagi dan tanpa menunggu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReceipt(true)}
                className="px-4 py-2.5 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all shrink-0 active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Struk Transaksi</span>
              </button>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="bg-[#F7FBF5] border border-[#E1EBDD] rounded-2xl p-5 text-left space-y-3.5 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#E1EBDD]">
                <div>
                  <span className="text-[11px] text-[#718071] block">Nomor Pesanan</span>
                  <span className="font-mono font-bold text-[#243528] text-sm sm:text-base">
                    {createdOrder.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#718071] block">Status Pesanan</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200">
                    {createdOrder.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="font-bold text-[#243528] text-xs">Rincian Komoditas:</span>
                {createdOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-[#243528]">
                      {it.quantity}x {it.productName} ({it.unit})
                    </span>
                    <span className="font-medium text-[#718071]">
                      {formatRupiah(it.subtotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery & Payment info */}
              <div className="pt-3 border-t border-[#E1EBDD] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#718071] block">Alamat Pengiriman:</span>
                  <span className="font-semibold text-[#243528]">{createdOrder.customerAddress}</span>
                </div>
                <div>
                  <span className="text-[#718071] block">Metode Pembayaran:</span>
                  <span className="font-semibold text-[#243528]">{createdOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Total Final */}
              <div className="pt-3 border-t border-[#E1EBDD] flex justify-between items-center">
                <span className="font-bold text-sm text-[#243528]">Total Pembayaran:</span>
                <span className="font-extrabold text-base sm:text-lg text-[#4D9954]">
                  {formatRupiah(createdOrder.total)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowReceipt(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#4D9954] text-[#4D9954] hover:bg-[#E4F4E4] font-bold text-sm flex items-center justify-center gap-2 shadow-2xs transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Buka / Cetak Struk</span>
              </button>
              <button
                onClick={() => navigate('/account')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm shadow-xs transition-all"
              >
                Buka Riwayat Pesanan Saya
              </button>
              <button
                onClick={() => navigate('/products')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#E1EBDD] text-[#243528] font-semibold text-sm hover:bg-[#F7FBF5] transition-all"
              >
                Belanja Kembali
              </button>
            </div>
          </div>
        </div>

        {/* Modal Cetak Struk Mandiri */}
        {showReceipt && (
          <ReceiptModal
            order={createdOrder}
            onClose={() => setShowReceipt(false)}
          />
        )}
      </div>
    );
  }

  // If cart is empty and no order created, redirect to cart
  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-[#243528] mb-2">Keranjang Belanja Kosong</h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#8BCF8B] font-bold text-xs"
        >
          Pilih Produk Dulu
        </button>
      </div>
    );
  }

  // Handle submit checkout
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) newErrors.customerName = 'Nama penerima wajib diisi';
    if (!customerPhone.trim()) newErrors.customerPhone = 'Nomor telepon/WhatsApp wajib diisi';
    if (!customerEmail.trim()) newErrors.customerEmail = 'Email wajib diisi';
    if (!customerAddress.trim()) newErrors.customerAddress = 'Alamat pengiriman lengkap wajib diisi';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Call createOrder
    setTimeout(() => {
      const res = createOrder({
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        shippingCourier,
        shippingCost,
        paymentMethod,
        notes,
      });

      setIsSubmitting(false);
      if (res.success && res.order) {
        setCreatedOrder(res.order);
      }
    }, 400);
  };

  return (
    <div className="py-8 bg-[#F7FBF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate('/cart')}
          className="text-xs font-semibold text-[#718071] hover:text-[#243528] inline-flex items-center gap-1.5 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Keranjang Belanja</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528] mb-6">
          Checkout & Pembayaran Pesanan
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form: Receiver details, Courier, Payment method */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Form Data Penerima */}
              <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-xs space-y-4">
                <h2 className="font-bold text-base text-[#243528] flex items-center gap-2 pb-3 border-b border-[#E1EBDD]">
                  <User className="w-4 h-4 text-[#4D9954]" />
                  Informasi Penerima & Alamat Kirim
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#243528] mb-1">
                      Nama Penerima *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Sumanto"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] ${
                        errors.customerName ? 'border-[#D9534F] bg-red-50/50' : 'border-[#E1EBDD] bg-[#F7FBF5]'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-[#D9534F] mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#243528] mb-1">
                      No. WhatsApp / Telepon *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 0819-8765-4321"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] ${
                        errors.customerPhone ? 'border-[#D9534F] bg-red-50/50' : 'border-[#E1EBDD] bg-[#F7FBF5]'
                      }`}
                    />
                    {errors.customerPhone && (
                      <p className="text-[11px] text-[#D9534F] mt-1">{errors.customerPhone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Email Konfirmasi Pesanan *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Contoh: pembeli@freshora.demo"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] ${
                      errors.customerEmail ? 'border-[#D9534F] bg-red-50/50' : 'border-[#E1EBDD] bg-[#F7FBF5]'
                    }`}
                  />
                  {errors.customerEmail && (
                    <p className="text-[11px] text-[#D9534F] mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Alamat Lengkap Rumah / Kantor *
                  </label>
                  <textarea
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kelurahan, dan patokan..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] ${
                      errors.customerAddress ? 'border-[#D9534F] bg-red-50/50' : 'border-[#E1EBDD] bg-[#F7FBF5]'
                    }`}
                  />
                  {errors.customerAddress && (
                    <p className="text-[11px] text-[#D9534F] mt-1">{errors.customerAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Catatan untuk Kurir (Opsional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Titipkan di satpam, pilih buah yang manis matang"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>
              </div>

              {/* Pilihan Kurir Pengiriman */}
              <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-xs space-y-4">
                <h2 className="font-bold text-base text-[#243528] flex items-center gap-2 pb-3 border-b border-[#E1EBDD]">
                  <Truck className="w-4 h-4 text-[#4D9954]" />
                  Pilihan Kurir Pengiriman Rantai Dingin
                </h2>

                <div className="space-y-2.5">
                  {[
                    { name: 'Freshora Instant (1-2 Jam)', cost: 15000, desc: 'Pengiriman tercepat dengan motor khusus box pendingin' },
                    { name: 'Same Day Segar (Hari ini)', cost: 10000, desc: 'Sampai di rumah pada hari yang sama sebelum jam 18.00 WIB' },
                    { name: 'Reguler Dingin (Besok Pagi)', cost: 7000, desc: 'Dipetik malam ini dan dikirim tepat waktu besok pagi' },
                  ].map((courier) => {
                    const isSelected = shippingCourier === courier.name;
                    return (
                      <div
                        key={courier.name}
                        onClick={() => handleCourierSelect(courier.name, courier.cost)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#4D9954] bg-[#E4F4E4]/50 ring-1 ring-[#4D9954]'
                            : 'border-[#E1EBDD] bg-[#F7FBF5] hover:bg-white hover:border-[#8BCF8B]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="courier"
                            checked={isSelected}
                            onChange={() => handleCourierSelect(courier.name, courier.cost)}
                            className="accent-[#4D9954] w-4 h-4"
                          />
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-[#243528] block">
                              {courier.name}
                            </span>
                            <span className="text-[11px] text-[#718071]">
                              {courier.desc}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-[#4D9954]">
                          {formatRupiah(courier.cost)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pilihan Metode Pembayaran Simulasi */}
              <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-xs space-y-4">
                <h2 className="font-bold text-base text-[#243528] flex items-center gap-2 pb-3 border-b border-[#E1EBDD]">
                  <CreditCard className="w-4 h-4 text-[#4D9954]" />
                  Metode Pembayaran (Simulasi Transaksi)
                </h2>

                <div className="space-y-2.5">
                  {[
                    { id: 'qris', name: 'QRIS Instan (GoPay / OVO / ShopeePay / BCA)', icon: <QrCode className="w-4 h-4 text-[#4D9954]" />, badge: 'Paling Cepat' },
                    { id: 'bca', name: 'Transfer Bank BCA Virtual Account', icon: <Building2 className="w-4 h-4 text-[#3A86C8]" /> },
                    { id: 'mandiri', name: 'Transfer Bank Mandiri Virtual Account', icon: <Building2 className="w-4 h-4 text-amber-600]" /> },
                    { id: 'cod', name: 'COD (Bayar Tunai di Tempat saat barang sampai)', icon: <Banknote className="w-4 h-4 text-[#3B8F50]" />, badge: 'Praktis' },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.name;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.name)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#4D9954] bg-[#E4F4E4]/50 ring-1 ring-[#4D9954]'
                            : 'border-[#E1EBDD] bg-[#F7FBF5] hover:bg-white hover:border-[#8BCF8B]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={isSelected}
                            onChange={() => setPaymentMethod(method.name)}
                            className="accent-[#4D9954] w-4 h-4"
                          />
                          <div className="flex items-center gap-2">
                            {method.icon}
                            <span className="font-semibold text-xs sm:text-sm text-[#243528]">
                              {method.name}
                            </span>
                          </div>
                        </div>
                        {method.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#E1EBDD] text-[#4D9954]">
                            {method.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-xs sticky top-28 space-y-4">
                <h3 className="font-bold text-base text-[#243528] pb-3 border-b border-[#E1EBDD]">
                  Ringkasan Pesanan ({cart.length} Jenis Produk)
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#E1EBDD] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#243528] truncate">{item.product.name}</div>
                        <div className="text-[11px] text-[#718071]">
                          {item.quantity} {item.product.unit} x {formatRupiah(item.product.price)}
                        </div>
                      </div>
                      <div className="font-bold text-[#243528] text-right">
                        {formatRupiah(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation lines */}
                <div className="pt-3 border-t border-[#E1EBDD] space-y-2 text-xs sm:text-sm text-[#718071]">
                  <div className="flex justify-between">
                    <span>Subtotal Produk</span>
                    <span className="font-semibold text-[#243528]">{formatRupiah(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkos Kirim ({shippingCourier.split(' ')[0]})</span>
                    <span className="font-semibold text-[#243528]">{formatRupiah(shippingCost)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#3B8F50]">
                      <span>Diskon Belanja</span>
                      <span className="font-bold">- {formatRupiah(discount)}</span>
                    </div>
                  )}
                </div>

                {/* Total Payment */}
                <div className="pt-3 border-t border-[#E1EBDD] flex items-center justify-between">
                  <span className="font-bold text-sm text-[#243528]">Total Tagihan:</span>
                  <span className="text-xl font-extrabold text-[#4D9954]">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>

                {/* Confirm & Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi & Buat Pesanan'}</span>
                </button>

                <p className="text-[11px] text-[#718071] text-center leading-relaxed">
                  Dengan mengklik tombol di atas, stok produk di gudang Freshora akan langsung dikurangi dan pesanan diteruskan ke penjual.
                </p>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
