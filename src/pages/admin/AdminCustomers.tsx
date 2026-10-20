import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { User, Order } from '../../types';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  CheckCircle2, 
  Eye, 
  X,
  Calendar
} from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { users, orders } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  // Filter only buyers
  const buyers = users.filter((u) => u.role === 'buyer');

  const filteredBuyers = buyers.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q)
    );
  });

  // Calculate customer orders & total spend
  const getCustomerMetrics = (user: User) => {
    const userOrders = orders.filter(
      (o) => o.userId === user.id || o.customerEmail.toLowerCase() === user.email.toLowerCase()
    );
    const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
    return {
      orderCount: userOrders.length,
      totalSpent,
      userOrders,
    };
  };

  return (
    <AdminLayout 
      activeNav="customers" 
      title="Manajemen Akun Pembeli" 
      subtitle="Kelola data pelanggan terdaftar, riwayat transaksi, dan alamat pengiriman."
    >
      <div className="space-y-6">
        
        {/* Search */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#718071] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, email, nomor HP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
            />
          </div>

          <div className="text-xs text-[#718071]">
            Total Pembeli Terdaftar: <strong className="text-[#243528]">{buyers.length} orang</strong>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E1EBDD] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7FBF5] border-b border-[#E1EBDD] text-[#718071] font-semibold text-xs">
                <tr>
                  <th className="py-3 px-4">Nama Pelanggan</th>
                  <th className="py-3 px-4">Kontak (Email / Telp)</th>
                  <th className="py-3 px-4">Alamat Pengiriman</th>
                  <th className="py-3 px-4">Total Pesanan</th>
                  <th className="py-3 px-4">Akumulasi Belanja</th>
                  <th className="py-3 px-4">Status Akun</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1EBDD]">
                {filteredBuyers.map((buyer) => {
                  const { orderCount, totalSpent } = getCustomerMetrics(buyer);
                  return (
                    <tr key={buyer.id} className="hover:bg-[#F7FBF5]/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#E4F4E4] text-[#4D9954] flex items-center justify-center font-bold text-xs shrink-0">
                            {buyer.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-[#243528] block">
                              {buyer.name}
                            </span>
                            <span className="text-[11px] text-[#718071]">
                              ID: {buyer.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[#243528] block font-medium">
                          {buyer.email}
                        </span>
                        <span className="text-[11px] text-[#718071] block">
                          {buyer.phone}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-xs text-[#718071] max-w-[200px] truncate">
                        {buyer.address}
                      </td>

                      <td className="py-3 px-4 font-semibold text-[#243528]">
                        {orderCount} Pesanan
                      </td>

                      <td className="py-3 px-4 font-extrabold text-[#4D9954]">
                        {formatRupiah(totalSpent)}
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3B8F50] bg-[#E4F4E4] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Aktif
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedCustomer(buyer)}
                          className="px-3 py-1.5 rounded-lg border border-[#E1EBDD] bg-white text-xs font-semibold text-[#243528] hover:bg-[#F7FBF5] inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#4D9954]" />
                          <span>Riwayat</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Customer Detail & Orders Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E1EBDD] max-h-[90vh] flex flex-col">
            <div className="p-4 bg-[#F7FBF5] border-b border-[#E1EBDD] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#718071] block">Profil Pelanggan</span>
                <span className="font-bold text-base text-[#243528]">
                  {selectedCustomer.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg text-[#718071] hover:text-[#243528]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#4D9954]" />
                  <span>Email: <strong>{selectedCustomer.email}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#4D9954]" />
                  <span>Telepon: <strong>{selectedCustomer.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#4D9954]" />
                  <span>Alamat: <strong>{selectedCustomer.address}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#243528] mb-2">
                  Daftar Transaksi Pelanggan:
                </h4>
                {getCustomerMetrics(selectedCustomer).userOrders.length > 0 ? (
                  <div className="space-y-2">
                    {getCustomerMetrics(selectedCustomer).userOrders.map((ord) => (
                      <div key={ord.id} className="p-3 rounded-xl border border-[#E1EBDD] flex justify-between items-center text-xs">
                        <div>
                          <span className="font-mono font-bold text-[#243528] block">#{ord.orderNumber}</span>
                          <span className="text-[11px] text-[#718071]">{ord.items.length} item • Status: {ord.status}</span>
                        </div>
                        <span className="font-bold text-[#4D9954]">{formatRupiah(ord.total)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#718071]">Belum ada transaksi yang dibuat oleh pelanggan ini.</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#F7FBF5] border-t border-[#E1EBDD] text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E1EBDD] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
