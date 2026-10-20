import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, navigate, switchDemoRole } = useApp();

  const [email, setEmail] = useState('admin@freshora.demo');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-[#F7FBF5] flex flex-col justify-center items-center p-4 pt-12">
      <div className="max-w-md w-full">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8BCF8B] to-[#4D9954] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            <Sprout className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528]">
            Freshora Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#718071] mt-1">
            Panel Pengelolaan Manajemen Pasar & Transaksi Komoditas
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Quick Demo Access Box */}
          <div className="p-3.5 rounded-2xl bg-[#E4F4E4]/70 border border-[#8BCF8B]/50 text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#243528] mb-1">
              <GraduationCap className="w-4 h-4 text-[#4D9954]" />
              <span>Akses Cepat Pengujian RPL:</span>
            </div>
            <p className="text-[11px] text-[#718071] mb-2 leading-relaxed">
              Klik tombol di bawah untuk langsung mengisikan akun admin resmi demonstrasi.
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@freshora.demo');
                setPassword('admin123');
                switchDemoRole('admin');
              }}
              className="w-full py-2 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>1-Klik Masuk Sebagai Administrator Demo</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Alamat Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#718071] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@freshora.demo"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243528] mb-1">
                Kata Sandi Administrator
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#718071] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] text-xs sm:text-sm text-[#243528] focus:outline-none focus:border-[#4D9954]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#8BCF8B] hover:bg-[#7abe7a] text-[#243528] font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-[#E1EBDD] text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-[#718071] hover:text-[#4D9954] flex items-center justify-center gap-1 mx-auto font-medium"
            >
              <span>Kembali ke Halaman Toko Pembeli</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
