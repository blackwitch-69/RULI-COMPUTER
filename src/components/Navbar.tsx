import React, { useState } from 'react';
import { Cpu, Wrench, Search, Calendar, ShieldCheck, ChevronRight, Menu, X, Activity, Flame, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickTrack: (ticketId: string) => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onQuickTrack,
  bookingCount
}) => {
  const [quickTicketInput, setQuickTicketInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTicketInput.trim()) {
      onQuickTrack(quickTicketInput.trim().toUpperCase());
      setQuickTicketInput('');
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'portfolio', label: 'Portofolio Servis', icon: Wrench },
    { id: 'triage', label: 'Diagnostik Kerusakan', icon: Activity },
    { id: 'booking', label: 'Booking Servis', icon: Calendar, badge: 'Estimasi Instan' },
    { id: 'tracker', label: 'Lacak Status VGA', icon: Search, badge: bookingCount > 0 ? `${bookingCount} Aktif` : undefined },
    { id: 'pricing', label: 'Biaya & Garansi', icon: ShieldCheck },
    { id: 'lab', label: 'Lab & Peralatan', icon: Cpu }
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-red-950 border-b border-red-900/40 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-mono text-red-400 font-semibold">STATUS LAB:</span>
            <span>Menerima Servis Kirim (Paket) & Antar Langsung ke Lab | Pengerjaan 24-48 Jam untuk Seri RTX 40/30 & RX 7000</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-400 font-mono text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Garansi Tidak Jadi = Bebas Biaya Servis
            </span>
            <span className="text-neutral-600">|</span>
            <span className="flex items-center gap-1 text-red-400">
              <Flame className="w-3.5 h-3.5" /> Garansi Servis Solder 90 Hari
            </span>
            <span className="text-neutral-600">|</span>
            <span className="flex items-center gap-1 text-white font-medium">
              <Phone className="w-3.5 h-3.5 text-red-400" /> WA: 0812-8899-7766
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Ruli Computer */}
          <div 
            id="brand-logo-btn"
            onClick={() => setActiveTab('portfolio')}
            className="flex items-center cursor-pointer group select-none py-1"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  RULI <span className="text-red-500">COMPUTER</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800/60 text-red-300 font-semibold uppercase">
                  LAB L3
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono tracking-tight -mt-0.5">
                Spesialis Servis & Rekonstruksi GPU VGA Card
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-neutral-900 border border-red-500/50 shadow-sm shadow-red-500/10'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Ticket Tracker & Primary Action */}
          <div className="hidden sm:flex items-center gap-3">
            <form onSubmit={handleQuickTrackSubmit} className="relative">
              <input
                id="quick-ticket-search-input"
                type="text"
                value={quickTicketInput}
                onChange={(e) => setQuickTicketInput(e.target.value)}
                placeholder="No. Tiket (misal: RC-8402)"
                className="w-56 h-9 pl-8 pr-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5 pointer-events-none" />
              <button
                type="submit"
                id="quick-track-submit-btn"
                className="absolute right-1 top-1 h-7 px-2 bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-[10px] font-mono font-medium rounded text-neutral-400 transition-colors cursor-pointer"
              >
                CARI
              </button>
            </form>

            <button
              id="cta-book-repair-header-btn"
              onClick={() => setActiveTab('booking')}
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-600/25 hover:shadow-red-600/40 transition-all cursor-pointer"
            >
              <span>Booking Servis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="cta-book-repair-mobile-top-btn"
              onClick={() => setActiveTab('booking')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs shadow-sm shadow-red-600/30 cursor-pointer"
            >
              <span>Booking</span>
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950/95 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {/* Quick tracker in mobile */}
          <form onSubmit={handleQuickTrackSubmit} className="relative pt-1">
            <input
              type="text"
              value={quickTicketInput}
              onChange={(e) => setQuickTicketInput(e.target.value)}
              placeholder="Cari tiket (misal: RC-8402)"
              className="w-full h-10 pl-9 pr-16 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-white"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-4" />
            <button
              type="submit"
              className="absolute right-1.5 top-2.5 h-7 px-3 bg-red-600 text-white font-bold text-xs rounded cursor-pointer"
            >
              Lacak
            </button>
          </form>

          <div className="grid grid-cols-1 gap-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg text-sm font-medium cursor-pointer ${
                    isActive
                      ? 'bg-red-950/60 border border-red-800/60 text-red-300'
                      : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-red-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

