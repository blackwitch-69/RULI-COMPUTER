import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  DollarSign, 
  Sparkles, 
  Flame, 
  Clock, 
  XCircle 
} from 'lucide-react';

interface PricingCalculatorProps {
  onStartBooking: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onStartBooking }) => {
  const [selectedGpuTier, setSelectedGpuTier] = useState<'flagship' | 'highend' | 'midrange'>('flagship');

  const repairPlans = [
    {
      category: 'Overhaul Thermal & Ganti Pasta',
      typicalIssues: 'Hotspot >105°C, Thermal Throttling, Kipas 100% Berisik, Pasta Kering/Pump-Out',
      price: 'Rp 350.000 - Rp 650.000',
      time: '12 - 24 Jam',
      includes: [
        'Pembersihan ultrasonic heatsink & fan',
        'Aplikasi Honeywell PTM7950 Phase-Change',
        'Penggantian thermal pad kalibrasi 15W/mK',
        'Kalibrasi torsi bracket pendingin'
      ]
    },
    {
      category: 'Servis Jalur Daya VRM & MOSFET',
      typicalIssues: 'Mati Total (No Power), PSU Terproteksi OCP, DrMOS Meletus, Short ke Ground',
      price: 'Rp 550.000 - Rp 1.200.000',
      time: '24 - 48 Jam',
      featured: true,
      includes: [
        'Isolasi titik short dengan kamera FLIR',
        'Penggantian DrMOS OEM / Vishay SiC654A',
        'Verifikasi sinyal PWM Gate Controller',
        'Uji beban multimeter & osiloskop'
      ]
    },
    {
      category: 'Ganti VRAM GDDR6 / GDDR6X BGA',
      typicalIssues: 'Error Code 43 Windows, Layar Artifak Kotak/Garis, Crash Driver BSOD',
      price: 'Rp 750.000 - Rp 1.800.000',
      time: '24 - 48 Jam',
      includes: [
        'Diagnosa report error Linux MATS / MODS',
        'Ekstraksi BGA hot-air & reballing timah timbal',
        'IC VRAM Micron/Samsung original teruji',
        'Verifikasi 100% Zero-Error memory scan'
      ]
    },
    {
      category: 'Rekonstruksi Soket 12VHPWR & Jalur PCB',
      typicalIssues: 'Konektor 16-Pin Meleleh/Hangus, Bau Gosong, Pin Emas PCIe Terkelupas',
      price: 'Rp 850.000 - Rp 1.950.000',
      time: '48 Jam',
      includes: [
        'Ekskavasi & pembersihan lapisan karbon PCB',
        'Penyambungan jalur tembaga multi-layer internal',
        'Pemasangan header upgrade Amphenol 12V-2x6',
        'Pelapisan UV solder mask tahan suhu tinggi'
      ]
    }
  ];

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>TRANSPARAN TANPA BIAYA TERSEMBUNYI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Estimasi Biaya & Garansi <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">No Fix No Fee</span>
          </h2>
          <p className="text-neutral-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Tanpa tagihan tak terduga. Jika inti silicon VGA Anda dinyatakan rusak fatal dan tidak dapat diperbaiki, Anda dikenakan <span className="text-emerald-400 font-bold">Biaya Diagnosa Rp 0</span>.
          </p>
        </div>

        {/* 4 Tier Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {repairPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.featured
                  ? 'bg-gradient-to-b from-red-950/30 via-neutral-900 to-neutral-950 border-2 border-red-500/60 shadow-xl shadow-red-500/10 -translate-y-1'
                  : 'bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {plan.featured && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white inline-block mb-3 shadow">
                    PALING SERING DITANGANI
                  </span>
                )}
                
                <h3 className="text-lg font-bold text-white mb-1">
                  {plan.category}
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono mb-4 min-h-[32px]">
                  {plan.typicalIssues}
                </p>

                <div className="py-3 border-y border-neutral-800/80 mb-4">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">{plan.price}</div>
                  <div className="text-xs text-red-400 font-mono mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span>Estimasi Waktu: {plan.time}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300 font-mono mb-6">
                  {plan.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onStartBooking}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  plan.featured
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/20'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white'
                }`}
              >
                Pilih Layanan Ini
              </button>
            </div>
          ))}
        </div>

        {/* Repair vs Buying New Comparison Table */}
        <div className="rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                Perbandingan: Servis di Ruli Computer vs Beli Baru
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Mengapa perbaikan mikrosoldering presisi menghemat hingga 80% biaya pengeluaran Anda.
              </p>
            </div>

            <div className="inline-flex rounded-xl bg-neutral-950 p-1 border border-neutral-800 text-xs font-mono">
              <button
                onClick={() => setSelectedGpuTier('flagship')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedGpuTier === 'flagship' ? 'bg-red-950 text-red-300 border border-red-800 font-bold' : 'text-neutral-400'
                }`}
              >
                RTX 4090 / 7900 XTX
              </button>
              <button
                onClick={() => setSelectedGpuTier('highend')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedGpuTier === 'highend' ? 'bg-red-950 text-red-300 border border-red-800 font-bold' : 'text-neutral-400'
                }`}
              >
                RTX 3080 / 4070 Ti
              </button>
              <button
                onClick={() => setSelectedGpuTier('midrange')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedGpuTier === 'midrange' ? 'bg-red-950 text-red-300 border border-red-800 font-bold' : 'text-neutral-400'
                }`}
              >
                RTX 3070 / RX 6800
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Repair Path */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 uppercase text-sm">
                  Servis Presisi Ruli Computer
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold">
                  Sangat Direkomendasikan
                </span>
              </div>
              <div className="text-3xl font-extrabold text-white">
                {selectedGpuTier === 'flagship' ? 'Rp 1.450.000' : selectedGpuTier === 'highend' ? 'Rp 950.000' : 'Rp 650.000'} <span className="text-xs text-neutral-400 font-normal">rata-rata biaya</span>
              </div>
              <ul className="space-y-1.5 text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Garansi Resmi Servis & Komponen hingga 90 Hari</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Waktu Pengerjaan Cepat 24 - 48 Jam</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Menghemat jutaan rupiah & mempertahankan unit kesayangan</span>
                </li>
              </ul>
            </div>

            {/* Buying New Replacement Path */}
            <div className="p-5 rounded-xl bg-red-950/20 border border-red-800/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-400 uppercase text-sm">
                  Membeli Unit Baru di Pasaran
                </span>
                <span className="px-2 py-0.5 rounded bg-red-900/60 text-red-300">
                  Biaya Sangat Tinggi
                </span>
              </div>
              <div className="text-3xl font-extrabold text-neutral-300">
                {selectedGpuTier === 'flagship' ? 'Rp 32.000.000+' : selectedGpuTier === 'highend' ? 'Rp 14.500.000+' : 'Rp 7.500.000+'}
              </div>
              <ul className="space-y-1.5 text-neutral-400">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Membayar harga penuh ritel yang mahal</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>VGA lama terbuang sia-sia padahal hanya rusak 1 komponen kecil</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Menambah limbah elektronik tanpa perlu</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

