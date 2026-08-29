import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  Flame, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Search, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

interface ComponentZone {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  symptoms: string[];
  diagnosticMethod: string;
  reworkTechnique: string;
  typicalCost: string;
  turnaround: string;
  svgCoords: { x: number; y: number; w: number; h: number };
}

const PCB_ZONES: ComponentZone[] = [
  {
    id: 'core-die',
    name: 'GPU Silicon Core Die (GA102 / AD102 / Navi 31)',
    category: 'Chipset ASIC Utama',
    shortDesc: 'Komponen otak pemrosesan grafis utama. Rentan terhadap pump-out pasta termal, retak micro-bumps solder, atau degradasi termal.',
    symptoms: [
      'Thermal throttling / suhu hotspot tembus >105°C',
      'Layar langsung mati atau BSOD saat membuka game 3D',
      'PC freeze saat GPU mencoba boost clock'
    ],
    diagnosticMethod: 'Analisis pencitraan kamera thermal FLIR & grafik peluruhan clock GPU-Z di bawah uji FurMark.',
    reworkTechnique: 'Aplikasi phase-change thermal pad Honeywell PTM7950, reflow chamber vakum, atau reballing chipset BGA.',
    typicalCost: 'Rp 650.000 - Rp 1.500.000',
    turnaround: '24 Jam',
    svgCoords: { x: 38, y: 30, w: 24, h: 36 }
  },
  {
    id: 'vram-chips',
    name: 'Modul GDDR6 / GDDR6X VRAM BGA (Micron / Samsung)',
    category: 'Subsistem Memori',
    shortDesc: 'Bank memori kecepatan tinggi 21+ Gbps. Suhu operasional tinggi menyebabkan bit-flip internal atau bola solder BGA retak.',
    symptoms: [
      'Error Code 43 di Device Manager Windows',
      'Artifak visual berupa kotak catur (checkerboard) atau garis vertikal',
      'Blue screen nvlddmkm.sys crash saat driver di-install'
    ],
    diagnosticMethod: 'Uji software lab diagnostik Linux NVIDIA MATS / AMD MODS untuk mendeteksi IC memori yang error (misal Bank B0 bit failure).',
    reworkTechnique: 'Pencabutan IC BGA hot air station 380°C, reballing timah Sn63Pb37 berkualitas, dan penggantian IC VRAM baru grade original.',
    typicalCost: 'Rp 750.000 - Rp 1.800.000',
    turnaround: '24-48 Jam',
    svgCoords: { x: 26, y: 22, w: 48, h: 52 }
  },
  {
    id: 'vrm-mosfet',
    name: 'DrMOS Smart Power Stage & High-Side MOSFET',
    category: 'Suplai Daya (VRM)',
    shortDesc: 'Menurunkan tegangan 12V menjadi 0.8V Vcore dengan arus hingga 400+ Ampere. Beban transient memicu korsleting langsung ke ground.',
    symptoms: [
      'PSU bunyi "klik" dan proteksi OCP langsung aktif mati seketika',
      'PC sama sekali tidak mau nyala jika VGA terpasang di motherboard',
      'Resistansi short 0.00Ω pada jalur input tegangan 12V'
    ],
    diagnosticMethod: 'Injeksi arus DC tegangan rendah (1.0V 3A) dipadukan dengan deteksi kamera termal inframerah FLIR.',
    reworkTechnique: 'Desoldering mikroskop stereo trinokuler, cek gate resistor/dioda, dan penyolderan DrMOS OEM Vishay SiC654A / Alpha & Omega baru.',
    typicalCost: 'Rp 550.000 - Rp 1.200.000',
    turnaround: '24-48 Jam',
    svgCoords: { x: 12, y: 20, w: 12, h: 56 }
  },
  {
    id: 'power-header',
    name: 'Konektor 12VHPWR 16-Pin / 8-Pin PCIe',
    category: 'Terminal Input Arus Tinggi',
    shortDesc: 'Menyalurkan daya hingga 600 Watt. Kerapatan pin yang kurang presisi menimbulkan resistansi tinggi hingga soket meleleh terbakar.',
    symptoms: [
      'Plastik konektor daya meleleh / berubah bentuk',
      'Tercium bau gosong komponen terbakar',
      'Display tiba-tiba hilang (black screen) saat beban daya puncak'
    ],
    diagnosticMethod: 'Inspeksi mikroskop optik perbesaran tinggi untuk memeriksa pin hangus + uji resistansi 4-wire milliohm pada jalur tembaga.',
    reworkTechnique: 'Pembersihan lapisan karbonisasi PCB, rekonstruksi jalur tembaga 2oz, dan pemasangan soket baru standar revisi 12V-2x6.',
    typicalCost: 'Rp 850.000 - Rp 1.950.000',
    turnaround: '48 Jam',
    svgCoords: { x: 74, y: 10, w: 18, h: 22 }
  },
  {
    id: 'pcie-gold-fingers',
    name: 'Pin Emas PCIe 4.0/5.0 & Jalur Aux 3.3V',
    category: 'Sinyal Bus & Fisik PCB',
    shortDesc: 'Jalur komunikasi data ke motherboard. VGA berat tanpa holder dapat melengkung dan meretakkan jalur tembaga internal.',
    symptoms: [
      'VGA tidak terdeteksi oleh motherboard (LED VGA menyala merah)',
      'Kecepatan PCIe tersangkut di Gen 1.1 x1 dan tidak mau naik ke Gen 4.0 x16',
      'Fisik sudut PCB patah, sompel, atau pin emas terkelupas'
    ],
    diagnosticMethod: 'Pemeriksaan mikroskop optik 40x zoom dan pengukuran kontinuitas sinyal bus diferensial.',
    reworkTechnique: 'Penyambungan micro-jumper kawat 0.1mm di bawah mikroskop, insulasi UV solder mask tahan panas, dan restorasi gold pad.',
    typicalCost: 'Rp 450.000 - Rp 950.000',
    turnaround: '24 Jam',
    svgCoords: { x: 20, y: 84, w: 60, h: 12 }
  },
  {
    id: 'bios-flash',
    name: 'Dual SPI Flash EEPROM & UEFI Firmware',
    category: 'Firmware & Logika Chip',
    shortDesc: 'Menyimpan BIOS VGA dan inisialisasi GOP. Rusak akibat gagal flash update, modding mining, atau lonjakan voltase.',
    symptoms: [
      'Layar hitam total (no display) tapi kipas berputar kencang 100%',
      'Sistem tidak lolos tahap inisialisasi POST UEFI',
      'Switch Dual BIOS tidak merespons'
    ],
    diagnosticMethod: 'Pembacaan hex data dan verifikasi image firmware OEM pabrikan menggunakan programmer eksternal SPI CH341A/RT809H.',
    reworkTechnique: 'Desoldering IC SOIC-8, verifikasi bad sector chip, flashing binary resmi tervalidasi SHA-256, dan solder ulang rapi.',
    typicalCost: 'Rp 350.000 - Rp 650.000',
    turnaround: '12 Jam',
    svgCoords: { x: 76, y: 64, w: 14, h: 16 }
  }
];

interface InteractiveTriageProps {
  onSelectComponentForBooking: (symptom: string) => void;
}

export const InteractiveTriage: React.FC<InteractiveTriageProps> = ({
  onSelectComponentForBooking
}) => {
  const [selectedZone, setSelectedZone] = useState<ComponentZone>(PCB_ZONES[0]);

  return (
    <section id="triage-section" className="py-16 sm:py-24 bg-neutral-950/95 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>SKEMATIK & DIAGNOSTIK HARDWARE INTERAKTIF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Triase & Anatomi <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">Kerusakan PCB VGA</span>
          </h2>
          <p className="text-neutral-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Klik area sirkuit kartu grafis di bawah ini untuk mempelajari jenis kerusakan, metode diagnosa alat lab, serta estimasi pengerjaan mikrosoldering di Ruli Computer.
          </p>
        </div>

        {/* Two Column Layout: Interactive Visual PCB & Deep Component Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Visual Board */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 font-bold uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-400" />
                <span>Peta Arsitektur PCB Kartu Grafis</span>
              </span>
              <span className="text-red-400 font-bold">KLIK UNTUK INSPEKSI</span>
            </div>

            {/* Visual Circuit Board SVG Map */}
            <div className="relative aspect-[16/10] bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden shadow-inner p-3 flex items-center justify-center">
              
              {/* Circuit Board Trace Background Grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                {/* PCB Main Substrate */}
                <rect x="5" y="5" width="90" height="90" rx="3" fill="#121212" stroke="#262626" strokeWidth="0.8" />

                {/* Decorative Trace Buses */}
                <path d="M 10 30 L 25 30 L 35 40 L 65 40 L 75 30 L 90 30" stroke="#dc2626" strokeWidth="0.4" fill="none" opacity="0.35" />
                <path d="M 10 60 L 25 60 L 35 50 L 65 50 L 75 60 L 90 60" stroke="#dc2626" strokeWidth="0.4" fill="none" opacity="0.35" />
                <path d="M 50 10 L 50 90" stroke="#dc2626" strokeWidth="0.3" strokeDasharray="1,1" fill="none" opacity="0.3" />

                {/* Clickable Zone Rectangles */}
                {PCB_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  const { x, y, w, h } = zone.svgCoords;

                  return (
                    <g
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className="cursor-pointer transition-all duration-300 group"
                    >
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx="2"
                        className={`transition-all duration-300 ${
                          isSelected
                            ? 'fill-red-500/30 stroke-red-500 stroke-[1.2]'
                            : 'fill-neutral-800/80 hover:fill-red-950/60 stroke-neutral-700 hover:stroke-red-500/80 stroke-[0.8]'
                        }`}
                      />
                      <text
                        x={x + w / 2}
                        y={y + h / 2 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`text-[3.2px] font-mono font-bold pointer-events-none select-none transition-all ${
                          isSelected ? 'fill-red-300' : 'fill-neutral-400 group-hover:fill-neutral-200'
                        }`}
                      >
                        {zone.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Zone Selector Buttons List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              {PCB_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer ${
                    selectedZone.id === zone.id
                      ? 'bg-red-950/80 border-red-500 text-red-300 font-bold'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">{zone.category}</div>
                  <div className="truncate mt-0.5">{zone.name.split('(')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Deep Diagnostic Inspector Card */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-7 shadow-2xl space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-300 font-bold">
                  {selectedZone.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {selectedZone.typicalCost}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {selectedZone.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {selectedZone.shortDesc}
              </p>
            </div>

            {/* Failure Symptoms */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Gejala Kerusakan Umum:
              </h4>
              <ul className="space-y-1 text-xs text-neutral-300 font-mono">
                {selectedZone.symptoms.map((symp, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-neutral-950/70 p-2 rounded border border-neutral-800/80">
                    <span className="text-red-400">•</span>
                    <span>{symp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagnostic & Rework Method */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-red-400 font-bold text-[11px] mb-1">
                  🔬 Prosedur Diagnosa Lab:
                </div>
                <div className="text-neutral-300 text-[11px] leading-relaxed">
                  {selectedZone.diagnosticMethod}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-emerald-400 font-bold text-[11px] mb-1">
                  ⚙️ Protokol Rekonstruksi Mikrosoldering:
                </div>
                <div className="text-neutral-300 text-[11px] leading-relaxed">
                  {selectedZone.reworkTechnique}
                </div>
              </div>
            </div>

            {/* Card Footer with CTA */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-3">
              <div className="text-xs font-mono text-neutral-400">
                Estimasi: <span className="text-white font-bold">{selectedZone.turnaround}</span>
              </div>

              <button
                onClick={() => onSelectComponentForBooking(selectedZone.symptoms[0])}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono shadow-md shadow-red-600/25 cursor-pointer"
              >
                <span>Booking Servis Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

