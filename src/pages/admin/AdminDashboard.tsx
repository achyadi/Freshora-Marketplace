import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Eye, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, orders, users, navigate, updateOrderStatus } = useApp();

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  // Metrics
  const totalSales = orders
    .filter((o) => o.status !== 'Dibatalkan')
    .reduce((sum, o) => sum + o.total, 0);

  const totalBuyers = users.filter((u) => u.role === 'buyer').length;
  const lowStockProducts = products.filter((p) => p.stock <= 15);
  const recentOrders = orders.slice(0, 5);

  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Menunggu</span>;
      case 'Diproses':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Diproses</span>;
      case 'Dikirim':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">Dikirim</span>;
      case 'Selesai':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E4F4E4] text-[#3B8F50]">Selesai</span>;
      case 'Dibatalkan':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-[#D9534F]">Dibatalkan</span>;
      default:
        return <span className="text-xs">{status}</span>;
    }
  };

  // Weekly sales mock data points based on actual orders
  const weeklyData = [
    { day: 'Sen', amount: 320000, height: '45%' },
    { day: 'Sel', amount: 480000, height: '65%' },
    { day: 'Rab', amount: 290000, height: '40%' },
    { day: 'Kam', amount: 560000, height: '75%' },
    { day: 'Jum', amount: 720000, height: '90%' },
    { day: 'Sab', amount: 890000, height: '100%' },
    { day: 'Min', amount: 640000, height: '80%' },
  ];

  return (
    <AdminLayout 
      activeNav="dashboard" 
      title="Ringkasan Kinerja Pasar Freshora" 
      subtitle="Pantau volume transaksi, stok komoditas kebun, dan pesanan pelanggan secara realtime."
    >
      <div className="space-y-6">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Total Penjualan */}
          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#718071]">Total Penjualan</span>
              <div className="w-9 h-9 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#243528]">
              {formatRupiah(totalSales)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#3B8F50] font-semibold mt-1">
              <span>+18.4%</span>
              <span className="text-[#718071] font-normal">dari pekan lalu</span>
            </div>
          </div>

          {/* Total Pesanan */}
          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#718071]">Total Pesanan Masuk</span>
              <div className="w-9 h-9 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#243528]">
              {orders.length} Transaksi
            </div>
            <div className="text-[11px] text-[#718071] mt-1">
              {orders.filter((o) => o.status === 'Menunggu').length} pesanan butuh konfirmasi
            </div>
          </div>

          {/* Total Produk */}
          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#718071]">Komoditas Aktif</span>
              <div className="w-9 h-9 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#243528]">
              {products.length} Produk
            </div>
            <div className="text-[11px] text-[#D9534F] font-semibold mt-1">
              {lowStockProducts.length} produk stok menipis
            </div>
          </div>

          {/* Total Pembeli */}
          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#718071]">Pelanggan Terdaftar</span>
              <div className="w-9 h-9 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#243528]">
              {totalBuyers} Pembeli
            </div>
            <div className="text-[11px] text-[#718071] mt-1">
              100% data aktif terhubung
            </div>
          </div>

        </div>

        {/* Middle Row: Visual Sales Chart & Low Stock Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sales Trends Chart */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-[#E1EBDD] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base text-[#243528]">
                    Grafik Tren Penjualan Komoditas Pekan Ini
                  </h3>
                  <p className="text-xs text-[#718071]">
                    Rata-rata penjualan harian buah & sayur segar mencapai {formatRupiah(520000)}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#4D9954] bg-[#E4F4E4] px-2.5 py-1 rounded-lg">
                  Minggu Ini
                </span>
              </div>

              {/* Chart Bars */}
              <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-[#E1EBDD]">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-[#243528] text-white py-0.5 px-1.5 rounded font-mono">
                      {formatRupiah(d.amount)}
                    </div>
                    <div
                      style={{ height: d.height }}
                      className="w-full max-w-[36px] bg-[#8BCF8B] group-hover:bg-[#4D9954] rounded-t-lg transition-all"
                    />
                    <span className="text-xs font-semibold text-[#718071] group-hover:text-[#243528]">
                      {d.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between text-xs text-[#718071]">
              <span>* Data otomatis disimulasikan dari akumulasi pesanan pasar Freshora</span>
              <button 
                onClick={() => navigate('/admin/reports')} 
                className="text-[#4D9954] font-bold hover:underline"
              >
                Buka Laporan Lengkap &rarr;
              </button>
            </div>
          </div>

          {/* Low Stock Alert Box */}
          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E1EBDD] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-[#243528] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#E09F3E]" />
                  Peringatan Stok Menipis
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {lowStockProducts.length} Komoditas
                </span>
              </div>
              <p className="text-xs text-[#718071] mb-3">
                Komoditas di bawah batas aman (&le; 15 unit). Segera hubungi petani untuk panen ulang.
              </p>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 rounded-lg object-cover border border-[#E1EBDD] shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-[#243528] truncate">{p.name}</div>
                        <div className="text-[10px] text-[#718071]">{p.farmer}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-[#D9534F] block">
                        Sisa {p.stock} {p.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/products')}
              className="mt-4 w-full py-2 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] text-xs font-bold text-[#243528] transition-all text-center"
            >
              Kelola & Tambah Stok Produk
            </button>
          </div>

        </div>

        {/* Bottom Row: Recent Orders Table */}
        <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-[#243528]">
                Pesanan Masuk Terbaru
              </h3>
              <p className="text-xs text-[#718071]">
                Perubahan status pesanan di sini langsung terefleksi di aplikasi akun pembeli.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-bold text-[#4D9954] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              Lihat Seluruh Pesanan ({orders.length}) &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E1EBDD] text-[#718071] text-xs font-semibold">
                  <th className="pb-3 font-semibold">No. Pesanan</th>
                  <th className="pb-3 font-semibold">Nama Pembeli</th>
                  <th className="pb-3 font-semibold">Komoditas</th>
                  <th className="pb-3 font-semibold">Total Tagihan</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Ubah Status Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1EBDD]">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7FBF5]/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-[#243528]">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3 font-semibold text-[#243528]">
                      {ord.customerName}
                    </td>
                    <td className="py-3 text-[#718071]">
                      {ord.items.length} item ({ord.items.map((i) => i.productName).join(', ').slice(0, 24)}...)
                    </td>
                    <td className="py-3 font-extrabold text-[#4D9954]">
                      {formatRupiah(ord.total)}
                    </td>
                    <td className="py-3">
                      {getStatusBadge(ord.status)}
                    </td>
                    <td className="py-3 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg border border-[#E1EBDD] bg-white text-xs text-[#243528] font-medium focus:outline-none focus:border-[#4D9954]"
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
