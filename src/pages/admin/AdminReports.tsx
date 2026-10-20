import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Download, 
  Printer, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  ArrowUpRight,
  Sparkles,
  BarChart2
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, products, addToast } = useApp();

  const [dateFilter, setDateFilter] = useState<'7days' | '30days' | 'all'>('all');

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  // Filter valid completed/active orders
  const validOrders = orders.filter((o) => o.status !== 'Dibatalkan');

  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = validOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0),
    0
  );
  const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

  // Commodity breakdown
  const commodityTotals = products.map((p) => {
    let soldQty = 0;
    let revenue = 0;
    validOrders.forEach((o) => {
      o.items.forEach((it) => {
        if (it.productId === p.id) {
          soldQty += it.quantity;
          revenue += it.subtotal;
        }
      });
    });
    return {
      product: p,
      soldQty,
      revenue,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer', 'Items Count', 'Status', 'Total'];
    const rows = validOrders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString('id-ID'),
      `"${o.customerName}"`,
      o.items.length,
      o.status,
      o.total,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Penjualan_Freshora_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Laporan penjualan CSV berhasil diunduh.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout 
      activeNav="reports" 
      title="Laporan & Analisis Penjualan" 
      subtitle="Analisis performa pendapatan pasar, komoditas terlaris, dan rincian transaksi."
    >
      <div className="space-y-6">
        
        {/* Top Filter and Export Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#718071]">Rentang Waktu:</span>
            <div className="flex items-center bg-[#F7FBF5] p-1 rounded-xl border border-[#E1EBDD]">
              <button
                onClick={() => setDateFilter('7days')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  dateFilter === '7days' ? 'bg-[#4D9954] text-white' : 'text-[#718071] hover:text-[#243528]'
                }`}
              >
                7 Hari Terakhir
              </button>
              <button
                onClick={() => setDateFilter('30days')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  dateFilter === '30days' ? 'bg-[#4D9954] text-white' : 'text-[#718071] hover:text-[#243528]'
                }`}
              >
                30 Hari Terakhir
              </button>
              <button
                onClick={() => setDateFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  dateFilter === 'all' ? 'bg-[#4D9954] text-white' : 'text-[#718071] hover:text-[#243528]'
                }`}
              >
                Semua Data
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E1EBDD] hover:bg-gray-50 text-[#243528] text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4 text-[#718071]" />
              <span>Cetak Laporan</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <span className="text-xs text-[#718071] block mb-1">Total Omzet Penjualan</span>
            <div className="text-2xl font-extrabold text-[#4D9954]">
              {formatRupiah(totalRevenue)}
            </div>
            <span className="text-[11px] text-[#718071] mt-1 block">
              Dari {validOrders.length} transaksi berhasil
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <span className="text-xs text-[#718071] block mb-1">Total Unit Terjual</span>
            <div className="text-2xl font-extrabold text-[#243528]">
              {totalItemsSold} Satuan
            </div>
            <span className="text-[11px] text-[#718071] mt-1 block">
              Buah & sayuran segar terdistribusi
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs">
            <span className="text-xs text-[#718071] block mb-1">Rata-Rata Nilai Keranjang (AOV)</span>
            <div className="text-2xl font-extrabold text-[#243528]">
              {formatRupiah(averageOrderValue)}
            </div>
            <span className="text-[11px] text-[#718071] mt-1 block">
              Nilai per transaksi pelanggan
            </span>
          </div>
        </div>

        {/* Top Commodities Performance */}
        <div className="bg-white rounded-2xl border border-[#E1EBDD] p-5 sm:p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-base text-[#243528]">
            Peringkat Kontribusi Komoditas Terlaris
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commodityTotals.slice(0, 6).map((ct, idx) => (
              <div
                key={ct.product.id}
                className="p-3.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-[#E4F4E4] text-[#4D9954] font-bold flex items-center justify-center shrink-0 text-xs">
                    #{idx + 1}
                  </span>
                  <img
                    src={ct.product.image}
                    alt={ct.product.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#E1EBDD] shrink-0"
                  />
                  <div className="truncate">
                    <span className="font-bold text-[#243528] block truncate">
                      {ct.product.name}
                    </span>
                    <span className="text-[11px] text-[#718071]">
                      {ct.product.farmer}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-[#4D9954] block">
                    {formatRupiah(ct.revenue)}
                  </span>
                  <span className="text-[11px] text-[#718071]">
                    {ct.soldQty} {ct.product.unit} terjual
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Ledger Table */}
        <div className="bg-white rounded-2xl border border-[#E1EBDD] shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#E1EBDD]">
            <h4 className="font-bold text-sm text-[#243528]">
              Buku Transaksi Penjualan Lengkap
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7FBF5] border-b border-[#E1EBDD] text-[#718071] font-semibold text-xs">
                <tr>
                  <th className="py-3 px-4">No. Faktur</th>
                  <th className="py-3 px-4">Tanggal Transaksi</th>
                  <th className="py-3 px-4">Pelanggan</th>
                  <th className="py-3 px-4">Metode Bayar</th>
                  <th className="py-3 px-4">Subtotal</th>
                  <th className="py-3 px-4">Ongkir</th>
                  <th className="py-3 px-4">Total Akhir</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1EBDD]">
                {validOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7FBF5]/70">
                    <td className="py-3 px-4 font-mono font-bold text-[#243528]">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3 px-4 text-[#718071]">
                      {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#243528]">
                      {ord.customerName}
                    </td>
                    <td className="py-3 px-4 text-[#718071] text-xs">
                      {ord.paymentMethod.split('(')[0]}
                    </td>
                    <td className="py-3 px-4">{formatRupiah(ord.subtotal)}</td>
                    <td className="py-3 px-4 text-[#718071]">{formatRupiah(ord.shippingCost)}</td>
                    <td className="py-3 px-4 font-extrabold text-[#4D9954]">
                      {formatRupiah(ord.total)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-xs text-[#3B8F50]">
                      {ord.status}
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
