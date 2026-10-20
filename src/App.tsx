import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/Toast';
import { RplPresentationBanner } from './components/common/RplPresentationBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Buyer Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { RplDocPage } from './pages/RplDocPage';
import { AgroFreshSession1Page } from './pages/AgroFreshSession1Page';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

import { ShieldAlert, ArrowLeft } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, currentUser, navigate, switchDemoRole } = useApp();

  const isAdminRoute = currentRoute.startsWith('/admin');

  // Route Guard: Protect admin routes
  const renderAdminRoute = () => {
    if (currentRoute === '/admin/login') {
      return <AdminLoginPage />;
    }

    // Role check: If not admin, require login / show guard
    if (!currentUser || currentUser.role !== 'admin') {
      return (
        <div className="min-h-screen bg-[#F7FBF5] flex items-center justify-center p-4 pt-16">
          <div className="bg-white rounded-3xl border border-[#E1EBDD] p-8 max-w-md w-full text-center shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-[#243528]">
              Akses Terbatas: Administrator
            </h2>
            <p className="text-xs sm:text-sm text-[#718071] leading-relaxed">
              Halaman ini dikhususkan untuk Administrator Freshora. Anda saat ini {currentUser ? `masuk sebagai "${currentUser.name}" (Pembeli)` : 'belum masuk'}.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => switchDemoRole('admin')}
                className="w-full py-2.5 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white font-bold text-xs shadow-xs"
              >
                1-Klik Masuk Sebagai Admin Demo
              </button>
              <button
                onClick={() => navigate('/admin/login')}
                className="w-full py-2.5 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-xs"
              >
                Ke Halaman Login Admin
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-2 rounded-xl text-[#718071] text-xs font-semibold hover:text-[#243528]"
              >
                Kembali ke Toko Pembeli
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentRoute) {
      case '/admin/dashboard':
        return <AdminDashboard />;
      case '/admin/products':
        return <AdminProducts />;
      case '/admin/categories':
        return <AdminCategories />;
      case '/admin/orders':
        return <AdminOrders />;
      case '/admin/customers':
        return <AdminCustomers />;
      case '/admin/reports':
        return <AdminReports />;
      case '/admin/settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  const renderBuyerRoute = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/products':
        return <CatalogPage />;
      case '/cart':
        return <CartPage />;
      case '/checkout':
        return <CheckoutPage />;
      case '/account':
        return <AccountPage />;
      case '/about':
        return <AboutPage />;
      case '/rpl-docs':
        return <RplDocPage />;
      case '/figma-sesi1':
      case '/presentasi-sesi1':
      case '/agrofresh-sesi1':
        return <AgroFreshSession1Page />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FBF5]">
      {/* Interactive Top Guide for Dosen & RPL Presenter */}
      <RplPresentationBanner />
      
      {/* Toast Feedbacks */}
      <ToastContainer />

      {isAdminRoute ? (
        // Dedicated admin area
        renderAdminRoute()
      ) : (
        // Dedicated buyer area with customer navbar & footer
        <>
          <Navbar />
          <main className="flex-1">
            {renderBuyerRoute()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
