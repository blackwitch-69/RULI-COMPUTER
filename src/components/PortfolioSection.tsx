import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { RepairProject } from '../types/repair';
import { 
  Wrench, 
  CheckCircle2, 
  Flame, 
  Thermometer, 
  Activity, 
  Sparkles, 
  Layers, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  X, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  Maximize2
} from 'lucide-react';

interface PortfolioSectionProps {
  onSelectForBooking: (gpuModel: string, brand: string, symptom: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalProject, setActiveModalProject] = useState<RepairProject | null>(null);
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({});

  const categories = [
    'Semua',
    'Konektor Meleleh',
    'Ganti VRAM GDDR6X',
    'Korsleting Jalur Daya',
    'Thermal & Vapor Chamber',
    'Flash BIOS & Firmware'
  ];

  const categoryMapping: Record<string, string> = {
    'Konektor Meleleh': 'Connector Melt',
    'Ganti VRAM GDDR6X': 'VRAM Replacement',
    'Korsleting Jalur Daya': 'Power Rail Short',
    'Thermal & Vapor Chamber': 'Vapor Chamber / Thermal',
    'Flash BIOS & Firmware': 'BIOS / Firmware Recovery'
  };

  const filteredProjects = selectedCategory === 'Semua'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.issueCategory === categoryMapping[selectedCategory]);

  const handleSliderChange = (projectId: string, value: number) => {
    setSliderPositions(prev => ({ ...prev, [projectId]: value }));
  };

  return (
    <section id="portfolio-section" className="py-16 sm:py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
              <Wrench className="w-3.5 h-3.5 text-red-400" />
              <span>ARSIP DOKUMENTASI PROYEK LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Portofolio & Rekam Jejak <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">Servis VGA Ruli Computer</span>
            </h2>
            <p className="text-neutral-400 mt-2 max-w-2xl text-sm sm:text-base">
              Setiap VGA yang masuk ke lab kami didokumentasikan secara transparan. Mulai dari osiloskop gelombang PWM, pengujian memori MATS, perbaikan jalur tembaga mikron, hingga uji ketahanan benchmark 24 jam non-stop.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-3 bg-neutral-900/90 border border-neutral-800 rounded-xl font-mono text-xs text-neutral-300">
            <div className="text-red-400 font-bold text-lg">100%</div>
            <div className="text-[11px] leading-tight text-neutral-400">
              Lolos Uji Stabilitas<br />FurMark 4K & TimeSpy
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const sliderPos = sliderPositions[project.id] ?? 50;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group rounded-2xl bg-gradient-to-b from-neutral-900/95 to-neutral-950 border border-neutral-800 hover:border-red-500/50 p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        project.brand === 'NVIDIA'
                          ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
                          : 'bg-red-950/80 border border-red-700/60 text-red-300'
                      }`}>
                        {project.brand}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {project.issueCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-emerald-400 font-semibold">{project.costSaved}</span>
                    </div>
                  </div>

                  {/* Title & GPU Model */}
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-mono text-red-400/90 mt-1 mb-4">
                    {project.gpuModel} • {project.manufacturer}
                  </p>

                  {/* Interactive Before / After Comparison Slider Container */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-950 border border-neutral-800 my-4 select-none">
                    
                    {/* "After / Repaired" Image (Full background) */}
                    <img
                      src={project.afterImage}
                      alt={`${project.gpuModel} setelah servis`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* "Before / Damaged" Image (Clipped overlay) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={project.beforeImage}
                        alt={`${project.gpuModel} kondisi rusak`}
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: '100%', height: '100%' }}
                      />
                      {/* Before Label */}
                      <span className="absolute top-3 left-3 bg-red-950/90 border border-red-700 text-red-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                        KONDISI RUSAK (SEBELUM)
                      </span>
                    </div>

                    {/* After Label */}
                    <span className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                      SUDAH SELESAI (LOLOS UJI)
                    </span>

                    {/* Slider Line & Thumb */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_10px_#ef4444] pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-neutral-900 border-2 border-red-500 text-red-400 flex items-center justify-center shadow-lg">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Invisible Range Input Slider for touch and mouse */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                      aria-label="Geser slider perbandingan sebelum dan sesudah"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />

                    {/* Hint overlay */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-[10px] font-mono text-neutral-300 pointer-events-none backdrop-blur-sm">
                      ◀ Geser slider untuk membandingkan ▶
                    </div>
                  </div>

                  {/* Quick Diagnostics Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4 text-xs font-mono">
                    <div className="p-2 rounded bg-neutral-950/70 border border-neutral-800">
                      <div className="text-neutral-400 text-[10px]">Waktu Pengerjaan</div>
                      <div className="text-neutral-200 font-semibold mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-400" />
                        {project.turnaroundTime}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-neutral-950/70 border border-neutral-800">
                      <div className="text-neutral-400 text-[10px]">Suhu Hotspot</div>
                      <div className="text-neutral-200 font-semibold mt-0.5 flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-emerald-400" />
                        <span className="line-through text-red-400 text-[11px]">{project.hotspotBefore}°C</span>
                        <span className="text-emerald-400">{project.hotspotAfter}°C</span>
                      </div>
                    </div>
                    <div className="p-2 rounded bg-neutral-950/70 border border-neutral-800 col-span-2 sm:col-span-1">
                      <div className="text-neutral-400 text-[10px]">FurMark 24 Jam</div>
                      <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {project.benchmarks.furmarkFps} FPS Stabil
                      </div>
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-3 pt-5 mt-4 border-t border-neutral-800/80">
                  <button
                    id={`view-details-${project.id}`}
                    onClick={() => setActiveModalProject(project)}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Detail Diagnostik & Log</span>
                  </button>

                  <button
                    id={`book-similar-${project.id}`}
                    onClick={() => onSelectForBooking(project.gpuModel, project.brand, project.symptoms[0] || '')}
                    className="py-2.5 px-4 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700/60 text-red-300 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Servis Tipe Ini</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Full Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-300 font-mono text-xs font-semibold">
                    {activeModalProject.brand} • {activeModalProject.issueCategory}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs">
                    {activeModalProject.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
                <p className="text-sm font-mono text-neutral-400 mt-1">
                  VGA Target: {activeModalProject.gpuModel} ({activeModalProject.manufacturer})
                </p>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 cursor-pointer"
                aria-label="Tutup Detail Proyek"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Diagnostic Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Symptoms & Diagnostic Steps */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Gejala Awal Yang Dilaporkan
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {activeModalProject.symptoms.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-neutral-950/70 p-2 rounded border border-neutral-800">
                        <span className="text-red-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-red-400" /> Temuan Diagnostik Lab
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {activeModalProject.diagnosticSteps.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-neutral-950/70 p-2 rounded border border-neutral-800">
                        <span className="text-red-400 font-mono">0{idx+1}</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rework Done & Tools Used */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Tindakan Pengerjaan Rework
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {activeModalProject.workDone.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-neutral-950/70 p-2 rounded border border-neutral-800">
                        <span className="text-emerald-400">✓</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" /> Alat Lab Yang Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.toolsUsed.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-mono px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-amber-300/90">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Voltage Rail Telemetry Log Table (if available) */}
            {activeModalProject.voltageRailLogs && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-red-400" /> Data Pengukuran Rel Tegangan (Multimeter & Osiloskop)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-neutral-800">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                      <tr>
                        <th className="p-3">Jalur Tegangan</th>
                        <th className="p-3">Standar Voltase</th>
                        <th className="p-3">Sebelum Servis</th>
                        <th className="p-3">Setelah Servis</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 bg-neutral-950/50">
                      {activeModalProject.voltageRailLogs.map((log, idx) => (
                        <tr key={idx} className="hover:bg-neutral-800/40">
                          <td className="p-3 font-semibold text-neutral-200">{log.rail}</td>
                          <td className="p-3 text-neutral-400">{log.standard}</td>
                          <td className="p-3 text-red-400">{log.measuredBefore}</td>
                          <td className="p-3 text-emerald-400 font-semibold">{log.measuredAfter}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MATS Terminal Log Terminal (if available) */}
            {activeModalProject.matsLog && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> Log Output Uji Memori VRAM MATS / MODS
                </h4>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-300 whitespace-pre-wrap overflow-x-auto max-h-48">
                  {activeModalProject.matsLog}
                </div>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <div className="text-xs font-mono text-neutral-400">
                Pengerjaan: <span className="text-white font-bold">{activeModalProject.turnaroundTime}</span> • 
                Keuntungan: <span className="text-emerald-400 font-bold ml-1">{activeModalProject.costSaved}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                >
                  Tutup Log
                </button>
                <button
                  onClick={() => {
                    const project = activeModalProject;
                    setActiveModalProject(null);
                    onSelectForBooking(project.gpuModel, project.brand, project.symptoms[0] || '');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-red-600/25 cursor-pointer"
                >
                  <span>Booking Servis VGA Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

