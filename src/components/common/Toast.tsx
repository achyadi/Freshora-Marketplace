import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-white border-[#E1EBDD] text-[#243528]';
        let icon = <Info className="w-5 h-5 text-[#3A86C8] shrink-0" />;

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-[#3B8F50] shrink-0" />;
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-[#D9534F] shrink-0" />;
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#E09F3E] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 ${bg}`}
            role="alert"
          >
            {icon}
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#718071] hover:text-[#243528] transition-colors p-0.5 rounded-lg"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
