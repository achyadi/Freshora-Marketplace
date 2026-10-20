import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Presentation, 
  Database, 
  GitBranch, 
  Layers, 
  Play, 
  Maximize2, 
  Minimize2,
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Download, 
  Monitor, 
  Smartphone, 
  ZoomIn, 
  ZoomOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Package,
  ShoppingCart,
  Truck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCode,
  Share2,
  Sliders,
  ExternalLink
} from 'lucide-react';

export const AgroFreshSession1Page: React.FC = () => {
  const { navigate, addToast } = useApp();
  
  // Navigation tabs for Session 1
  const [activeTab, setActiveTab] = useState<'figma' | 'flowchart' | 'erd' | 'ppt'>('figma');
  
  // Figma Canvas View State
  const [figmaDevice, setFigmaDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeFigmaFrame, setActiveFigmaFrame] = useState<string>('frame-landing');
  const [figmaZoom, setFigmaZoom] = useState<number>(100);
  const [isFigmaPrototypePlay, setIsFigmaPrototypePlay] = useState<boolean>(false);

  // Flowchart View State
  const [activeFlowchart, setActiveFlowchart] = useState<'petani' | 'pembeli' | 'sistem'>('petani');

  // Slide PPT State
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isSlideFullscreen, setIsSlideFullscreen] = useState<boolean>(false);
  const [copiedSlide, setCopiedSlide] = useState<boolean>(false);

  const totalSlides = 8;

  const copySlideNotes = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlide(true);
    addToast('Materi slide berhasil disalin ke clipboard untuk disalin ke PowerPoint!', 'success');
    setTimeout(() => setCopiedSlide(false), 2000);
  };

  return (
    <div className="py-8 bg-[#F7FBF5] min-h-screen text-[#243528]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Navigasi Sesi 1, 2, 3 */}
        <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E1EBDD]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]/40 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Paket Presentasi Akademik RPL - Proyek AgroFresh
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#243528] text-white text-[11px] font-bold">
                  Sesi 1 Aktif
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243528]">
                Presentasi Minggu 1: Analisis Masalah, Diagram (Flowchart / ERD) & Figma
              </h1>
              <p className="text-xs sm:text-sm text-[#718071] mt-1 max-w-3xl">
                Khusus disiapkan untuk presentasi di depan dosen/penguji minggu pertama. Menampilkan visualisasi Figma interaktif, diagram alur (Flowchart) terpisah, skema relasi database (ERD), dan slide presentasi tanpa membuka aplikasi web langsung terlebih dahulu.
              </p>
            </div>

            {/* Quick Milestone Guide */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('ppt')}
                className="px-4 py-2.5 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
              >
                <Presentation className="w-4 h-4" />
                <span>Buka Slide PPT Sesi 1</span>
              </button>
              <button
                onClick={() => navigate('/rpl-docs')}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E1EBDD] hover:border-[#8BCF8B] text-[#243528] text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>Dokumen Spesifikasi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#4D9954]" />
              </button>
            </div>
          </div>

          {/* 3-Week Milestone Roadmap Tracker */}
          <div className="pt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#E4F4E4] border-2 border-[#4D9954] relative">
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4D9954] text-white">
                Sedang Dibahas
              </span>
              <div className="text-xs font-bold text-[#4D9954]">SESI 1 / MINGGU 1</div>
              <h4 className="font-bold text-sm text-[#243528] mt-0.5">PPT & Desain Figma</h4>
              <p className="text-[11px] text-[#718071] mt-1">
                Analisis masalah rantai pasok, diagram Flowchart & ERD terpisah, wireframe dan prototype Figma interaktif.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD]">
              <div className="text-xs font-bold text-[#718071]">SESI 2 / MINGGU 2</div>
              <h4 className="font-bold text-sm text-[#243528] mt-0.5">Demo Web Fitur Inti</h4>
              <p className="text-[11px] text-[#718071] mt-1">
                Demo live browser: Pembuktian kodingan & database jalan (Petani unggah produk, pembeli checkout).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD]">
              <div className="text-xs font-bold text-[#718071]">SESI 3 / MINGGU 3</div>
              <h4 className="font-bold text-sm text-[#243528] mt-0.5">Web Penuh + Black Box Testing</h4>
              <p className="text-[11px] text-[#718071] mt-1">
                Simulasi web end-to-end tanpa error + tabel matriks pengujian Black Box Testing 9 skenario lengkap.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selector Sesi 1 */}
        <div className="flex items-center gap-2 border-b border-[#E1EBDD] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('figma')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'figma'
                ? 'bg-[#243528] text-white shadow-sm'
                : 'bg-white border border-[#E1EBDD] text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#8BCF8B]" />
            <span>1. Desain Tampilan Figma (Prototype & Frame)</span>
          </button>

          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'flowchart'
                ? 'bg-[#243528] text-white shadow-sm'
                : 'bg-white border border-[#E1EBDD] text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]'
            }`}
          >
            <GitBranch className="w-4 h-4 text-[#8BCF8B]" />
            <span>2. Diagram Flowchart (Terpisah)</span>
          </button>

          <button
            onClick={() => setActiveTab('erd')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'erd'
                ? 'bg-[#243528] text-white shadow-sm'
                : 'bg-white border border-[#E1EBDD] text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]'
            }`}
          >
            <Database className="w-4 h-4 text-[#8BCF8B]" />
            <span>3. Diagram ERD Database (Terpisah)</span>
          </button>

          <button
            onClick={() => setActiveTab('ppt')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ppt'
                ? 'bg-[#243528] text-white shadow-sm'
                : 'bg-white border border-[#E1EBDD] text-[#718071] hover:text-[#243528] hover:bg-[#F7FBF5]'
            }`}
          >
            <Presentation className="w-4 h-4 text-[#8BCF8B]" />
            <span>4. Slide Presentasi PPT Sesi 1</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: DESAIN TAMPILAN FIGMA (CANVAS INTERAKTIF)           */}
        {/* ========================================================= */}
        {activeTab === 'figma' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Figma Toolbar & Window Frame */}
            <div className="bg-[#1E1E1E] rounded-3xl overflow-hidden border border-[#333] shadow-2xl">
              
              {/* Figma Topbar */}
              <div className="bg-[#2C2C2C] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#3D3D3D] text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
                  </div>
                  <div className="h-4 w-[1px] bg-[#444] mx-1"></div>
                  <div className="font-bold flex items-center gap-1.5 text-white/90">
                    <span className="text-[#0ACF83] font-black">Figma</span>
                    <span className="text-white/40">/</span>
                    <span>AgroFresh UI System - Prototype Sesi 1</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#444] text-white/70">
                    Draft v1.4
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#1E1E1E] rounded-lg p-0.5 border border-[#444]">
                    <button
                      onClick={() => setFigmaDevice('desktop')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        figmaDevice === 'desktop' ? 'bg-[#3D3D3D] text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Desktop 1440px</span>
                    </button>
                    <button
                      onClick={() => setFigmaDevice('mobile')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        figmaDevice === 'mobile' ? 'bg-[#3D3D3D] text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile 390px</span>
                    </button>
                  </div>

                  <div className="flex items-center bg-[#1E1E1E] rounded-lg px-2 py-1 text-[11px] text-white/70 gap-2 border border-[#444]">
                    <button onClick={() => setFigmaZoom(Math.max(50, figmaZoom - 25))} className="hover:text-white">
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <span>{figmaZoom}%</span>
                    <button onClick={() => setFigmaZoom(Math.min(150, figmaZoom + 25))} className="hover:text-white">
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsFigmaPrototypePlay(!isFigmaPrototypePlay)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isFigmaPrototypePlay 
                        ? 'bg-[#0ACF83] text-black shadow-sm' 
                        : 'bg-[#18A0FB] text-white hover:bg-[#0d8fe6]'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isFigmaPrototypePlay ? 'Stop Prototype' : 'Play Prototype'}</span>
                  </button>
                </div>
              </div>

              {/* Figma Canvas Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#1E1E1E]">
                
                {/* Left Sidebar: Layers & Frames Tree */}
                <div className="lg:col-span-3 bg-[#252525] border-r border-[#333] p-4 text-white/80 text-xs space-y-4 select-none">
                  <div className="font-bold text-[11px] text-white/40 uppercase tracking-wider">
                    Frames & Pages (Artboards)
                  </div>

                  <div className="space-y-1">
                    {[
                      { id: 'frame-landing', name: '❖ Frame 1: Desktop Landing Page', type: 'Desktop 1440' },
                      { id: 'frame-catalog', name: '❖ Frame 2: Katalog & Filter Komoditas', type: 'Desktop 1440' },
                      { id: 'frame-upload', name: '❖ Frame 3: Form Upload Produk Petani', type: 'Modal Component' },
                      { id: 'frame-checkout', name: '❖ Frame 4: Keranjang & Kurir Dingin', type: 'Checkout Flow' },
                      { id: 'frame-mobile', name: '❖ Frame 5: Mobile Responsive UI', type: 'Mobile 390x844' },
                      { id: 'frame-tokens', name: '❖ Frame 6: Design System & Tokens', type: 'Style Guide' },
                    ].map((frame) => (
                      <div
                        key={frame.id}
                        onClick={() => setActiveFigmaFrame(frame.id)}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all flex flex-col ${
                          activeFigmaFrame === frame.id
                            ? 'bg-[#18A0FB] text-white font-bold'
                            : 'hover:bg-[#2F2F2F] text-white/80'
                        }`}
                      >
                        <span>{frame.name}</span>
                        <span className={`text-[10px] ${activeFigmaFrame === frame.id ? 'text-white/80' : 'text-white/40'}`}>
                          {frame.type}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Design Tokens Mini Preview */}
                  <div className="pt-4 border-t border-[#333] space-y-2">
                    <div className="font-bold text-[11px] text-white/40 uppercase tracking-wider">
                      Color Palette Tokens
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className="h-7 rounded-lg bg-[#4D9954] flex items-center justify-center text-[9px] font-bold text-white" title="#4D9954 Primary Emerald">
                        #4D
                      </div>
                      <div className="h-7 rounded-lg bg-[#8BCF8B] flex items-center justify-center text-[9px] font-bold text-[#243528]" title="#8BCF8B Secondary Mint">
                        #8B
                      </div>
                      <div className="h-7 rounded-lg bg-[#243528] flex items-center justify-center text-[9px] font-bold text-white" title="#243528 Dark Forest">
                        #24
                      </div>
                      <div className="h-7 rounded-lg bg-[#F7FBF5] flex items-center justify-center text-[9px] font-bold text-[#243528] border border-white/20" title="#F7FBF5 Light Mint">
                        #F7
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Canvas: Artboard Mockup Display */}
                <div className="lg:col-span-9 p-6 overflow-auto flex items-center justify-center bg-[#181818] relative">
                  
                  {/* Artboard Frame Container */}
                  <div 
                    style={{ transform: `scale(${figmaZoom / 100})`, transformOrigin: 'center center' }} 
                    className="transition-transform duration-200"
                  >
                    
                    {/* Frame 1: Desktop Landing Page */}
                    {activeFigmaFrame === 'frame-landing' && (
                      <div className="w-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 text-[#243528]">
                        {/* Figma Frame Header */}
                        <div className="bg-[#E4F4E4] px-4 py-1.5 text-[11px] font-mono font-bold text-[#4D9954] flex items-center justify-between border-b border-[#8BCF8B]/40">
                          <span>Frame: Desktop 1440 - Landing Page (AgroFresh)</span>
                          <span>Auto Layout [W: 1440, H: Auto]</span>
                        </div>
                        
                        {/* Mock Navbar */}
                        <div className="px-6 py-3 border-b border-[#E1EBDD] flex items-center justify-between bg-white">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#4D9954] flex items-center justify-center text-white text-xs font-bold">
                              AF
                            </div>
                            <span className="font-bold text-sm text-[#243528]">AgroFresh</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#718071]">
                            <span className="text-[#4D9954] font-bold">Beranda</span>
                            <span>Katalog</span>
                            <span>Tentang Kami</span>
                            <span>Petani Mitra</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD] text-xs font-semibold">
                              Masuk
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-[#4D9954] text-white text-xs font-bold">
                              Daftar Mitra
                            </span>
                          </div>
                        </div>

                        {/* Mock Hero Section */}
                        <div className="p-8 bg-gradient-to-br from-[#F7FBF5] to-[#E4F4E4]/40 flex items-center justify-between">
                          <div className="max-w-xs space-y-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#E4F4E4] text-[#4D9954] font-bold text-[10px] border border-[#8BCF8B]/40">
                              Direct from Farmer • 100% Organik
                            </span>
                            <h2 className="text-xl font-black text-[#243528] leading-tight">
                              Panen Segar Langsung dari Kebun Petani Lokal
                            </h2>
                            <p className="text-xs text-[#718071]">
                              Memotong rantai tengkulak, menjamin kesegaran sayur & buah tiba dalam 24 jam dengan pendingin khusus.
                            </p>
                            <div className="pt-2 flex gap-2">
                              <span className="px-3 py-1.5 rounded-xl bg-[#4D9954] text-white text-xs font-bold">
                                Jelajahi 80 Komoditas
                              </span>
                              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E1EBDD] text-xs font-bold">
                                Pelajari Mitra
                              </span>
                            </div>
                          </div>
                          <div className="w-52 h-40 rounded-2xl bg-gradient-to-br from-[#4D9954]/20 to-[#8BCF8B]/30 border-2 border-dashed border-[#4D9954]/40 flex flex-col items-center justify-center text-center p-3">
                            <span className="text-2xl mb-1">🥦 🍎 🥕</span>
                            <span className="text-[11px] font-bold text-[#243528]">Hero Asset Image Placeholder</span>
                            <span className="text-[9px] text-[#718071] mt-0.5">Komoditas Segar Asli Indonesia</span>
                          </div>
                        </div>

                        {/* Mock Categories Row */}
                        <div className="p-6 bg-white border-t border-[#E1EBDD]">
                          <div className="text-xs font-bold text-[#243528] mb-3">Kategori Pilihan:</div>
                          <div className="grid grid-cols-4 gap-3 text-center text-xs">
                            <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] font-bold">
                              🥬 Sayuran Daun
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] font-bold">
                              🍅 Sayuran Buah
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] font-bold">
                              🍎 Buah Segar
                            </div>
                            <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] font-bold">
                              🥕 Umbi & Rimpang
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Frame 2: Catalog & Filter */}
                    {activeFigmaFrame === 'frame-catalog' && (
                      <div className="w-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 text-[#243528]">
                        <div className="bg-[#E4F4E4] px-4 py-1.5 text-[11px] font-mono font-bold text-[#4D9954] flex items-center justify-between border-b border-[#8BCF8B]/40">
                          <span>Frame: Desktop 1440 - Katalog & Filter Produk</span>
                          <span>Search & Grid Layout</span>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#E1EBDD]">
                            <div className="font-bold text-sm">Katalog 80 Produk AgroFresh</div>
                            <div className="flex gap-2">
                              <div className="px-3 py-1 bg-[#F7FBF5] border border-[#E1EBDD] rounded-lg text-xs text-[#718071]">
                                🔍 Cari komoditas...
                              </div>
                              <div className="px-3 py-1 bg-white border border-[#E1EBDD] rounded-lg text-xs font-bold text-[#4D9954]">
                                Filter Kategori ▾
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { name: 'Tomat Cherry Merah', origin: 'Lembang', price: 'Rp 22.000 / kg', stock: 'Stok: 45 kg' },
                              { name: 'Pakcoy Hidroponik', origin: 'Bandung Barat', price: 'Rp 14.000 / kg', stock: 'Stok: 80 kg' },
                              { name: 'Mangga Harum Manis', origin: 'Probolinggo', price: 'Rp 32.000 / kg', stock: 'Stok: 60 kg' },
                            ].map((prod, i) => (
                              <div key={i} className="p-3 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] space-y-1.5">
                                <div className="h-20 bg-white rounded-lg border border-[#E1EBDD] flex items-center justify-center text-xs font-semibold text-[#718071]">
                                  Foto Produk Asli
                                </div>
                                <div className="font-bold text-xs">{prod.name}</div>
                                <div className="text-[10px] text-[#718071]">{prod.origin} • {prod.stock}</div>
                                <div className="text-xs font-bold text-[#4D9954]">{prod.price}</div>
                                <button className="w-full py-1 rounded bg-[#4D9954] text-white text-[11px] font-bold">
                                  + Keranjang
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Frame 3: Form Upload Produk Petani */}
                    {activeFigmaFrame === 'frame-upload' && (
                      <div className="w-[620px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 text-[#243528]">
                        <div className="bg-[#243528] px-4 py-2 text-[11px] font-mono font-bold text-white flex items-center justify-between">
                          <span>Frame Modal: Form Unggah Produk Baru (Mitra Petani)</span>
                          <span className="text-[#8BCF8B]">CRUD Form Component</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs">
                          <div className="flex items-center gap-2 pb-2 border-b border-[#E1EBDD]">
                            <Package className="w-4 h-4 text-[#4D9954]" />
                            <span className="font-bold text-sm">Informasi Komoditas Hasil Panen</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-semibold mb-1">Nama Produk / Buah / Sayur</label>
                              <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">Contoh: Selada Keriting Romaine</div>
                            </div>
                            <div>
                              <label className="block font-semibold mb-1">Kategori</label>
                              <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">Sayuran Daun ▾</div>
                            </div>
                            <div>
                              <label className="block font-semibold mb-1">Harga Petani per Kg (Rp)</label>
                              <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">Rp 18.000</div>
                            </div>
                            <div>
                              <label className="block font-semibold mb-1">Kapasitas Stok Panen (Kg)</label>
                              <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">120</div>
                            </div>
                            <div>
                              <label className="block font-semibold mb-1">Asal Daerah Panen</label>
                              <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">Pangalengan, Jawa Barat</div>
                            </div>
                            <div>
                              <label className="block font-semibold mb-1">Nama Petani / Kelompok Tani</label>
                              <div className="p-2 rounded-lg bg-[#F7FBF5] border border-[#E1EBDD]">Kelompok Tani Makmur Subur</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl border border-dashed border-[#8BCF8B] bg-[#E4F4E4]/40 text-center">
                            <span className="font-bold text-[#4D9954] block">📷 Unggah Foto Hasil Panen Asli</span>
                            <span className="text-[10px] text-[#718071]">Format JPG, PNG (Maksimal 5MB)</span>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <span className="px-3 py-1.5 rounded-xl border border-[#E1EBDD] font-bold">Batal</span>
                            <span className="px-4 py-1.5 rounded-xl bg-[#4D9954] text-white font-bold">Simpan & Publikasikan</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Frame 4: Keranjang & Kurir Dingin */}
                    {activeFigmaFrame === 'frame-checkout' && (
                      <div className="w-[660px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 text-[#243528]">
                        <div className="bg-[#E4F4E4] px-4 py-1.5 text-[11px] font-mono font-bold text-[#4D9954] flex items-center justify-between border-b border-[#8BCF8B]/40">
                          <span>Frame: Checkout & Cold Chain Logistics Selection</span>
                          <span>Transaction Flow</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs">
                          <div className="font-bold text-sm pb-2 border-b border-[#E1EBDD] flex items-center gap-2">
                            <Truck className="w-4 h-4 text-[#4D9954]" />
                            <span>Pilihan Pengiriman Khusus Buah & Sayur Segar</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-3 rounded-xl border-2 border-[#4D9954] bg-[#E4F4E4]/50 flex items-center justify-between">
                              <div>
                                <div className="font-bold text-[#243528]">Kurir Dingin Spesialis (Cold Chain 2-4°C)</div>
                                <div className="text-[10px] text-[#718071]">Kendaraan pendingin terinsulasi khusus menjaga daun tidak layu</div>
                              </div>
                              <div className="font-bold text-[#4D9954]">Rp 15.000</div>
                            </div>
                            <div className="p-3 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] flex items-center justify-between">
                              <div>
                                <div className="font-bold text-[#243528]">Instant Express Sayur (1-2 Jam)</div>
                                <div className="text-[10px] text-[#718071]">Langsung kirim setelah petik pagi hari</div>
                              </div>
                              <div className="font-bold text-[#243528]">Rp 25.000</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] flex justify-between font-bold">
                            <span>Total Pembayaran (Termasuk Ongkir):</span>
                            <span className="text-[#4D9954] text-sm">Rp 71.000</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Frame 5: Mobile Responsive */}
                    {activeFigmaFrame === 'frame-mobile' && (
                      <div className="w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#243528] text-[#243528]">
                        <div className="bg-[#243528] text-white px-4 py-2 flex items-center justify-between text-[11px]">
                          <span>09:41</span>
                          <span>AgroFresh Mobile</span>
                          <span>100% 🔋</span>
                        </div>
                        <div className="p-4 space-y-3 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-[#4D9954]">AgroFresh</span>
                            <span className="p-1 rounded bg-[#E4F4E4] text-[#4D9954] font-bold text-[10px]">🛒 2</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] text-[11px] text-[#718071]">
                            🔍 Cari buah atau sayur segar...
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded-lg bg-[#E4F4E4] font-bold text-center text-[10px]">
                              🍎 Buah Segar
                            </div>
                            <div className="p-2 rounded-lg bg-[#E4F4E4] font-bold text-center text-[10px]">
                              🥦 Sayuran Hijau
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl border border-[#E1EBDD] bg-[#F7FBF5] space-y-1">
                            <div className="h-16 bg-white rounded border border-[#E1EBDD] flex items-center justify-center text-[10px] text-[#718071]">
                              Foto Komoditas
                            </div>
                            <div className="font-bold text-[11px]">Bayam Hijau Petik Pagi</div>
                            <div className="text-[10px] text-[#4D9954] font-bold">Rp 7.500 / ikat</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Frame 6: Design Tokens & System */}
                    {activeFigmaFrame === 'frame-tokens' && (
                      <div className="w-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 text-[#243528] p-6 space-y-5">
                        <div className="border-b border-[#E1EBDD] pb-3">
                          <h3 className="font-bold text-base text-[#243528]">AgroFresh Design System & UI Specifications</h3>
                          <p className="text-xs text-[#718071]">Spesifikasi standar antarmuka pengguna untuk implementasi front-end</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-2">
                            <div className="font-bold text-[#4D9954]">Tipografi (Typography Hierarchy)</div>
                            <div><strong>H1 Display:</strong> Inter / Poppins 28px - 32px Bold</div>
                            <div><strong>H2 Section:</strong> Inter 20px - 24px Bold</div>
                            <div><strong>Body Text:</strong> Inter 14px Regular / Medium</div>
                            <div><strong>Caption/Tag:</strong> Inter 11px SemiBold</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[#F7FBF5] border border-[#E1EBDD] space-y-2">
                            <div className="font-bold text-[#4D9954]">Border Radius & Spacing</div>
                            <div><strong>Cards:</strong> rounded-2xl (16px) / rounded-3xl (24px)</div>
                            <div><strong>Buttons:</strong> rounded-xl (12px)</div>
                            <div><strong>Grid Gap:</strong> 16px - 24px Responsive</div>
                            <div><strong>Shadow:</strong> Tailwind shadow-xs & shadow-sm</div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>

            {/* Panduan Presentasi Figma di Depan Dosen */}
            <div className="p-5 rounded-2xl bg-[#E4F4E4] border border-[#8BCF8B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-bold text-sm text-[#243528] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4D9954]" />
                  Tips Presentasi Sesi 1 di Depan Dosen / Penguji:
                </span>
                <p className="text-xs text-[#718071] leading-relaxed">
                  Jelaskan bahwa perancangan antarmuka AgroFresh dimulai dari pemetaan <em>User Journey</em> petani & pembeli, pembuatan <em>wireframe</em>, hingga <em>High-Fidelity Prototype</em> dengan 6 frame di atas sebelum kodingan web diimplementasikan.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('flowchart')}
                className="px-4 py-2 rounded-xl bg-[#4D9954] text-white text-xs font-bold hover:bg-[#3d7a43] transition-all whitespace-nowrap self-stretch sm:self-auto text-center"
              >
                Lanjut ke Diagram Flowchart &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: DIAGRAM FLOWCHART TERPISAH                         */}
        {/* ========================================================= */}
        {activeTab === 'flowchart' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Sub-selector Flowchart */}
            <div className="bg-white p-4 rounded-2xl border border-[#E1EBDD] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#718071] uppercase tracking-wider">Pilih Alur Flowchart:</span>
                <button
                  onClick={() => setActiveFlowchart('petani')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeFlowchart === 'petani' 
                      ? 'bg-[#4D9954] text-white shadow-xs' 
                      : 'bg-[#F7FBF5] text-[#243528] hover:bg-[#E4F4E4]'
                  }`}
                >
                  1. Alur Mitra Petani (Upload & Kelola)
                </button>
                <button
                  onClick={() => setActiveFlowchart('pembeli')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeFlowchart === 'pembeli' 
                      ? 'bg-[#4D9954] text-white shadow-xs' 
                      : 'bg-[#F7FBF5] text-[#243528] hover:bg-[#E4F4E4]'
                  }`}
                >
                  2. Alur Pembeli (Katalog & Checkout)
                </button>
                <button
                  onClick={() => setActiveFlowchart('sistem')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeFlowchart === 'sistem' 
                      ? 'bg-[#4D9954] text-white shadow-xs' 
                      : 'bg-[#F7FBF5] text-[#243528] hover:bg-[#E4F4E4]'
                  }`}
                >
                  3. Alur Transaksi & Validasi Stok
                </button>
              </div>

              <div className="text-xs text-[#718071]">
                Simbol Standar ISO Flowchart: Terminator, Proses, Keputusan, Data I/O
              </div>
            </div>

            {/* FLOWCHART 1: PETANI UPLOAD PRODUK */}
            {activeFlowchart === 'petani' && (
              <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E1EBDD]">
                  <div>
                    <span className="text-xs font-bold text-[#4D9954] uppercase tracking-wider">Diagram Alur Bisnis 01</span>
                    <h3 className="text-xl font-bold text-[#243528]">
                      Flowchart: Mitra Petani Mengunggah Komoditas & Mengelola Hasil Panen
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] font-bold text-xs">
                    Sisi Petani / Produsen
                  </span>
                </div>

                {/* SVG Visual Flowchart */}
                <div className="p-6 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex justify-center overflow-x-auto">
                  <div className="flex flex-col items-center space-y-3 min-w-[500px]">
                    
                    {/* Start */}
                    <div className="px-6 py-2 rounded-full bg-[#243528] text-white text-xs font-bold shadow-sm">
                      [MULAI] Petani Buka Halaman Mitra / Admin
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    {/* Step 1 */}
                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs text-center shadow-2xs">
                      Petani Login Akun Mitra Tani (admin@freshora.demo)
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    {/* Step 2 */}
                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs text-center shadow-2xs">
                      Pilih Menu &quot;Manajemen Produk&quot; &rarr; Klik &quot;+ Tambah Produk Baru&quot;
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    {/* Step 3 (Input Data) */}
                    <div className="px-5 py-2.5 rounded-xl bg-[#E4F4E4] border border-[#8BCF8B] text-xs text-center font-semibold text-[#243528]">
                      Input: Nama Buah/Sayur, Kategori, Harga/kg, Kapasitas Stok, Asal Kebun, Foto Asli
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    {/* Decision: Validasi */}
                    <div className="w-48 h-20 bg-amber-50 border-2 border-amber-400 rotate-0 flex items-center justify-center text-center text-xs font-bold text-amber-900 rounded-xl shadow-xs">
                      Validasi Kelengkapan & Format Harga/Stok &gt; 0?
                    </div>
                    
                    <div className="grid grid-cols-2 gap-20 w-full max-w-md pt-2">
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-red-600 mb-1">[Tidak / Gagal]</span>
                        <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-700 text-center">
                          Tampilkan Pesan Error Validasi Form
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-[#4D9954] mb-1">[Ya / Lolos]</span>
                        <div className="p-2 rounded-lg bg-[#E4F4E4] border border-[#8BCF8B] text-[11px] text-[#243528] text-center font-semibold">
                          Simpan ke Database & Sinkronkan ke Katalog Publik
                        </div>
                      </div>
                    </div>

                    <div className="w-[2px] h-6 bg-[#4D9954] mt-2"></div>

                    {/* Success Output */}
                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#4D9954] text-xs text-center font-bold text-[#4D9954]">
                      Komoditas Muncul di Katalog Pembeli (Stok Realtime)
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    {/* End */}
                    <div className="px-6 py-2 rounded-full bg-[#243528] text-white text-xs font-bold shadow-sm">
                      [SELESAI] Petani Memantau Status Pesanan Masuk
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FLOWCHART 2: PEMBELI CHECKOUT */}
            {activeFlowchart === 'pembeli' && (
              <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E1EBDD]">
                  <div>
                    <span className="text-xs font-bold text-[#4D9954] uppercase tracking-wider">Diagram Alur Bisnis 02</span>
                    <h3 className="text-xl font-bold text-[#243528]">
                      Flowchart: Pembeli Menjelajah Katalog, Keranjang, & Checkout Pesanan
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] font-bold text-xs">
                    Sisi Pembeli / Konsumen
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex justify-center overflow-x-auto">
                  <div className="flex flex-col items-center space-y-3 min-w-[500px]">
                    <div className="px-6 py-2 rounded-full bg-[#243528] text-white text-xs font-bold shadow-sm">
                      [MULAI] Konsumen Akses AgroFresh
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs text-center">
                      Cari Buah/Sayur atau Filter Kategori (Sayur Daun / Buah Segar / Organik)
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs text-center">
                      Pilih Produk &rarr; Masukkan Jumlah Kuantitas &rarr; Tambah ke Keranjang
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    {/* Decision Stok */}
                    <div className="w-48 h-18 bg-amber-50 border-2 border-amber-400 flex items-center justify-center text-center text-xs font-bold text-amber-900 rounded-xl">
                      Kuantitas &le; Stok Tersedia di Kebun?
                    </div>

                    <div className="grid grid-cols-2 gap-16 w-full max-w-md pt-2">
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-red-600 mb-1">[Tidak]</span>
                        <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-700 text-center">
                          Muncul Peringatan: Stok Petani Tidak Cukup
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-[#4D9954] mb-1">[Ya]</span>
                        <div className="p-2 rounded-lg bg-[#E4F4E4] border border-[#8BCF8B] text-[11px] text-[#243528] text-center font-semibold">
                          Item Berhasil Masuk Keranjang
                        </div>
                      </div>
                    </div>

                    <div className="w-[2px] h-6 bg-[#4D9954] mt-2"></div>

                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#E1EBDD] text-xs text-center">
                      Buka Keranjang &rarr; Lanjut ke Checkout
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    <div className="px-5 py-2.5 rounded-xl bg-[#E4F4E4] border border-[#8BCF8B] text-xs text-center font-semibold text-[#243528]">
                      Pilih Kurir Dingin (Cold Chain) & Metode Bayar (QRIS / VA / COD)
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    <div className="px-5 py-2.5 rounded-xl bg-white border border-[#4D9954] text-xs text-center font-bold text-[#4D9954]">
                      Transaksi Dibuat (Status: &quot;Menunggu&quot;) &rarr; Stok Otomatis Berkurang
                    </div>
                    <div className="w-[2px] h-6 bg-[#4D9954]"></div>

                    <div className="px-6 py-2 rounded-full bg-[#243528] text-white text-xs font-bold shadow-sm">
                      [SELESAI] Invoice Diterbitkan & Pantau Pengiriman
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FLOWCHART 3: SISTEM & VALIDASI */}
            {activeFlowchart === 'sistem' && (
              <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E1EBDD]">
                  <div>
                    <span className="text-xs font-bold text-[#4D9954] uppercase tracking-wider">Diagram Alur Bisnis 03</span>
                    <h3 className="text-xl font-bold text-[#243528]">
                      Flowchart: Siklus Hidup Pesanan (Order Lifecycle & State Transitions)
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] font-bold text-xs">
                    Sisi Backend & Logika Sistem
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD] flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-xs">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300">
                      <div className="font-bold text-amber-800 text-sm mb-1">1. Menunggu</div>
                      <p className="text-[11px] text-amber-700">
                        Pesanan baru dibuat oleh pembeli. Stok terreservasi. Menunggu konfirmasi pembayaran / admin.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-300">
                      <div className="font-bold text-blue-800 text-sm mb-1">2. Diproses</div>
                      <p className="text-[11px] text-blue-700">
                        Admin/Petani memverifikasi pesanan. Produk dipetik segar dan disiapkan ke dalam kotak pendingin.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-300">
                      <div className="font-bold text-purple-800 text-sm mb-1">3. Dikirim</div>
                      <p className="text-[11px] text-purple-700">
                        Kurir spesialis mengantarkan pesanan dengan kendaraan pendingin langsung ke alamat pembeli.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#E4F4E4] border border-[#8BCF8B]">
                      <div className="font-bold text-[#4D9954] text-sm mb-1">4. Selesai</div>
                      <p className="text-[11px] text-[#243528]">
                        Paket buah/sayur diterima pembeli dalam kondisi segar. Transaksi dinyatakan lunas & tuntas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DIAGRAM ERD DATABASE TERPISAH                      */}
        {/* ========================================================= */}
        {activeTab === 'erd' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-[#E1EBDD] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E1EBDD] gap-2">
                <div>
                  <span className="text-xs font-bold text-[#4D9954] uppercase tracking-wider">
                    Arsitektur Data Relasional
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#243528]">
                    Entity Relationship Diagram (ERD) - Notasi Crow&apos;s Foot
                  </h3>
                  <p className="text-xs text-[#718071] mt-0.5">
                    Struktur 5 entitas inti database AgroFresh dengan relasi One-to-Many (1:N) dan integritas referensial.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E4F4E4] text-[#4D9954] text-xs font-bold border border-[#8BCF8B]">
                    Normalisasi 3NF
                  </span>
                </div>
              </div>

              {/* Visual Schema Cards Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Entity USERS */}
                <div className="rounded-2xl border-2 border-[#4D9954] bg-[#F7FBF5] overflow-hidden shadow-xs">
                  <div className="bg-[#4D9954] text-white px-4 py-2 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">TABLE: users</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20">Master Entity</span>
                  </div>
                  <div className="p-4 font-mono text-[11px] space-y-1.5 divide-y divide-[#E1EBDD]">
                    <div className="flex justify-between py-1 text-[#243528]">
                      <span><strong className="text-[#4D9954]">PK</strong> id</span>
                      <span className="text-[#718071]">VARCHAR(36)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>name</span>
                      <span className="text-[#718071]">VARCHAR(100)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>email <strong className="text-amber-600">[UQ]</strong></span>
                      <span className="text-[#718071]">VARCHAR(100)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>role</span>
                      <span className="text-[#718071]">ENUM(&apos;admin&apos;,&apos;buyer&apos;)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>phone</span>
                      <span className="text-[#718071]">VARCHAR(20)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>address</span>
                      <span className="text-[#718071]">TEXT</span>
                    </div>
                  </div>
                </div>

                {/* Entity CATEGORIES */}
                <div className="rounded-2xl border-2 border-[#8BCF8B] bg-[#F7FBF5] overflow-hidden shadow-xs">
                  <div className="bg-[#8BCF8B] text-[#243528] px-4 py-2 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">TABLE: categories</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/50">Master</span>
                  </div>
                  <div className="p-4 font-mono text-[11px] space-y-1.5 divide-y divide-[#E1EBDD]">
                    <div className="flex justify-between py-1 text-[#243528]">
                      <span><strong className="text-[#4D9954]">PK</strong> id</span>
                      <span className="text-[#718071]">VARCHAR(36)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>name</span>
                      <span className="text-[#718071]">VARCHAR(100)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>slug <strong className="text-amber-600">[UQ]</strong></span>
                      <span className="text-[#718071]">VARCHAR(100)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>icon</span>
                      <span className="text-[#718071]">VARCHAR(50)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>description</span>
                      <span className="text-[#718071]">TEXT</span>
                    </div>
                  </div>
                </div>

                {/* Entity PRODUCTS */}
                <div className="rounded-2xl border-2 border-[#243528] bg-[#F7FBF5] overflow-hidden shadow-xs">
                  <div className="bg-[#243528] text-white px-4 py-2 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">TABLE: products</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20">Operational</span>
                  </div>
                  <div className="p-4 font-mono text-[11px] space-y-1.5 divide-y divide-[#E1EBDD]">
                    <div className="flex justify-between py-1 text-[#243528]">
                      <span><strong className="text-[#4D9954]">PK</strong> id</span>
                      <span className="text-[#718071]">VARCHAR(36)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span><strong className="text-blue-600">FK</strong> categoryId</span>
                      <span className="text-blue-600">&rarr; categories(id)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>name</span>
                      <span className="text-[#718071]">VARCHAR(150)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>price</span>
                      <span className="text-[#718071]">DECIMAL(12,2)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>stock</span>
                      <span className="text-[#718071]">INTEGER</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>origin (asal kebun)</span>
                      <span className="text-[#718071]">VARCHAR(100)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>farmer (nama petani)</span>
                      <span className="text-[#718071]">VARCHAR(100)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>isOrganic</span>
                      <span className="text-[#718071]">BOOLEAN</span>
                    </div>
                  </div>
                </div>

                {/* Entity ORDERS */}
                <div className="rounded-2xl border-2 border-blue-500 bg-[#F7FBF5] overflow-hidden shadow-xs md:col-span-2">
                  <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">TABLE: orders</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20">Transaction Header</span>
                  </div>
                  <div className="p-4 font-mono text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 divide-y sm:divide-y-0 divide-[#E1EBDD]">
                    <div className="flex justify-between py-1">
                      <span><strong className="text-[#4D9954]">PK</strong> id</span>
                      <span className="text-[#718071]">VARCHAR(36)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>orderNumber <strong className="text-amber-600">[UQ]</strong></span>
                      <span className="text-[#718071]">VARCHAR(50)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span><strong className="text-blue-600">FK</strong> userId</span>
                      <span className="text-blue-600">&rarr; users(id)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>status</span>
                      <span className="text-[#718071]">ENUM(&apos;Menunggu&apos;,&apos;Diproses&apos;,&apos;Dikirim&apos;,&apos;Selesai&apos;)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>shippingCourier</span>
                      <span className="text-[#718071]">VARCHAR(50) (Cold Chain)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>shippingCost</span>
                      <span className="text-[#718071]">DECIMAL(10,2)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>paymentMethod</span>
                      <span className="text-[#718071]">VARCHAR(50) (QRIS/VA)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>totalAmount</span>
                      <span className="text-[#718071]">DECIMAL(12,2)</span>
                    </div>
                  </div>
                </div>

                {/* Entity ORDER_ITEMS */}
                <div className="rounded-2xl border-2 border-purple-500 bg-[#F7FBF5] overflow-hidden shadow-xs">
                  <div className="bg-purple-600 text-white px-4 py-2 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">TABLE: order_items</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20">Transaction Detail</span>
                  </div>
                  <div className="p-4 font-mono text-[11px] space-y-1.5 divide-y divide-[#E1EBDD]">
                    <div className="flex justify-between py-1">
                      <span><strong className="text-blue-600">FK</strong> orderId</span>
                      <span className="text-blue-600">&rarr; orders(id)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span><strong className="text-blue-600">FK</strong> productId</span>
                      <span className="text-blue-600">&rarr; products(id)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>productName</span>
                      <span className="text-[#718071]">VARCHAR(150)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>price</span>
                      <span className="text-[#718071]">DECIMAL(12,2)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>quantity</span>
                      <span className="text-[#718071]">INTEGER</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>subtotal</span>
                      <span className="text-[#718071]">DECIMAL(12,2)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Matriks Relasi Antar Tabel */}
              <div className="p-4 rounded-2xl bg-[#F7FBF5] border border-[#E1EBDD]">
                <h4 className="font-bold text-xs text-[#243528] uppercase tracking-wider mb-2">
                  Matriks Kardinalitas Relasi:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#718071]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E1EBDD]">
                    <strong className="text-[#243528]">categories &rarr; products:</strong> (1 : N)<br />
                    1 Kategori menampung banyak komoditas buah/sayur.
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#E1EBDD]">
                    <strong className="text-[#243528]">users &rarr; orders:</strong> (1 : N)<br />
                    1 Pembeli dapat memiliki banyak riwayat transaksi.
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#E1EBDD]">
                    <strong className="text-[#243528]">orders &rarr; order_items &larr; products:</strong> (M : N)<br />
                    Tabel asosiatif detail transaksi multi-produk.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SLIDE PRESENTASI PPT SESI 1                        */}
        {/* ========================================================= */}
        {activeTab === 'ppt' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Slide Player Container */}
            <div className={`bg-[#1E2922] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#3B543F] relative ${isSlideFullscreen ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
              
              {/* Slide Control Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#8BCF8B]/20 text-[#8BCF8B] font-bold text-xs border border-[#8BCF8B]/40">
                    SLIDE {currentSlide} DARI {totalSlides}
                  </span>
                  <span className="text-white/60 hidden sm:inline">
                    Materi Sidang / Presentasi Minggu 1
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copySlideNotes(`Slide ${currentSlide} AgroFresh Presentation Notes`)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1.5 transition-all text-xs"
                    title="Salin materi slide untuk disalin ke PowerPoint"
                  >
                    {copiedSlide ? <Check className="w-3.5 h-3.5 text-[#8BCF8B]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSlide ? 'Tersalin!' : 'Salin Materi'}</span>
                  </button>

                  <button
                    onClick={() => setIsSlideFullscreen(!isSlideFullscreen)}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                    title="Layar Penuh"
                  >
                    {isSlideFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* SLIDE CONTENT AREA */}
              <div className="min-h-[420px] py-8 flex flex-col justify-center">
                
                {/* SLIDE 1: COVER */}
                {currentSlide === 1 && (
                  <div className="space-y-4 max-w-2xl mx-auto text-center">
                    <span className="px-3.5 py-1 rounded-full bg-[#8BCF8B]/20 text-[#8BCF8B] text-xs font-bold border border-[#8BCF8B]/40 uppercase tracking-widest inline-block">
                      Tugas Besar Rekayasa Perangkat Lunak (RPL)
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                      AGROFRESH
                    </h2>
                    <p className="text-lg text-[#8BCF8B] font-semibold">
                      Digital Marketplace Rantai Pasok Buah & Sayur Segar Terintegrasi
                    </p>
                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-white/70">
                      <div>
                        <span className="block text-white/40">Fokus Evaluasi:</span>
                        <strong className="text-white">Minggu 1: Konsep & Desain</strong>
                      </div>
                      <div>
                        <span className="block text-white/40">Deliverable:</span>
                        <strong className="text-white">PPT, Flowchart, ERD, Figma</strong>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="block text-white/40">Platform Sasaran:</span>
                        <strong className="text-white">Web React + TypeScript</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 2: ANALISIS MASALAH */}
                {currentSlide === 2 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Latar Belakang & Analisis Masalah</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Mengapa Rantai Pasok Sayur & Buah Tradisional Bermasalah?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" />
                          Sisi Petani Tradisional:
                        </div>
                        <ul className="space-y-1.5 text-white/80">
                          <li>• Ketergantungan tengkulak membuat harga beli di tingkat kebun sangat rendah.</li>
                          <li>• Tidak memiliki akses langsung ke pasar konsumen modern.</li>
                          <li>• Risiko kerugian tinggi akibat fluktuasi harga tengkulak mendadak.</li>
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="font-bold text-red-400 text-sm flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" />
                          Sisi Konsumen & Kualitas:
                        </div>
                        <ul className="space-y-1.5 text-white/80">
                          <li>• Distribusi berlapis memakan 3-5 hari sehingga daun layu dan vitamin hilang.</li>
                          <li>• Tingkat susut susut panen (food loss) pascapanen mencapai 35-40%.</li>
                          <li>• Harga di supermarket menjadi sangat mahal karena margin berlapis.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 3: SOLUSI AGROFRESH */}
                {currentSlide === 3 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Solusi Perangkat Lunak</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Solusi AgroFresh: Model Direct-from-Farm Berpendingin
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-white/5 border border-[#8BCF8B]/40 space-y-2">
                        <div className="w-8 h-8 rounded-xl bg-[#8BCF8B]/20 text-[#8BCF8B] flex items-center justify-center font-bold">1</div>
                        <h4 className="font-bold text-white text-sm">Direct Marketplace</h4>
                        <p className="text-white/70">
                          Petani mengunggah hasil panennya sendiri secara langsung tanpa perantara tengkulak.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-[#8BCF8B]/40 space-y-2">
                        <div className="w-8 h-8 rounded-xl bg-[#8BCF8B]/20 text-[#8BCF8B] flex items-center justify-center font-bold">2</div>
                        <h4 className="font-bold text-white text-sm">Cold-Chain Delivery</h4>
                        <p className="text-white/70">
                          Pilihan pengiriman berpendingin khusus menjaga komoditas tetap segar dan renyah sampai di rumah.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-[#8BCF8B]/40 space-y-2">
                        <div className="w-8 h-8 rounded-xl bg-[#8BCF8B]/20 text-[#8BCF8B] flex items-center justify-center font-bold">3</div>
                        <h4 className="font-bold text-white text-sm">Validasi Stok Realtime</h4>
                        <p className="text-white/70">
                          Sistem otomatis mencegah pemesanan melebihi ketersediaan panen petani saat checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 4: KEBUTUHAN SISTEM (SRS) */}
                {currentSlide === 4 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Spesifikasi Kebutuhan Perangkat Lunak (SRS)</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Kebutuhan Fungsional & Non-Fungsional
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="font-bold text-[#8BCF8B] text-sm">Kebutuhan Fungsional (FR):</div>
                        <ul className="space-y-1 text-white/80">
                          <li>• <strong>FR-01:</strong> Manajemen 80 komoditas sayur & buah (CRUD).</li>
                          <li>• <strong>FR-02:</strong> Pencarian & filter kategori, harga, dan keaslian.</li>
                          <li>• <strong>FR-03:</strong> Keranjang belanja dinamis dengan verifikasi kuota stok.</li>
                          <li>• <strong>FR-04:</strong> Checkout kurir dingin & simulasi pembayaran QRIS/VA.</li>
                          <li>• <strong>FR-05:</strong> Tracking status pesanan bertahap realtime.</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="font-bold text-blue-400 text-sm">Kebutuhan Non-Fungsional (NFR):</div>
                        <ul className="space-y-1 text-white/80">
                          <li>• <strong>NFR-01 Usability:</strong> Antarmuka intuitif standar Figma Clean UI.</li>
                          <li>• <strong>NFR-02 Performance:</strong> Waktu respons muat katalog &lt; 1.5 detik.</li>
                          <li>• <strong>NFR-03 Reliability:</strong> Data persisten aman dengan LocalStorage cache.</li>
                          <li>• <strong>NFR-04 Portability:</strong> Siap dijalankan di localhost via 1-klik script.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 5: FLOWCHART */}
                {currentSlide === 5 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Pemodelan Alur Bisnis</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Diagram Flowchart Alur Petani & Pembeli
                      </h3>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs text-white/80">
                      <p>
                        Sistem dirancang dengan 2 jalur utama terpisah yang saling terhubung:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                          <strong className="text-[#8BCF8B] block mb-1">Alur Petani:</strong>
                          Login &rarr; Form Input Panen &rarr; Validasi Format &rarr; Publikasi ke Database & Katalog.
                        </div>
                        <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                          <strong className="text-blue-400 block mb-1">Alur Pembeli:</strong>
                          Jelajah &rarr; Filter &rarr; Keranjang &rarr; Validasi Stok &rarr; Checkout Kurir Pendingin &rarr; Invoice.
                        </div>
                      </div>
                      <p className="text-[11px] text-white/60">
                        *Detail diagram lengkap dan notasi keputusan dapat dilihat langsung pada Tab 2 Diagram Flowchart.
                      </p>
                    </div>
                  </div>
                )}

                {/* SLIDE 6: ERD */}
                {currentSlide === 6 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Perancangan Basis Data</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Entity Relationship Diagram (ERD)
                      </h3>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs text-white/80">
                      <p>
                        Struktur database terhubung dengan 5 entitas utama dalam bentuk normalisasi ketiga (3NF):
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-white/10 font-mono font-bold">users</div>
                        <div className="p-2.5 rounded-xl bg-white/10 font-mono font-bold">categories</div>
                        <div className="p-2.5 rounded-xl bg-white/10 font-mono font-bold">products</div>
                        <div className="p-2.5 rounded-xl bg-white/10 font-mono font-bold">orders</div>
                        <div className="p-2.5 rounded-xl bg-white/10 font-mono font-bold">order_items</div>
                      </div>
                      <p className="text-[11px] text-white/60">
                        Integritas data dijamin melalui foreign key <code>categoryId &rarr; categories(id)</code> dan <code>userId &rarr; users(id)</code>.
                      </p>
                    </div>
                  </div>
                )}

                {/* SLIDE 7: FIGMA & UI */}
                {currentSlide === 7 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Perancangan UI / UX</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Desain Antarmuka Figma (Design System & Frame)
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                        <strong className="text-[#8BCF8B] block">Clean & Calming Tone</strong>
                        <p className="text-white/70">Warna dominan Natural Emerald (#4D9954) dan Soft Mint (#F7FBF5) menghadirkan nuansa kesegaran alam.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                        <strong className="text-[#8BCF8B] block">6 Artboard Lengkap</strong>
                        <p className="text-white/70">Mencakup Beranda, Katalog, Form Upload Petani, Checkout Kurir Dingin, Mobile View, dan Style Guide.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                        <strong className="text-[#8BCF8B] block">Micro-Interactions</strong>
                        <p className="text-white/70">Komponen interaktif tombol hover, badge status pesanan, dan feedback transaksi instan.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 8: ROADMAP */}
                {currentSlide === 8 && (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <span className="text-xs font-bold text-[#8BCF8B] uppercase tracking-wider">Rencana Lanjutan</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        Roadmap Implementasi Sesi 2 & Sesi 3
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-5 rounded-2xl bg-[#E4F4E4]/10 border border-[#8BCF8B]/40 space-y-2">
                        <span className="text-xs font-bold text-[#8BCF8B]">SESI 2 / MINGGU 2 (Minggu Depan):</span>
                        <h4 className="font-bold text-white text-sm">Demo Live Web Fitur Inti</h4>
                        <ul className="space-y-1 text-white/80">
                          <li>• Tampilkan browser live dengan kodingan Vite + React + TypeScript.</li>
                          <li>• Buktikan fitur Petani unggah komoditas baru tersimpan ke database.</li>
                          <li>• Buktikan pembeli (Sumanto) melakukan checkout sukses.</li>
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <span className="text-xs font-bold text-white/60">SESI 3 / MINGGU 3 (Minggu Terakhir):</span>
                        <h4 className="font-bold text-white text-sm">Web Penuh + Black Box Testing</h4>
                        <ul className="space-y-1 text-white/80">
                          <li>• Simulasi lengkap 9 use case tanpa kendala error.</li>
                          <li>• Tunjukkan tabel matriks uji Black Box Testing dengan status 100% Passed.</li>
                          <li>• Penyerahan laporan akhir dan paket localhost.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Slide Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs">
                <button
                  onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                  disabled={currentSlide === 1}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white font-bold flex items-center gap-2 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Slide Sebelumnya</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i + 1)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlide === i + 1 ? 'w-6 bg-[#8BCF8B]' : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
                  disabled={currentSlide === totalSlides}
                  className="px-4 py-2 rounded-xl bg-[#4D9954] hover:bg-[#3d7a43] disabled:opacity-30 disabled:hover:bg-[#4D9954] text-white font-bold flex items-center gap-2 transition-all"
                >
                  <span>Slide Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
