import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 text-neutral-400 font-sans text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-extrabold text-xl text-white tracking-tight block">
                RULI <span className="text-red-500">COMPUTER</span>
              </span>
              <span className="text-[10px] font-mono text-red-400/90 tracking-widest uppercase block mt-1">
                GPU Repair & Micro-Soldering Lab
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Laboratorium spesialis perbaikan kartu grafis (VGA/GPU) level komponen. Melayani mikrosoldering presisi, reballing IC memori VRAM, perbaikan konektor 12VHPWR meleleh, dan thermal overhaul dengan garansi 90 hari.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Standar Mikrosoldering IPC-7711/7721 • Garansi No Fix No Fee</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Menu Navigasi
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavClick('portfolio')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Portofolio Perbaikan
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('triage')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Diagnosa PCB Interaktif
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('booking')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Formulir Booking Servis
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tracker')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Pelacakan Status Tiket
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('pricing')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Estimasi Biaya & Garansi
                </button>
              </li>
            </ul>
          </div>

          {/* Lab Hours & Drop-Off */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Workshop & Jam Operasional
            </div>
            <ul className="space-y-2 font-mono text-[11px]">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>Senin - Sabtu: 09:00 - 20:00 WIB<br />Minggu: Khusus Konsultasi Online</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>Workshop Ruli Computer<br />Sentra Servis Hardware Komputer Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Emergency Contact & Courier */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Kontak & Pengiriman Paket
            </div>
            <p className="text-[11px] text-neutral-400">
              Untuk pengiriman paket dari luar kota via JNE, J&T, SiCepat, atau konfirmasi resi:
            </p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>servis@rulicomputer.com</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>+62 812-3456-7890 (WhatsApp)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 bg-neutral-950/90 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Ruli Computer - Spesialis Perbaikan VGA & Hardware Komputer. Hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <span>Garansi No Fix, No Fee</span>
            <span>•</span>
            <span>Garansi Servis 90 Hari</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

