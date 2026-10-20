import React, { useRef } from 'react';
import { Order } from '../../types';
import { 
  Printer, 
  Download, 
  X, 
  CheckCircle2, 
  Sprout, 
  QrCode, 
  FileText,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const formattedDate = new Date(order.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const divider = '------------------------------------------\n';
    const doubleDivider = '==========================================\n';
    
    let txt = '';
    txt += '               FRESHORA MARKETPLACE       \n';
    txt += '       "Segar dari Alam, Mudah Sampai di Rumah" \n';
    txt += '   Jl. Agrikultur Sentra Hijau No. 8, Jakarta\n';
    txt += '             CS: +62 812-3456-7890        \n';
    txt += doubleDivider;
    txt += `No. Faktur  : ${order.orderNumber}\n`;
    txt += `Tanggal     : ${formattedDate} WIB\n`;
    txt += `Kasir / POS : Terminal Self-Service POS-01\n`;
    txt += `Pembeli     : ${order.customerName}\n`;
    txt += `No. Telepon : ${order.customerPhone}\n`;
    txt += `Alamat      : ${order.customerAddress}\n`;
    txt += divider;
    txt += 'ITEM / KOMODITAS             QTY   HARGA    TOTAL\n';
    txt += divider;

    order.items.forEach((item) => {
      const name = item.productName.length > 20 ? item.productName.substring(0, 19) + '..' : item.productName.padEnd(21);
      const qty = `${item.quantity} ${item.unit}`.padEnd(6);
      const price = formatRupiah(item.price).padEnd(9);
      const subtotal = formatRupiah(item.subtotal);
      txt += `${name} ${qty} ${price} ${subtotal}\n`;
    });

    txt += divider;
    txt += `Subtotal Produk  : ${formatRupiah(order.subtotal)}\n`;
    txt += `Ongkos Kirim     : ${formatRupiah(order.shippingCost)} (${order.shippingCourier.split('(')[0].trim()})\n`;
    if (order.discount > 0) {
      txt += `Diskon Promo     : - ${formatRupiah(order.discount)}\n`;
    }
    txt += doubleDivider;
    txt += `TOTAL DIBAYAR    : ${formatRupiah(order.total)}\n`;
    txt += doubleDivider;
    txt += `Metode Bayar     : ${order.paymentMethod}\n`;
    txt += `Status Bayar     : ${order.paymentStatus === 'COD' ? 'COD (Bayar Tunai di Tempat)' : 'LUNAS (Terverifikasi Otomatis)'}\n`;
    txt += `Status Pesanan   : ${order.status.toUpperCase()}\n`;
    if (order.notes) {
      txt += `Catatan Kurir    : ${order.notes}\n`;
    }
    txt += divider;
    txt += '    *** BUKTI TRANSAKSI PEMBAYARAN SAH ***\n';
    txt += '  Validasi Digital: Tidak Memerlukan Coretan Kasir\n';
    txt += '   Terima kasih telah berbelanja komoditas segar!\n';
    txt += '               www.freshora.id           \n';

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Struk_Freshora_${order.orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E1EBDD] max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 bg-[#F7FBF5] border-b border-[#E1EBDD] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B8F50] animate-pulse" />
            <span className="text-xs font-bold text-[#243528]">
              Struk Pembayaran Mandiri (Self-Service POS)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#718071] hover:text-[#243528] hover:bg-white transition-colors"
            aria-label="Tutup jendela struk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Struk Body */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-[#FAFCF8]">
          <div 
            id="printable-receipt"
            className="bg-white border border-[#E1EBDD] rounded-2xl p-6 sm:p-7 shadow-xs font-mono text-xs text-[#243528] space-y-4 max-w-md mx-auto"
          >
            {/* Header Struk */}
            <div className="text-center pb-4 border-b-2 border-dashed border-[#B9D6B7] space-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E4F4E4] text-[#4D9954] mb-1">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h2 className="text-base font-extrabold tracking-wider text-[#243528] uppercase font-sans">
                Freshora Marketplace
              </h2>
              <p className="text-[11px] text-[#718071] italic font-sans">
                &ldquo;Segar dari Alam, Mudah Sampai di Rumah&rdquo;
              </p>
              <p className="text-[10px] text-[#718071]">
                Jl. Agrikultur Sentra Hijau No. 8, Jakarta Selatan
              </p>
              <p className="text-[10px] text-[#718071]">
                WhatsApp CS: +62 812-3456-7890 • halo@freshora.id
              </p>
            </div>

            {/* Metadata Transaksi */}
            <div className="space-y-1 text-[11px] text-[#718071] pb-3 border-b border-dashed border-[#E1EBDD]">
              <div className="flex justify-between">
                <span>No. Faktur</span>
                <span className="font-bold text-[#243528]">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Waktu</span>
                <span className="text-[#243528]">{formattedDate} WIB</span>
              </div>
              <div className="flex justify-between">
                <span>Kasir/POS</span>
                <span className="text-[#243528]">Terminal Mandiri POS-01</span>
              </div>
              <div className="flex justify-between">
                <span>Pelanggan</span>
                <span className="font-bold text-[#243528]">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>No. HP</span>
                <span className="text-[#243528]">{order.customerPhone}</span>
              </div>
              <div className="text-[10px] pt-0.5">
                <span className="block text-[#718071]">Alamat Kirim:</span>
                <span className="text-[#243528] font-sans leading-tight block">{order.customerAddress}</span>
              </div>
            </div>

            {/* Rincian Komoditas Item */}
            <div className="space-y-2.5 py-1">
              <div className="flex justify-between font-bold text-[11px] pb-1 border-b border-[#E1EBDD] text-[#718071]">
                <span>KOMODITAS</span>
                <span>SUBTOTAL</span>
              </div>
              
              {order.items.map((item, idx) => (
                <div key={idx} className="space-y-0.5 text-xs">
                  <div className="flex justify-between font-bold text-[#243528]">
                    <span className="truncate pr-2 font-sans">{item.productName}</span>
                    <span className="shrink-0">{formatRupiah(item.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#718071]">
                    <span>
                      {item.quantity} {item.unit} x {formatRupiah(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Perhitungan Biaya */}
            <div className="pt-3 border-t-2 border-dashed border-[#B9D6B7] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#718071]">
                <span>Subtotal Produk</span>
                <span className="text-[#243528] font-bold">{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#718071]">
                <span>Ongkos Kirim ({order.shippingCourier.split('(')[0].trim()})</span>
                <span className="text-[#243528]">{formatRupiah(order.shippingCost)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#3B8F50]">
                  <span>Potongan Promo</span>
                  <span className="font-bold">- {formatRupiah(order.discount)}</span>
                </div>
              )}
              
              {/* Grand Total Bar */}
              <div className="pt-2 border-t border-[#243528] flex justify-between items-center text-sm font-extrabold text-[#243528]">
                <span>TOTAL AKHIR</span>
                <span className="text-[#4D9954] text-base">{formatRupiah(order.total)}</span>
              </div>
            </div>

            {/* Status & Metode Pembayaran */}
            <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#718071]">Metode Pembayaran:</span>
                <span className="font-bold text-[#243528]">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718071]">Status Pembayaran:</span>
                <span className="font-bold text-[#3B8F50] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {order.paymentStatus === 'COD' ? 'Bayar Tunai di Tempat (COD)' : 'LUNAS (Terverifikasi Otomatis)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718071]">Status Pemenuhan:</span>
                <span className="font-bold text-[#4D9954]">{order.status}</span>
              </div>
            </div>

            {/* Footer QR Code Barcode Simulasi & Verification Note */}
            <div className="text-center pt-3 border-t-2 border-dashed border-[#B9D6B7] space-y-2">
              <div className="inline-flex flex-col items-center justify-center p-2 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD]">
                <QrCode className="w-16 h-16 text-[#243528]" />
                <span className="text-[9px] font-mono tracking-widest text-[#718071] mt-1">
                  *{order.orderNumber}*
                </span>
              </div>

              <div className="space-y-0.5 text-[10px] text-[#718071] leading-tight">
                <p className="font-bold text-[#243528]">
                  BUKTI PEMBAYARAN ELEKTRONIK SAH
                </p>
                <p>
                  Dicetak secara mandiri oleh pembeli. Validasi digital langsung tanpa memerlukan tanda tangan atau coretan kasir manual.
                </p>
                <p className="pt-1 text-[#4D9954] font-semibold">
                  Terima kasih atas kepercayaan Anda pada petani lokal!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Hidden when printed) */}
        <div className="no-print p-4 bg-[#F7FBF5] border-t border-[#E1EBDD] flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-xs text-[#718071]">
            <span>Pilihan Anda: </span>
            <strong className="text-[#243528]">Bebas mencetak ataupun tidak</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTxt}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E1EBDD] hover:bg-gray-50 text-[#243528] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
              title="Unduh struk dalam format file teks .txt"
            >
              <Download className="w-3.5 h-3.5 text-[#4D9954]" />
              <span className="hidden sm:inline">Unduh</span> .TXT
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              title="Cetak struk ke printer kasir / simpan PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Struk Sekarang</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#718071] text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
