import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  User as UserIcon, 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  LogOut, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldAlert,
  ArrowRight,
  Eye,
  X,
  CreditCard,
  Printer
} from 'lucide-react';
import { ReceiptModal } from '../components/common/ReceiptModal';

export const AccountPage: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    login, 
    register, 
    logout, 
    cancelOrder, 
    navigate,
    switchDemoRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  
  // Auth Form State (if not logged in)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('pembeli@freshora.demo');
  const [loginPassword, setLoginPassword] = useState('buyer123');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');

  // Selected Order Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" />
            Menunggu
          </span>
        );
      case 'Diproses':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Package className="w-3 h-3" />
            Diproses
          </span>
        );
      case 'Dikirim':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <Truck className="w-3 h-3" />
            Dikirim
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E4F4E4] text-[#3B8F50] border border-[#8BCF8B]">
            <CheckCircle2 className="w-3 h-3" />
            Selesai
          </span>
        );
      case 'Dibatalkan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-[#D9534F] border border-red-200">
            <XCircle className="w-3 h-3" />
            Dibatalkan
          </span>
        );
      default:
        return <span className="text-xs text-[#718071]">{status}</span>;
    }
  };

  // If user is not logged in: display Login / Register form
  if (!currentUser) {
    return (
      <div className="py-12 bg-[#F7FBF5] min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-sm">
            
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4D9954] block mb-1">
                Akun Pelanggan Freshora
              </span>
              <h1 className="text-2xl font-extrabold text-[#243528]">
                {authMode === 'login' ? 'Masuk ke Akun Pembeli' : 'Daftar Akun Baru'}
              </h1>
              <p className="text-xs text-[#718071] mt-1">
                {authMode === 'login'
                  ? 'Kelola riwayat belanja buah dan sayuran segar Anda.'
                  : 'Nikmati kemudahan berbelanja langsung dari kebun lokal.'}
              </p>
            </div>

            {/* Quick Demo Fill Buttons for RPL Presentation */}
            <div className="mb-6 p-3 rounded-2xl bg-[#E4F4E4]/60 border border-[#8BCF8B]/40 text-left">
              <div className="text-[11px] font-bold text-[#243528] mb-1.5 flex items-center gap-1">
                <span>🎓 Akun Presentasi RPL (1-Klik Masuk):</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => switchDemoRole('buyer')}
                  className="px-3 py-1.5 rounded-xl bg-[#4D9954] text-white text-xs font-semibold hover:bg-[#3d7a43] transition-all flex items-center justify-center gap-1"
                >
                  Masuk sbg Pembeli (Sumanto)
                </button>
                <button
                  type="button"
                  onClick={() => switchDemoRole('admin')}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#4D9954] text-[#4D9954] text-xs font-semibold hover:bg-[#E4F4E4] transition-all flex items-center justify-center gap-1"
                >
                  Masuk sbg Admin Freshora
                </button>
              </div>
            </div>

            {/* Login or Register Form */}
            {authMode === 'login' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login(loginEmail, loginPassword);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Email Terdaftar
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm shadow-xs transition-all"
                >
                  Masuk Sekarang
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-xs text-[#4D9954] hover:underline font-semibold"
                  >
                    Belum punya akun? Buat akun baru disini
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  register(regName, regEmail, regPhone, regAddress);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Contoh: Siti Rahayu"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="siti@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Nomor WhatsApp / Telepon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243528] mb-1">
                    Alamat Pengiriman *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Alamat lengkap rumah..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm shadow-xs transition-all mt-2"
                >
                  Daftar Akun Freshora
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-[#4D9954] hover:underline font-semibold"
                  >
                    Sudah memiliki akun? Masuk disini
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    );
  }

  // Filter orders belonging to this user (or if admin, can view all)
  const myOrders = orders.filter(
    (o) => o.userId === currentUser.id || o.customerEmail === currentUser.email
  );

  return (
    <div className="py-8 bg-[#F7FBF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Greeting & Header */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-5 sm:p-7 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold text-xl border border-[#8BCF8B]">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#243528]">
                  {currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#E4F4E4] text-[#4D9954] text-[11px] font-bold">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Pelanggan Setia'}
                </span>
              </div>
              <p className="text-xs text-[#718071] mt-0.5">
                {currentUser.email} • Terdaftar sejak {new Date(currentUser.createdAt).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2.5 rounded-xl bg-[#4D9954] text-white text-xs font-bold hover:bg-[#3d7a43] transition-all flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Dashboard Admin
              </button>
            )}
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-[#E1EBDD] hover:bg-red-50 text-[#718071] hover:text-[#D9534F] text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar Akun
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#E1EBDD] pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#4D9954] text-white shadow-xs'
                : 'text-[#718071] hover:text-[#243528] hover:bg-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Riwayat Pesanan ({myOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#4D9954] text-white shadow-xs'
                : 'text-[#718071] hover:text-[#243528] hover:bg-white'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Informasi Profil</span>
          </button>
        </div>

        {/* TAB 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.length > 0 ? (
              myOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#E1EBDD] p-5 shadow-xs hover:border-[#8BCF8B] transition-all space-y-4"
                >
                  {/* Order header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E1EBDD]">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[11px] text-[#718071] block">Nomor Transaksi</span>
                        <span className="font-mono font-bold text-sm text-[#243528]">
                          {order.orderNumber}
                        </span>
                      </div>
                      <div className="hidden sm:block text-xs text-[#718071]">
                        • {new Date(order.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-lg border border-[#E1EBDD] text-xs font-semibold text-[#243528] hover:bg-[#F7FBF5] flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#4D9954]" />
                        <span>Rincian</span>
                      </button>
                      <button
                        onClick={() => setReceiptOrder(order)}
                        className="px-3 py-1.5 rounded-lg border border-[#8BCF8B] bg-[#E4F4E4] text-xs font-bold text-[#243528] hover:bg-[#8BCF8B] flex items-center gap-1.5 transition-all shadow-2xs"
                        title="Cetak struk mandiri (pembeli bebas cetak tanpa coretan kasir)"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#4D9954]" />
                        <span>Cetak Struk</span>
                      </button>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD]/60 text-xs">
                        <img
                          src={it.image}
                          alt={it.productName}
                          className="w-11 h-11 rounded-lg object-cover border border-[#E1EBDD] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-[#243528] truncate">{it.productName}</p>
                          <p className="text-[11px] text-[#718071]">
                            {it.quantity} {it.unit} • {formatRupiah(it.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer of order card */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-[#718071]">
                      Kurir: <strong className="text-[#243528]">{order.shippingCourier}</strong> • Pembayaran: <strong className="text-[#243528]">{order.paymentMethod}</strong>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[#718071] mr-1.5">Total Belanja:</span>
                        <span className="font-extrabold text-sm sm:text-base text-[#4D9954]">
                          {formatRupiah(order.total)}
                        </span>
                      </div>

                      {order.status === 'Menunggu' && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-[#D9534F] hover:bg-red-50 border border-red-200 transition-colors"
                        >
                          Batalkan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-[#E1EBDD] p-12 text-center">
                <Package className="w-12 h-12 text-[#718071] mx-auto mb-3" />
                <h3 className="font-bold text-base text-[#243528] mb-1">
                  Belum Ada Riwayat Pesanan
                </h3>
                <p className="text-xs text-[#718071] mb-4">
                  Anda belum pernah memesan produk buah atau sayur di Freshora.
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-5 py-2.5 rounded-xl bg-[#8BCF8B] font-bold text-xs text-[#243528] hover:bg-[#7abe7a]"
                >
                  Mulai Belanja Sekarang
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Profile Information */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#E1EBDD] p-6 max-w-xl shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#243528] pb-3 border-b border-[#E1EBDD]">
              Data Diri & Pengiriman
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <UserIcon className="w-4 h-4 text-[#4D9954] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#718071] block text-xs">Nama Lengkap</span>
                  <span className="font-bold text-[#243528]">{currentUser.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#4D9954] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#718071] block text-xs">Email Akun</span>
                  <span className="font-bold text-[#243528]">{currentUser.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#4D9954] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#718071] block text-xs">Nomor WhatsApp / Telepon</span>
                  <span className="font-bold text-[#243528]">{currentUser.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4D9954] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#718071] block text-xs">Alamat Utama Pengiriman</span>
                  <span className="font-bold text-[#243528]">{currentUser.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Detailed Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E1EBDD] max-h-[90vh] flex flex-col">
            <div className="p-4 bg-[#F7FBF5] border-b border-[#E1EBDD] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#718071] block">Rincian Lengkap Faktur</span>
                <span className="font-mono font-bold text-sm text-[#243528]">
                  #{selectedOrder.orderNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-[#718071] hover:text-[#243528] hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#718071]">Status Saat Ini:</span>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-2">
                <div className="font-bold text-xs text-[#243528]">Item Belanja:</div>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span>{it.quantity}x {it.productName} ({it.unit})</span>
                    <span className="font-semibold text-[#243528]">{formatRupiah(it.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-xs text-[#718071]">
                <div className="flex justify-between">
                  <span>Subtotal Produk</span>
                  <span>{formatRupiah(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim ({selectedOrder.shippingCourier})</span>
                  <span>{formatRupiah(selectedOrder.shippingCost)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#3B8F50]">
                    <span>Potongan Diskon</span>
                    <span>- {formatRupiah(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#243528] pt-2 border-t border-[#E1EBDD]">
                  <span>Total Transaksi</span>
                  <span className="text-[#4D9954]">{formatRupiah(selectedOrder.total)}</span>
                </div>
              </div>

              <div className="text-xs text-[#718071] space-y-1 pt-2 border-t border-[#E1EBDD]">
                <p>Alamat: <strong className="text-[#243528]">{selectedOrder.customerAddress}</strong></p>
                <p>Metode Bayar: <strong className="text-[#243528]">{selectedOrder.paymentMethod}</strong></p>
                {selectedOrder.notes && <p>Catatan: <em>{selectedOrder.notes}</em></p>}
              </div>
            </div>

            <div className="p-4 bg-[#F7FBF5] border-t border-[#E1EBDD] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setReceiptOrder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Struk Transaksi</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E1EBDD] text-xs font-semibold hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cetak Struk Mandiri */}
      {receiptOrder && (
        <ReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
        />
      )}
    </div>
  );
};
