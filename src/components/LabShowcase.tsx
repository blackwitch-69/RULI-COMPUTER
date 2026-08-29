import React from 'react';
import { LAB_EQUIPMENT_DATA } from '../data/portfolioData';
import { Cpu, Award, ShieldCheck, CheckCircle2, Flame, Wrench } from 'lucide-react';
import benchImg from '../assets/images/gpu_repair_bench_1788038028087.jpg';

export const LabShowcase: React.FC = () => {
  return (
    <section id="lab-section" className="py-16 sm:py-24 bg-neutral-950 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
            <Cpu className="w-3.5 h-3.5 text-red-400" />
            <span>INFRASTRUKTUR LAB & MEJA KERJA ESD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Peralatan Lab & Mikrosoldering <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">Ruli Computer</span>
          </h2>
          <p className="text-neutral-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Papan sirkuit VGA modern dengan 14-layer berkerapatan tinggi membutuhkan presisi tingkat operasi bedah. Kami menyediakan fasilitas lab ESD-safe dengan instrumen termal, optik mikroskopis, dan diagnostik terkalibrasi.
          </p>
        </div>

        {/* Feature Hero Image Banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-[21/9] max-h-96 border border-neutral-800 mb-12 shadow-2xl group">
          <img
            src={benchImg}
            alt="Meja kerja lab servis kartu grafis Ruli Computer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="max-w-xl space-y-1 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded bg-red-950/90 border border-red-700 text-red-300 font-bold uppercase text-[10px]">
                Meja Kerja Rework ESD Class 0 #01
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Stasiun Kerja Bersertifikasi Standar IPC-7711/7721
              </h3>
              <p className="text-neutral-300 text-[11px] font-sans">
                Monitoring grounding ESD konstan, pembersih ultrasonik kimiawi, serta pemanas bawah (IR Preheater) inframerah mencegah PCB melengkung (delamination) dan thermal shock saat pencabutan chipset BGA.
              </p>
            </div>
          </div>
        </div>

        {/* Equipment Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_EQUIPMENT_DATA.map((gear, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {gear.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                    {gear.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {gear.name}
                </h3>
                
                <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800/80 font-mono text-[11px] text-red-300/90 mb-3">
                  {gear.specs}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {gear.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terkalibrasi & Aktif di Meja Kerja</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Certifications Strip */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Standar Soldering IPC-A-610 Kelas 3</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">Standar ketahanan solder level komputasi tinggi dan industri aerospace.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Garansi Servis Penuh Hingga 90 Hari</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">Garansi langsung untuk seluruh penggantian VRAM, MOSFET, dan jumper jalur mikro.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Uji Stres Panas 24 Jam FurMark & 3DMark</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">Setiap unit kartu grafis diuji beban penuh sebelum dikirim kembali ke pelanggan.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

