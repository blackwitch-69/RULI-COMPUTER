import React from 'react';
import { Cpu, ShieldCheck, Flame, Zap, ArrowRight, Activity, CheckCircle2, Award } from 'lucide-react';
import microsolderImg from '../assets/images/gpu_microsoldering_repair_1788038002140.jpg';
import thermalImg from '../assets/images/gpu_thermal_inspection_1788038015677.jpg';

interface HeroProps {
  onBookClick: () => void;
  onExploreProjects: () => void;
  onTriageClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreProjects,
  onTriageClick
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-neutral-800/80">
      {/* Background glow effects - Red & Crimson Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-red-600/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium shadow-inner">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>LAB SPESIALIS MIKRO-SOLDER LEVEL 3 (L3) BGA REWORK</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GARANSI: TIDAK JADI = BEBAS BIAYA SERVIS</span>
          </div>
        </div>

        {/* Grid Layout: Left Pitch, Right Interactive Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subhead, CTA, Stats */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Solusi Ahli <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">Servis VGA & GPU</span> Tingkat Komponen
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal">
              Jangan buang kartu grafis belasan juta hanya karena MOSFET seharga ribuan rupiah korslet atau VRAM rusak! <strong className="text-white font-semibold">Ruli Computer</strong> melayani micro-soldering presisi, reballing BGA, rekonstruksi konektor 12VHPWR hangus, ganti chip VRAM, dan perbaikan hotspot panas bergaransi hingga 90 hari.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-cta-book-btn"
                onClick={onBookClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white fill-white" />
                <span>Booking Servis & Estimasi Biaya</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-cases-btn"
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-sm hover:text-white transition-all cursor-pointer"
              >
                <span>Lihat Portofolio Rework</span>
              </button>

              <button
                id="hero-cta-triage-btn"
                onClick={onTriageClick}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900/50 hover:bg-red-950/40 border border-neutral-800 hover:border-red-800/60 text-red-400 text-xs font-mono transition-all cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Diagnostik Mandiri Interaktif</span>
              </button>
            </div>

            {/* Trust Metric Row */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                <div className="text-2xl font-extrabold text-white font-mono">2.480+</div>
                <div className="text-xs text-neutral-400 mt-0.5">VGA Berhasil Diperbaiki</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">98,4%</div>
                <div className="text-xs text-neutral-400 mt-0.5">Tingkat Keberhasilan Lab</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                <div className="text-2xl font-extrabold text-red-400 font-mono">90 Hari</div>
                <div className="text-xs text-neutral-400 mt-0.5">Garansi Servis Solder</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                <div className="text-2xl font-extrabold text-amber-400 font-mono">Rp 0</div>
                <div className="text-xs text-neutral-400 mt-0.5">Jika Tidak Bisa Diservis</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Lab Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/95 via-neutral-900/95 to-neutral-950 border border-neutral-800 p-4 sm:p-5 shadow-2xl shadow-black/70 overflow-hidden">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-white font-semibold uppercase">LIVE WORKBENCH LAB</span>
                </div>
                <div className="font-mono text-[11px] text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/50">
                  MEJA SERVIS #01 - AKTIF
                </div>
              </div>

              {/* Media image preview with overlay telemetry */}
              <div className="relative rounded-xl overflow-hidden my-3 aspect-[16/10] bg-neutral-950 border border-neutral-800 group">
                <img
                  src={microsolderImg}
                  alt="Proses micro-soldering GPU di meja servis Ruli Computer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Live Diagnostic Overlay HUD */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent flex flex-col justify-between p-3.5 font-mono text-[11px]">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-700 text-red-300 backdrop-blur-sm font-semibold">
                      GA102 VRAM BANK B0
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-700 text-emerald-300 backdrop-blur-sm">
                      1.35V FBVDD STABIL
                    </span>
                  </div>

                  <div className="space-y-1 bg-neutral-950/90 p-2.5 rounded-lg border border-neutral-800 backdrop-blur-md">
                    <div className="flex justify-between text-neutral-400">
                      <span>Target Rework:</span>
                      <span className="text-white font-semibold">Micron D9ZBD GDDR6X</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Preheat Papan:</span>
                      <span className="text-amber-400">150°C IR Quartz</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Paduan Timah:</span>
                      <span className="text-red-300">Sn63Pb37 Leaded BGA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Bottom Quick Features */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between text-neutral-300 p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Uji Diagnostik Memori NVIDIA MATS/MODS</span>
                  </span>
                  <span className="font-mono text-emerald-400 text-[11px]">LOLOS 100%</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300 p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400" />
                    <span>Stress Test 24 Jam FurMark 4K + 3DMark</span>
                  </span>
                  <span className="font-mono text-red-400 text-[11px]">TERVALIDASI</span>
                </div>
              </div>

              {/* Fast Action */}
              <button
                id="hero-card-fast-track-btn"
                onClick={onBookClick}
                className="w-full mt-3 py-2.5 px-3 rounded-lg bg-neutral-800 hover:bg-red-950/80 hover:text-white border border-neutral-700 hover:border-red-800 text-xs font-mono text-neutral-200 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Cek Kemungkinan Servis VGA Anda Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Supported Brands Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/70">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider text-center mb-4">
            Arsitektur GPU & Brand Yang Dilayani
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 transition-all duration-300 text-neutral-400 font-bold text-sm">
            <span className="hover:text-white transition-colors">NVIDIA GeForce RTX</span>
            <span className="hover:text-red-400 transition-colors">AMD Radeon RX</span>
            <span className="hover:text-white transition-colors">Intel Arc</span>
            <span className="hover:text-red-400 transition-colors">ASUS ROG / TUF</span>
            <span className="hover:text-red-500 transition-colors">MSI Suprim / Gaming</span>
            <span className="hover:text-amber-400 transition-colors">EVGA FTW3</span>
            <span className="hover:text-orange-400 transition-colors">Gigabyte AORUS / Gaming</span>
            <span className="hover:text-red-400 transition-colors">Sapphire Nitro+ / Pulse</span>
            <span className="hover:text-white transition-colors">ZOTAC Gaming</span>
            <span className="hover:text-emerald-400 transition-colors">Colorful iGame</span>
          </div>
        </div>

      </div>
    </section>
  );
};

