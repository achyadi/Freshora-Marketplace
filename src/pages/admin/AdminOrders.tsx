import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Order, OrderStatus } from '../../types';
import { 
  Search, 
  Eye, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  X,
  CreditCard,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Printer
} from 'lucide-react';
import { ReceiptModal } from '../../components/common/ReceiptModal';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Menunggu':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Menunggu</span>;
      case 'Diproses':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">Diproses</span>;
      case 'Dikirim':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">Dikirim</span>;
      case 'Selesai':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E4F4E4] text-[#3B8F50] border border-[#8BCF8B]">Selesai</span>;
      case 'Dibatalkan':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-[#D9534F] border border-red-200">Dibatalkan</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (statusFilter !== 'all' && o.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter]);

  return (
    <AdminLayout 
      activeNav="orders" 
      title="Manajemen Pesanan Masuk" 
      subtitle="Pantau alur transaksi dan perbarui status pemenuhan buah & sayuran secara realtime."
    >
      <div className="space-y-6">
        
        {/* Search & Status Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-1">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#718071] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari no. faktur / nama pembeli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['all', 'Menunggu', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? 'bg-[#4D9954] text-white'
                      : 'bg-[#F7FBF5] text-[#718071] border border-[#E1EBDD] hover:text-[#243528]'
                  }`}
                >
                  {st === 'all' ? 'Semua Status' : st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#E1EBDD] shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#E1EBDD] flex items-center justify-between text-xs text-[#718071]">
            <span>Menampilkan <strong>{filteredOrders.length}</strong> transaksi pesanan</span>
            <span className="font-semibold text-[#4D9954]">
              Total Nilai: {formatRupiah(filteredOrders.reduce((sum, o) => sum + o.total, 0))}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7FBF5] border-b border-[#E1EBDD] text-[#718071] font-semibold text-xs">
                <tr>
                  <th className="py-3 px-4">No. Pesanan & Tanggal</th>
                  <th className="py-3 px-4">Data Pembeli</th>
                  <th className="py-3 px-4">Ringkasan Item</th>
                  <th className="py-3 px-4">Pengiriman & Bayar</th>
                  <th className="py-3 px-4">Total Tagihan</th>
                  <th className="py-3 px-4">Status Pesanan</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1EBDD]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7FBF5]/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#243528] block">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-[#718071]">
                        {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-[#243528] block">
                        {ord.customerName}
                      </span>
                      <span className="text-[11px] text-[#718071] block">
                        {ord.customerPhone}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-xs">
                      <span className="font-semibold text-[#243528]">
                        {ord.items.length} Macam Komoditas
                      </span>
                      <span className="text-[11px] text-[#718071] block truncate max-w-[160px]">
                        {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-xs">
                      <span className="text-[#243528] block font-medium truncate max-w-[150px]">
                        {ord.shippingCourier.split('(')[0]}
                      </span>
                      <span className="text-[11px] text-[#718071] block">
                        {ord.paymentMethod.split('(')[0]}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-extrabold text-sm text-[#4D9954]">
                        {formatRupiah(ord.total)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-xl border border-[#E1EBDD] bg-white text-xs text-[#243528] font-bold shadow-2xs focus:outline-none focus:border-[#4D9954]"
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 rounded-lg border border-[#E1EBDD] bg-white text-xs font-semibold text-[#243528] hover:bg-[#F7FBF5] inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#4D9954]" />
                        <span>Rincian</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E1EBDD] max-h-[90vh] flex flex-col">
            <div className="p-4 bg-[#F7FBF5] border-b border-[#E1EBDD] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#718071] block">Faktur Transaksi Pelanggan</span>
                <span className="font-mono font-bold text-base text-[#243528]">
                  #{selectedOrder.orderNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-[#718071] hover:text-[#243528]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E1EBDD]">
                <div>
                  <span className="text-xs text-[#718071] block">Ubah Status Langsung:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newSt = e.target.value as OrderStatus;
                      updateOrderStatus(selectedOrder.id, newSt);
                      setSelectedOrder({ ...selectedOrder, status: newSt });
                    }}
                    className="mt-1 px-3 py-1.5 rounded-xl border border-[#8BCF8B] bg-[#E4F4E4] font-bold text-xs text-[#243528]"
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Dikirim">Dikirim</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              {/* Data Pembeli */}
              <div className="bg-[#F7FBF5] p-3.5 rounded-xl border border-[#E1EBDD] space-y-1.5 text-xs">
                <div className="font-bold text-[#243528] mb-1">Informasi Pengiriman:</div>
                <div>Nama: <strong>{selectedOrder.customerName}</strong></div>
                <div>No. Telp / WA: <strong>{selectedOrder.customerPhone}</strong></div>
                <div>Email: <strong>{selectedOrder.customerEmail}</strong></div>
                <div>Alamat: <strong>{selectedOrder.customerAddress}</strong></div>
                {selectedOrder.notes && <div>Catatan: <em>{selectedOrder.notes}</em></div>}
              </div>

              {/* Rincian Item */}
              <div className="space-y-2">
                <span className="font-bold text-xs text-[#243528]">Komoditas Dipesan:</span>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#F7FBF5] text-xs">
                    <div className="flex items-center gap-2">
                      <img src={it.image} alt={it.productName} className="w-8 h-8 rounded object-cover" />
                      <span>{it.quantity}x {it.productName} ({it.unit})</span>
                    </div>
                    <span className="font-semibold text-[#243528]">{formatRupiah(it.subtotal)}</span>
                  </div>
                ))}
              </div>

              {/* Ringkasan Biaya */}
              <div className="pt-2 border-t border-[#E1EBDD] space-y-1.5 text-xs text-[#718071]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatRupiah(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim ({selectedOrder.shippingCourier})</span>
                  <span>{formatRupiah(selectedOrder.shippingCost)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#3B8F50]">
                    <span>Diskon</span>
                    <span>- {formatRupiah(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm text-[#243528] pt-2 border-t border-[#E1EBDD]">
                  <span>Total Tagihan</span>
                  <span className="text-[#4D9954]">{formatRupiah(selectedOrder.total)}</span>
                </div>
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
                <span>Cetak Struk Pelanggan</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E1EBDD] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cetak Struk */}
      {receiptOrder && (
        <ReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
        />
      )}
    </AdminLayout>
  );
};
