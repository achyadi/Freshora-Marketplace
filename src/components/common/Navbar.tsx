import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  ShoppingCart, 
  User as UserIcon, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldAlert,
  FileCode2,
  LogOut,
  PackageCheck,
  FolderArchive,
  Download,
  Settings,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    cartItemCount, 
    navigate, 
    currentRoute, 
    logout,
    showPresentationBanner,
    theme,
    toggleTheme
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
      setShowSearchModal(false);
    }
  };

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Katalog Produk', path: '/products' },
    { label: 'Figma & PPT Sesi 1', path: '/figma-sesi1' },
    { label: 'Tentang Kami', path: '/about' },
    { label: 'Dokumentasi RPL', path: '/rpl-docs' },
  ];

  return (
    <>
      <header className={`sticky ${showPresentationBanner ? 'top-[35px]' : 'top-0'} z-30 bg-white/95 backdrop-blur-md border-b border-[#E1EBDD] transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Brand Logo */}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8BCF8B] to-[#4D9954] flex items-center justify-center text-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#243528] flex items-center gap-1">
                  Freshora
                  <span className="w-2 h-2 rounded-full bg-[#4D9954] inline-block animate-pulse"></span>
                </span>
                <span className="text-[10px] text-[#718071] block font-medium -mt-1 tracking-wide">
                  Segar dari Alam
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-[#243528] bg-[#E4F4E4] font-bold'
                        : 'text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: Search, Cart, Account */}
            <div className="flex items-center gap-2.5">
              
              {/* Unduh ZIP Localhost button */}
              <a
                href="/freshora-project.zip"
                download="freshora-project.zip"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] hover:bg-[#E4F4E4] text-xs font-bold text-[#4D9954] transition-all shadow-2xs"
                title="Unduh Paket ZIP Lengkap untuk Localhost"
              >
                <FolderArchive className="w-3.5 h-3.5" />
                <span>ZIP Localhost</span>
              </a>

              {/* Search Button */}
              <button
                onClick={() => {
                  navigate('/products');
                }}
                className="p-2.5 rounded-xl text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5] transition-all"
                title="Cari Buah & Sayuran"
                aria-label="Cari produk"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2.5 rounded-xl text-[#243528] hover:bg-[#F7FBF5] transition-all"
                title="Keranjang Belanja"
                aria-label="Buka Keranjang"
              >
                <ShoppingCart className="w-5 h-5 text-[#243528]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-[#4D9954] text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-in zoom-in-50">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5] transition-all flex items-center justify-center group"
                title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
                aria-label="Ubah tema gelap atau terang"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-90 transition-transform" />
                ) : (
                  <Moon className="w-5 h-5 text-[#243528] group-hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Pengaturan Sistem & Mode Demonstrasi */}
              <button
                onClick={() => navigate('/admin/settings')}
                className="p-2.5 rounded-xl text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5] transition-all"
                title="Pengaturan Sistem & Demonstrasi RPL"
                aria-label="Buka Pengaturan Sistem"
              >
                <Settings className="w-5 h-5 text-[#243528]" />
              </button>

              {/* User Account / Admin Switch */}
              {currentUser ? (
                <div className="flex items-center gap-1.5">
                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => navigate('/admin/dashboard')}
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#4D9954] text-white text-xs font-semibold hover:bg-[#3d7a43] shadow-sm transition-all"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Dashboard Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/account')}
                      className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] text-[#243528] text-xs font-semibold transition-all"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#4D9954]" />
                      <span className="max-w-[100px] truncate">{currentUser.name}</span>
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/account')}
                    className="p-2 rounded-xl sm:hidden text-[#718071] hover:text-[#243528]"
                    title="Akun Saya"
                  >
                    <UserIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={logout}
                    className="p-2 rounded-xl text-[#718071] hover:text-[#D9534F] hover:bg-red-50 transition-all"
                    title="Keluar"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/account')}
                  className="px-4 py-2 rounded-xl bg-[#8BCF8B] text-[#243528] text-xs sm:text-sm font-bold hover:bg-[#7abe7a] shadow-sm transition-all"
                >
                  Masuk / Daftar
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E1EBDD] bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari apel, tomat, bayam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate('/products');
                    setMobileMenuOpen(false);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-[#F7FBF5] border border-[#E1EBDD] rounded-xl text-sm focus:outline-none focus:border-[#4D9954]"
              />
            </div>
            
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentRoute === link.path
                    ? 'bg-[#E4F4E4] text-[#243528] font-bold'
                    : 'text-[#718071] hover:bg-[#F7FBF5]'
                }`}
              >
                {link.label}
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <div className="pt-2 border-t border-[#E1EBDD] flex flex-col gap-2">
              {currentUser?.role === 'admin' ? (
                <button
                  onClick={() => {
                    navigate('/admin/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-[#4D9954] text-white text-sm font-bold shadow-sm"
                >
                  Buka Dashboard Admin
                </button>
              ) : currentUser ? (
                <button
                  onClick={() => {
                    navigate('/account');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-[#243528] text-sm font-bold"
                >
                  Akun & Riwayat Pesanan
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/account');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-[#8BCF8B] text-[#243528] text-sm font-bold"
                >
                  Masuk / Registrasi Akun
                </button>
              )}

              {/* Mobile Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full text-center py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-[#243528] text-sm font-bold flex items-center justify-center gap-2"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#243528]" />}
                <span>{theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/admin/settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-[#243528] text-sm font-bold flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4 text-[#4D9954]" />
                Pengaturan Sistem & RPL
              </button>

              <a
                href="/freshora-project.zip"
                download="freshora-project.zip"
                className="w-full text-center py-2.5 rounded-xl bg-[#F7FBF5] border border-[#8BCF8B] text-[#4D9954] text-sm font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Unduh ZIP Proyek (Localhost)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
