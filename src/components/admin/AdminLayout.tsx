import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink, 
  UserCheck, 
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeNav: string; // 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'reports' | 'settings'
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeNav, 
  title, 
  subtitle 
}) => {
  const { currentUser, navigate, logout, switchDemoRole, resetDemoData, showPresentationBanner } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Utama', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Manajemen Produk', path: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { id: 'categories', label: 'Kategori Komoditas', path: '/admin/categories', icon: <Tags className="w-4 h-4" /> },
    { id: 'orders', label: 'Pesanan & Transaksi', path: '/admin/orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'customers', label: 'Data Pelanggan', path: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { id: 'reports', label: 'Laporan Penjualan', path: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Pengaturan Sistem', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen bg-[#F7FBF5] flex flex-col ${showPresentationBanner ? 'pt-[35px]' : 'pt-0'}`}>
      
      {/* Mobile top header for Admin */}
      <header className={`lg:hidden bg-white border-b border-[#E1EBDD] px-4 py-3 flex items-center justify-between sticky ${showPresentationBanner ? 'top-[35px]' : 'top-0'} z-20`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl text-[#718071] hover:bg-[#F7FBF5] hover:text-[#243528]"
            aria-label="Toggle menu sidebar"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4D9954] flex items-center justify-center text-white font-bold">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-[#243528]">Admin Freshora</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-[#4D9954] flex items-center gap-1 hover:underline"
        >
          Lihat Web Pembeli <ExternalLink className="w-3 h-3" />
        </button>
      </header>

      <div className="flex-1 flex">
        
        {/* Sidebar Desktop & Mobile Drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E1EBDD] flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 top-[35px]' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top of Sidebar */}
          <div>
            {/* Admin Brand Badge */}
            <div className="p-5 border-b border-[#E1EBDD] flex items-center justify-between">
              <div 
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8BCF8B] to-[#4D9954] flex items-center justify-center text-white shadow-xs">
                  <Sprout className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-[#243528] block leading-tight">
                    Freshora
                  </span>
                  <span className="text-[10px] text-[#4D9954] font-bold tracking-wide uppercase">
                    Admin Portal
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-[#718071] hover:text-[#243528]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current user mini box */}
            <div className="p-4 mx-3 my-3 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4D9954] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#243528] truncate">
                  {currentUser?.name || 'Admin Freshora'}
                </div>
                <div className="text-[10px] text-[#718071] truncate">
                  Role: Super Administrator
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="px-3 space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#718071] block mb-1">
                Menu Pengelolaan
              </span>
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#E4F4E4] text-[#243528] font-bold border border-[#8BCF8B]/50 shadow-2xs'
                        : 'text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-[#4D9954]' : 'text-[#718071]'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#4D9954]" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar: Switch to Buyer, Reset, and Logout */}
          <div className="p-4 border-t border-[#E1EBDD] space-y-2 bg-[#F7FBF5]">
            <button
              onClick={() => {
                switchDemoRole('buyer');
                setSidebarOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-white border border-[#E1EBDD] hover:border-[#8BCF8B] text-[#243528] text-xs font-semibold flex items-center justify-between shadow-2xs transition-all"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-[#4D9954]" />
                <span>Beralih ke Pembeli</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#718071]" />
            </button>

            <button
              onClick={() => {
                navigate('/');
                setSidebarOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-white border border-[#E1EBDD] hover:bg-white text-[#718071] hover:text-[#243528] text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Halaman Toko</span>
            </button>

            <button
              onClick={logout}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-[#D9534F] hover:bg-red-50 flex items-center gap-2 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Admin</span>
            </button>
          </div>
        </aside>

        {/* Overlay backdrop for mobile drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Admin Header Bar */}
          <div className="bg-white border-b border-[#E1EBDD] px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#243528]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-[#718071] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Top Right Badges */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]/40">
                <span className="w-2 h-2 rounded-full bg-[#4D9954] animate-pulse" />
                Data Demonstrasi RPL - Tersinkronisasi Realtime
              </span>

              <button
                onClick={() => navigate('/')}
                className="px-3.5 py-1.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] hover:border-[#8BCF8B] text-[#243528] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>Halaman Depan</span>
                <ExternalLink className="w-3 h-3 text-[#4D9954]" />
              </button>
            </div>
          </div>

          {/* Child Page Content */}
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
