import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Check, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

interface ProductFormModalProps {
  productToEdit?: Product | null;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { name: 'Apel Malang', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80' },
  { name: 'Jeruk Segar', url: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=700&q=80' },
  { name: 'Pisang Cavendish', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80' },
  { name: 'Mangga Manis', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80' },
  { name: 'Bayam Hijau', url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=80' },
  { name: 'Brokoli Segar', url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=80' },
  { name: 'Tomat Cherry', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80' },
  { name: 'Wortel Manis', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80' },
  { name: 'Alpukat Mentega', url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=80' },
  { name: 'Kentang Dieng', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80' },
  { name: 'Cabai Merah', url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=80' },
  { name: 'Kangkung Air', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ productToEdit, onClose }) => {
  const { categories, addProduct, updateProduct } = useApp();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState<number>(20000);
  const [stock, setStock] = useState<number>(30);
  const [unit, setUnit] = useState('1 kg');
  const [origin, setOrigin] = useState('Batu, Malang');
  const [farmer, setFarmer] = useState('Kelompok Tani Buah Makmur');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [isOrganic, setIsOrganic] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategoryId(productToEdit.categoryId);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setUnit(productToEdit.unit);
      setOrigin(productToEdit.origin);
      setFarmer(productToEdit.farmer);
      setDescription(productToEdit.description);
      setImage(productToEdit.image);
      setIsOrganic(!!productToEdit.isOrganic);
      setIsFeatured(!!productToEdit.isFeatured);
    } else {
      if (categories.length > 0) {
        setCategoryId(categories[0].id);
      }
    }
  }, [productToEdit, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nama produk wajib diisi';
    if (!categoryId) newErrors.categoryId = 'Pilih kategori produk';
    if (price <= 0) newErrors.price = 'Harga produk harus lebih dari 0';
    if (stock < 0) newErrors.stock = 'Stok tidak boleh bernilai negatif';
    if (!unit.trim()) newErrors.unit = 'Satuan produk wajib diisi';
    if (!image.trim()) newErrors.image = 'Pilih gambar produk';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        name: name.trim(),
        categoryId,
        price,
        stock,
        unit: unit.trim(),
        origin: origin.trim(),
        farmer: farmer.trim(),
        description: description.trim(),
        image: image.trim(),
        isOrganic,
        isFeatured,
      });
    } else {
      addProduct({
        name: name.trim(),
        categoryId,
        price,
        stock,
        unit: unit.trim(),
        origin: origin.trim(),
        farmer: farmer.trim(),
        description: description.trim() || `Produk segar berkualitas ${name} langsung dari petani terpercaya.`,
        image: image.trim(),
        isOrganic,
        isFeatured,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E1EBDD] max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#F7FBF5] border-b border-[#E1EBDD] flex items-center justify-between">
          <h2 className="font-bold text-base text-[#243528]">
            {productToEdit ? 'Edit Data Produk Buah & Sayur' : 'Tambah Produk Baru ke Katalog'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#718071] hover:text-[#243528] hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama Produk */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Nama Produk *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Apel Fuji Manis Segar"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954] ${
                  errors.name ? 'border-[#D9534F] bg-red-50/50' : 'border-[#E1EBDD] bg-[#F7FBF5]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-[#D9534F] mt-1">{errors.name}</p>}
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Kategori Komoditas *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Harga */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Harga (Rp) *
              </label>
              <input
                type="number"
                min={500}
                step={500}
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
              {errors.price && <p className="text-[11px] text-[#D9534F] mt-1">{errors.price}</p>}
            </div>

            {/* Stok */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Stok Tersedia *
              </label>
              <input
                type="number"
                min={0}
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
              {errors.stock && <p className="text-[11px] text-[#D9534F] mt-1">{errors.stock}</p>}
            </div>

            {/* Satuan */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Satuan Jual *
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="1 kg / 1 ikat / 500g"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Asal Daerah */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Daerah Asal Kebun
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Contoh: Batu, Malang / Lembang, Bandung"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>

            {/* Nama Petani / Mitra */}
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Nama Petani / Kelompok Tani
              </label>
              <input
                type="text"
                value={farmer}
                onChange={(e) => setFarmer(e.target.value)}
                placeholder="Contoh: Kelompok Tani Sejahtera"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-[#243528] mb-1">
              Deskripsi Produk
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kualitas, tekstur, rasa, dan manfaat produk..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
            />
          </div>

          {/* Preset Images Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#243528] mb-1 flex items-center justify-between">
              <span>Pilih Gambar Produk dari Pustaka Segar:</span>
              <span className="text-[11px] text-[#718071]">Klik untuk memilih</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-2 max-h-36 overflow-y-auto p-1 border border-[#E1EBDD] rounded-xl bg-[#F7FBF5]">
              {PRESET_IMAGES.map((preset) => {
                const isSelected = image === preset.url;
                return (
                  <div
                    key={preset.name}
                    onClick={() => setImage(preset.url)}
                    className={`relative rounded-lg overflow-hidden border cursor-pointer aspect-square ${
                      isSelected ? 'ring-2 ring-[#4D9954] border-[#4D9954]' : 'border-gray-200 opacity-80 hover:opacity-100'
                    }`}
                    title={preset.name}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#4D9954]/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom URL Input */}
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Atau tempel URL gambar custom disini..."
              className="w-full px-3 py-2 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs text-[#243528] focus:outline-none focus:border-[#4D9954]"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#E1EBDD]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#243528]">
              <input
                type="checkbox"
                checked={isOrganic}
                onChange={(e) => setIsOrganic(e.target.checked)}
                className="w-4 h-4 accent-[#4D9954]"
              />
              <span>Tandai sebagai 100% Organik</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#243528]">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#4D9954]"
              />
              <span>Tampilkan di Produk Unggulan</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-[#E1EBDD] flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs font-semibold text-[#718071] hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs shadow-xs"
            >
              {productToEdit ? 'Simpan Perubahan' : 'Tambahkan ke Katalog'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
