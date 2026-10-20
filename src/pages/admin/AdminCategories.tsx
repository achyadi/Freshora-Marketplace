import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Category } from '../../types';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Apple, 
  Salad, 
  Carrot, 
  Sparkles, 
  Leaf,
  Layers
} from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Apple');
  const [error, setError] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="w-5 h-5 text-[#4D9954]" />;
      case 'Salad':
        return <Salad className="w-5 h-5 text-[#4D9954]" />;
      case 'Carrot':
        return <Carrot className="w-5 h-5 text-[#4D9954]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#4D9954]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#4D9954]" />;
    }
  };

  const handleOpenAdd = () => {
    setCategoryToEdit(null);
    setName('');
    setDescription('');
    setIcon('Apple');
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setCategoryToEdit(c);
    setName(c.name);
    setDescription(c.description);
    setIcon(c.icon);
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama kategori wajib diisi');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (categoryToEdit) {
      updateCategory(categoryToEdit.id, {
        name: name.trim(),
        slug,
        description: description.trim(),
        icon,
      });
    } else {
      addCategory({
        name: name.trim(),
        slug,
        description: description.trim() || 'Kategori komoditas pertanian segar',
        icon,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <AdminLayout 
      activeNav="categories" 
      title="Manajemen Kategori Komoditas" 
      subtitle="Kelola kelompok klasifikasi buah dan sayuran di marketplace Freshora."
    >
      <div className="space-y-6">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#243528]">
              Daftar Kategori ({categories.length})
            </h2>
            <p className="text-xs text-[#718071]">
              Kategori yang memiliki produk aktif tidak dapat dihapus sembarangan untuk integritas data.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length;
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-[#E1EBDD] p-5 shadow-2xs hover:border-[#8BCF8B] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E4F4E4] flex items-center justify-center">
                      {getIcon(c.icon)}
                    </div>
                    <span className="text-xs font-bold text-[#4D9954] bg-[#F7FBF5] px-2.5 py-1 rounded-full border border-[#E1EBDD]">
                      {count} Produk Terdaftar
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#243528]">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#718071] leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E1EBDD] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#718071]">
                    slug: /{c.slug}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 rounded-lg border border-[#E1EBDD] text-[#718071] hover:text-[#4D9954] hover:bg-[#F7FBF5]"
                      title="Edit Kategori"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="p-1.5 rounded-lg border border-[#E1EBDD] text-[#718071] hover:text-[#D9534F] hover:bg-red-50"
                      title="Hapus Kategori"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E1EBDD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E1EBDD]">
              <h3 className="font-bold text-base text-[#243528]">
                {categoryToEdit ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#718071] hover:text-[#243528]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#243528] mb-1">
                  Nama Kategori *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Buah Tropis Eksotis"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                />
                {error && <p className="text-[11px] text-[#D9534F] mt-1">{error}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#243528] mb-1">
                  Ikon Representasi
                </label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                >
                  <option value="Apple">Buah (Apple)</option>
                  <option value="Salad">Sayuran Daun (Salad)</option>
                  <option value="Carrot">Sayuran Buah & Umbi (Carrot)</option>
                  <option value="Sparkles">Organik Pilihan (Sparkles)</option>
                  <option value="Leaf">Daun Alami (Leaf)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#243528] mb-1">
                  Deskripsi Kategori
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan singkat jenis produk dalam kategori ini..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-semibold text-[#718071]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs"
                >
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
