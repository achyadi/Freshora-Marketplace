import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { Product } from '../../types';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  X,
  Package,
  Layers
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, categories, deleteProduct } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // all, low, out
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  // Delete confirm modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.farmer.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (categoryFilter !== 'all' && p.categoryId !== categoryFilter) {
        return false;
      }

      if (stockFilter === 'low' && (p.stock > 15 || p.stock <= 0)) return false;
      if (stockFilter === 'out' && p.stock > 0) return false;

      return true;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setProductToEdit(p);
    setIsFormOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <AdminLayout 
      activeNav="products" 
      title="Manajemen Produk Buah & Sayuran" 
      subtitle="Kelola ketersediaan stok, harga jual, foto komoditas, dan kelompok tani mitra."
    >
      <div className="space-y-6">
        
        {/* Top Controls: Search, Filter & Add Button */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1EBDD] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-1">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#718071] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari komoditas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-44 px-3 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
            >
              <option value="all">Semua Stok</option>
              <option value="low">Stok Menipis (&le; 15)</option>
              <option value="out">Stok Habis (0)</option>
            </select>
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Komoditas Baru</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-[#E1EBDD] shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#E1EBDD] flex items-center justify-between text-xs text-[#718071]">
            <span>Menampilkan <strong>{filteredProducts.length}</strong> produk komoditas</span>
            <span>Semua pembaruan tersinkronisasi instan ke etalase pembeli</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7FBF5] border-b border-[#E1EBDD] text-[#718071] font-semibold text-xs">
                <tr>
                  <th className="py-3 px-4">Komoditas Produk</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga / Satuan</th>
                  <th className="py-3 px-4">Stok Gudang</th>
                  <th className="py-3 px-4">Mitra Kebun & Asal</th>
                  <th className="py-3 px-4">Terjual</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1EBDD]">
                {filteredProducts.map((p) => {
                  const isLow = p.stock > 0 && p.stock <= 15;
                  const isOut = p.stock <= 0;

                  return (
                    <tr key={p.id} className="hover:bg-[#F7FBF5]/70 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E1EBDD] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-[#243528] block">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {p.isOrganic && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#4D9954] bg-[#E4F4E4] px-1.5 py-0.5 rounded">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  Organik
                                </span>
                              )}
                              {p.isFeatured && (
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                                  Unggulan
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-[#718071]">
                        {p.categoryName || 'Komoditas'}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-[#4D9954]">
                          {formatRupiah(p.price)}
                        </span>
                        <span className="text-[11px] text-[#718071] block">
                          / {p.unit}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4">
                        {isOut ? (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-[#D9534F]">
                            Habis (0)
                          </span>
                        ) : isLow ? (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">
                            {p.stock} {p.unit} (Menipis)
                          </span>
                        ) : (
                          <span className="font-semibold text-[#243528]">
                            {p.stock} {p.unit}
                          </span>
                        )}
                      </td>

                      {/* Origin & Farmer */}
                      <td className="py-3 px-4 text-xs">
                        <span className="font-medium text-[#243528] block truncate max-w-[150px]">
                          {p.farmer}
                        </span>
                        <span className="text-[11px] text-[#718071] block truncate max-w-[150px]">
                          {p.origin}
                        </span>
                      </td>

                      {/* Sold */}
                      <td className="py-3 px-4 text-[#718071] font-medium">
                        {p.soldCount} {p.unit}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg border border-[#E1EBDD] text-[#718071] hover:text-[#4D9954] hover:bg-white"
                            title="Edit Data Produk"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(p)}
                            className="p-1.5 rounded-lg border border-[#E1EBDD] text-[#718071] hover:text-[#D9534F] hover:bg-red-50"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={() => {
            setIsFormOpen(false);
            setProductToEdit(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal as requested */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#E1EBDD] space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#D9534F] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#243528]">
                Konfirmasi Hapus Produk?
              </h3>
              <p className="text-xs text-[#718071] mt-1">
                Apakah Anda yakin ingin menghapus <strong>&quot;{productToDelete.name}&quot;</strong> dari katalog? Produk ini tidak akan lagi muncul di etalase pembeli.
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-[#718071] font-semibold text-xs hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-[#D9534F] text-white font-bold text-xs hover:bg-red-600 shadow-xs"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
