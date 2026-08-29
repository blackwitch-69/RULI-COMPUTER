import React, { useState, useEffect } from 'react';
import { 
  GPU_MODELS_DATABASE, 
  MANUFACTURERS_LIST, 
  COMMON_SYMPTOMS_LIST 
} from '../data/symptomsData';
import { BookingRequest } from '../types/repair';
import { 
  Calendar, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Package, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Printer, 
  Zap,
  Info,
  MapPin,
  Flame,
  Phone,
  Mail,
  User
} from 'lucide-react';

interface BookingWizardProps {
  prefillGpuModel?: string;
  prefillBrand?: string;
  prefillSymptom?: string;
  onBookingComplete: (newTicket: BookingRequest) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  prefillGpuModel,
  prefillBrand,
  prefillSymptom,
  onBookingComplete
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedBrand, setSelectedBrand] = useState<'NVIDIA' | 'AMD' | 'Intel'>(
    (prefillBrand as 'NVIDIA' | 'AMD' | 'Intel') || 'NVIDIA'
  );
  const [selectedSeries, setSelectedSeries] = useState<string>('RTX 40 Series');
  const [selectedModel, setSelectedModel] = useState<string>(prefillGpuModel || 'RTX 4090 24GB');
  const [customModel, setCustomModel] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('ASUS (ROG Strix / TUF / Dual)');
  const [serialNumber, setSerialNumber] = useState<string>('');

  // Step 2: Symptoms & Conditions
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    prefillSymptom ? [prefillSymptom] : ['Mati Total / PSU Proteksi Mati (Trip OCP)']
  );
  const [customDescription, setCustomDescription] = useState<string>('');
  const [hasLiquidDamage, setHasLiquidDamage] = useState<boolean>(false);
  const [hasPriorRepairAttempt, setHasPriorRepairAttempt] = useState<boolean>(false);

  // Step 3: Service Tiers & Upgrades
  const [serviceTier, setServiceTier] = useState<'standard' | 'express_48h' | 'priority_24h'>('standard');
  const [ultrasonicCleaning, setUltrasonicCleaning] = useState<boolean>(true);
  const [ptm7950Upgrade, setPtm7950Upgrade] = useState<boolean>(true);
  const [insuredShipping, setInsuredShipping] = useState<boolean>(true);

  // Step 4: Customer Contact & Delivery
  const [deliveryMethod, setDeliveryMethod] = useState<'mail-in' | 'local-dropoff'>('mail-in');
  const [dropoffDate, setDropoffDate] = useState<string>('2026-08-31');
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  // Step 5: Submitted Work Order State
  const [completedTicket, setCompletedTicket] = useState<BookingRequest | null>(null);

  // React to prefill changes
  useEffect(() => {
    if (prefillGpuModel) {
      setSelectedModel(prefillGpuModel);
      if (prefillGpuModel.includes('RTX 40')) setSelectedSeries('RTX 40 Series');
      else if (prefillGpuModel.includes('RTX 30')) setSelectedSeries('RTX 30 Series');
      else if (prefillGpuModel.includes('RX 7')) {
        setSelectedBrand('AMD');
        setSelectedSeries('RX 7000 Series');
      }
    }
    if (prefillBrand) {
      setSelectedBrand(prefillBrand as 'NVIDIA' | 'AMD' | 'Intel');
    }
    if (prefillSymptom && !selectedSymptoms.includes(prefillSymptom)) {
      setSelectedSymptoms(prev => [...prev, prefillSymptom]);
    }
  }, [prefillGpuModel, prefillBrand, prefillSymptom]);

  // Available series based on selected brand
  const availableSeries = Object.keys(GPU_MODELS_DATABASE[selectedBrand] || {});

  // Handle series switch
  const handleBrandChange = (brand: 'NVIDIA' | 'AMD' | 'Intel') => {
    setSelectedBrand(brand);
    const seriesList = Object.keys(GPU_MODELS_DATABASE[brand] || {});
    if (seriesList.length > 0) {
      setSelectedSeries(seriesList[0]);
      const models = (GPU_MODELS_DATABASE[brand] as any)[seriesList[0]] || [];
      if (models.length > 0) {
        setSelectedModel(models[0]);
      }
    }
  };

  const handleSeriesChange = (series: string) => {
    setSelectedSeries(series);
    const models = (GPU_MODELS_DATABASE[selectedBrand] as any)[series] || [];
    if (models.length > 0) {
      setSelectedModel(models[0]);
    }
  };

  const toggleSymptom = (symptomName: string) => {
    if (selectedSymptoms.includes(symptomName)) {
      if (selectedSymptoms.length > 1) {
        setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomName));
      }
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  // Dynamic Price Estimator Logic (in Rupiah)
  const calculateEstimatedCost = () => {
    let baseMin = 450000;
    let baseMax = 950000;

    // GPU Tier weighting
    if (selectedModel.includes('4090') || selectedModel.includes('7900 XTX')) {
      baseMin += 400000;
      baseMax += 850000;
    } else if (selectedModel.includes('4080') || selectedModel.includes('3090') || selectedModel.includes('7900 XT')) {
      baseMin += 250000;
      baseMax += 500000;
    }

    // Symptom weighting
    if (selectedSymptoms.some(s => s.includes('Meleleh') || s.includes('12VHPWR'))) {
      baseMin += 300000;
      baseMax += 600000;
    }
    if (selectedSymptoms.some(s => s.includes('Code 43') || s.includes('VRAM') || s.includes('Artifak'))) {
      baseMin += 250000;
      baseMax += 550000;
    }
    if (hasLiquidDamage) {
      baseMin += 200000;
      baseMax += 400000;
    }
    if (hasPriorRepairAttempt) {
      baseMin += 150000;
      baseMax += 300000;
    }

    // Service Tier
    if (serviceTier === 'express_48h') {
      baseMin += 150000;
      baseMax += 150000;
    } else if (serviceTier === 'priority_24h') {
      baseMin += 300000;
      baseMax += 300000;
    }

    // Add-ons
    if (ultrasonicCleaning) {
      baseMin += 75000;
      baseMax += 75000;
    }
    if (ptm7950Upgrade) {
      baseMin += 150000;
      baseMax += 150000;
    }
    if (insuredShipping && deliveryMethod === 'mail-in') {
      baseMin += 50000;
      baseMax += 50000;
    }

    return { min: baseMin, max: baseMax };
  };

  const { min: estMin, max: estMax } = calculateEstimatedCost();
  const formatRp = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  // Submission handler
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `RC-${randomSuffix}`;

    const newBooking: BookingRequest = {
      ticketId: newTicketId,
      createdAt: new Date().toLocaleDateString('id-ID', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: customerName || 'Pelanggan Ruli Computer',
      email: email || 'pelanggan@example.com',
      phone: phone || '0812-3456-7890',
      streetAddress: streetAddress || 'Jl. Raya Komputer No. 45',
      city: city || 'Jakarta',
      postalCode: postalCode || '12345',
      deliveryMethod,
      dropoffDate: deliveryMethod === 'local-dropoff' ? dropoffDate : undefined,
      gpuBrand: selectedBrand,
      gpuSeries: selectedSeries,
      gpuModel: selectedModel === 'Lainnya / Tidak Tercantum' && customModel ? customModel : selectedModel,
      gpuManufacturer: selectedManufacturer,
      serialNumber: serialNumber || 'Tidak dicantumkan',
      symptoms: selectedSymptoms,
      customDescription: customDescription || 'Permintaan diagnosa dan servis mikrosoldering.',
      hasLiquidDamage,
      hasPriorRepairAttempt,
      serviceTier,
      addOns: {
        ultrasonicCleaning,
        ptm7950ThermalPadUpgrade: ptm7950Upgrade,
        insuredReturnShipping: insuredShipping && deliveryMethod === 'mail-in'
      },
      estimatedCostMin: estMin,
      estimatedCostMax: estMax,
      status: 'Submitted',
      technicianNotes: 'Nota servis diterima. Menunggu unit VGA tiba di meja unboxing & scanning lab.',
      voltageLog: 'Menunggu pengujian instrumen diagnostik fisik.',
      timeline: [
        { 
          time: 'Baru saja', 
          stage: 'Nota Servis Terdaftar', 
          description: `Pendaftaran servis online berhasil. Estimasi pengerjaan: ${serviceTier === 'priority_24h' ? '24 Jam' : serviceTier === 'express_48h' ? '48 Jam' : '3-4 Hari Kerja'}.`,
          completed: true 
        },
        { 
          time: 'Menunggu', 
          stage: deliveryMethod === 'mail-in' ? 'Paket Diterima di Lab' : 'Check-in Drop-off Langsung', 
          description: 'Menunggu penerimaan paket di meja unboxing anti-statis.', 
          completed: false 
        },
        { 
          time: 'Menunggu', 
          stage: 'Triage Diagnostik', 
          description: 'Scanning thermal camera, tes error memori Linux MATS, & ukur rel voltase.', 
          completed: false 
        },
        { 
          time: 'Menunggu', 
          stage: 'Pengerjaan Mikrosoldering', 
          description: 'Rework BGA, reballing VRAM, atau pergantian DrMOS / MOSFET.', 
          completed: false 
        },
        { 
          time: 'Menunggu', 
          stage: 'Uji Stres Panas 24 Jam', 
          description: 'Pengujian beban FurMark 4K, 3DMark TimeSpy, & kestabilan termal.', 
          completed: false 
        },
        { 
          time: 'Menunggu', 
          stage: 'Siap Dikirim / Diambil', 
          description: 'Pengemasan kardus ESD + sertifikat uji QC siap kirim.', 
          completed: false 
        }
      ]
    };

    setCompletedTicket(newBooking);
    onBookingComplete(newBooking);
    setCurrentStep(5);
  };

  return (
    <section id="booking-section" className="py-16 sm:py-24 bg-neutral-950/80 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
            <Calendar className="w-3.5 h-3.5 text-red-400" />
            <span>PENDAFTARAN SERVIS & DIAGNOSA INSTAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formulir Booking <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">Servis VGA Ruli Computer</span>
          </h2>
          <p className="text-neutral-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Pilih spesifikasi VGA dan kendala Anda untuk mendapatkan estimasi biaya transparan dengan garansi No Fix No Fee.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-red-500 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {[
              { num: 1, label: 'Model VGA' },
              { num: 2, label: 'Gejala Kerusakan' },
              { num: 3, label: 'Paket Servis' },
              { num: 4, label: 'Pengiriman' },
              { num: 5, label: 'Konfirmasi' }
            ].map((step) => {
              const isCompleted = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : isCurrent
                        ? 'bg-neutral-900 border-2 border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>
                  <span className={`text-[11px] font-mono mt-1.5 hidden sm:block ${
                    isCurrent ? 'text-red-400 font-semibold' : 'text-neutral-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Wizard Card */}
        <div className="rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl shadow-black/50">
          
          {/* STEP 1: GPU SPECIFICATIONS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-red-400" />
                  <span>Langkah 1: Pilih Merek & Tipe GPU</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Tentukan model spesifik kartu grafis agar teknisi kami dapat memeriksa ketersediaan komponen & IC VRAM di lab.
                </p>
              </div>

              {/* Brand Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  1. Merek Chipset GPU
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['NVIDIA', 'AMD', 'Intel'] as const).map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      id={`select-brand-${brand.toLowerCase()}`}
                      onClick={() => handleBrandChange(brand)}
                      className={`p-3.5 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                        selectedBrand === brand
                          ? 'bg-red-950/70 border-red-500 text-red-300 shadow-md shadow-red-500/10'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Series Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  2. Generasi / Seri GPU
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableSeries.map((series) => (
                    <button
                      key={series}
                      type="button"
                      id={`select-series-${series.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => handleSeriesChange(series)}
                      className={`p-3 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer ${
                        selectedSeries === series
                          ? 'bg-red-950/70 border-red-500 text-red-300'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {series}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Dropdown & Sub-Vendor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                    3. Model Spesifik VGA
                  </label>
                  <select
                    id="select-gpu-model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-mono text-neutral-200 focus:outline-none focus:border-red-500"
                  >
                    {((GPU_MODELS_DATABASE[selectedBrand] as any)[selectedSeries] || []).map((m: string) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                    <option value="Lainnya / Tidak Tercantum">Lainnya / Tidak Tercantum</option>
                  </select>

                  {selectedModel === 'Lainnya / Tidak Tercantum' && (
                    <input
                      type="text"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      placeholder="Masukkan model VGA Anda (misal: Quadro RTX 6000)"
                      className="mt-2 w-full h-10 px-3 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-mono text-white"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                    4. Brand Manufaktur / Sub-Vendor
                  </label>
                  <select
                    id="select-gpu-manufacturer"
                    value={selectedManufacturer}
                    onChange={(e) => setSelectedManufacturer(e.target.value)}
                    className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-mono text-neutral-200 focus:outline-none focus:border-red-500"
                  >
                    {MANUFACTURERS_LIST.map((man) => (
                      <option key={man} value={man}>{man}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Serial Number / Optional Note */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  5. Nomor Seri / Serial Number (Opsional, untuk identifikasi unit)
                </label>
                <input
                  id="input-serial-number"
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Contoh: SN-4090-STRIX-982143 (Tertera pada stiker backplate)"
                  className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-end pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  id="step1-next-btn"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/25 cursor-pointer"
                >
                  <span>Lanjut ke Gejala Kerusakan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SYMPTOMS & CONDITIONS */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Langkah 2: Deskripsi Kendala & Riwayat Kerusakan</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Pilih satu atau lebih gejala kerusakan yang dialami kartu grafis Anda.
                </p>
              </div>

              {/* Common Symptoms Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMON_SYMPTOMS_LIST.map((symp) => {
                  const isSelected = selectedSymptoms.includes(symp.name);
                  return (
                    <div
                      key={symp.id}
                      id={`symptom-card-${symp.id}`}
                      onClick={() => toggleSymptom(symp.name)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isSelected
                          ? 'bg-red-950/60 border-red-500 text-white shadow-md shadow-red-500/10'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            symp.severity === 'Critical' 
                              ? 'bg-red-950 text-red-300 border border-red-800' 
                              : symp.severity === 'High' 
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}>
                            {symp.category} • {symp.severity === 'Critical' ? 'Kritis' : symp.severity === 'High' ? 'Tinggi' : 'Sedang'}
                          </span>
                          <span className="text-[11px] font-mono text-red-400">{symp.priceRange}</span>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-100">{symp.name}</h4>
                        <p className="text-[11px] text-neutral-400 mt-1 leading-snug">{symp.description}</p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-400">Estimasi Servis: {symp.estimatedFixTime}</span>
                        <span className={`font-semibold ${isSelected ? 'text-red-300' : 'text-neutral-400'}`}>
                          {isSelected ? '✓ DIPILIH' : '+ PILIH'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Description Textarea */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
                  Detail Tambahan / Kronologi Kerusakan
                </label>
                <textarea
                  id="input-custom-description"
                  rows={3}
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Contoh: VGA sedang dipakai main game lalu layar tiba-tiba macet warna pink. Pas dinyalakan lagi kipas berputar 100% kencang tapi tidak keluar gambar."
                  className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Risk Condition Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                  <input
                    id="checkbox-liquid-damage"
                    type="checkbox"
                    checked={hasLiquidDamage}
                    onChange={(e) => setHasLiquidDamage(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 bg-neutral-950 border-neutral-700 focus:ring-0"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-neutral-200 block">Riwayat Terkena Cairan / Bocor Watercooling</span>
                    <span className="text-[11px] text-neutral-400">Papan sirkuit pernah tersiram air atau coolant</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                  <input
                    id="checkbox-prior-repair"
                    type="checkbox"
                    checked={hasPriorRepairAttempt}
                    onChange={(e) => setHasPriorRepairAttempt(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 bg-neutral-950 border-neutral-700 focus:ring-0"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-neutral-200 block">Pernah Dibongkar / Bekas Servis Tempat Lain</span>
                    <span className="text-[11px] text-neutral-400">Pernah disolder ulang, di-blower, atau dipanaskan</span>
                  </div>
                </label>
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>

                <button
                  type="button"
                  id="step2-next-btn"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/25 cursor-pointer"
                >
                  <span>Lanjut ke Paket Servis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SERVICE TIER & PERFORMANCE ADD-ONS */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-400" />
                  <span>Langkah 3: Pilih Kecepatan Pengerjaan & Opsi Tambahan</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Pilih prioritas waktu pengerjaan dan opsi perawatan thermal performa tinggi.
                </p>
              </div>

              {/* Service Speed Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    tier: 'standard',
                    title: 'Antrean Standar Lab',
                    time: '3 - 5 Hari Kerja',
                    extraCost: 'Termasuk di Paket',
                    desc: 'Diagnosa menyeluruh, rework komponen, & uji kestabilan 12 jam.'
                  },
                  {
                    tier: 'express_48h',
                    title: 'Layanan Ekspres 48 Jam',
                    time: 'Pengerjaan 48 Jam',
                    extraCost: '+Rp 150.000',
                    desc: 'Langsung masuk meja diagnosa utama begitu paket unit tiba.'
                  },
                  {
                    tier: 'priority_24h',
                    title: 'Prioritas Darurat 24 Jam',
                    time: 'Pengerjaan 24 Jam',
                    extraCost: '+Rp 300.000',
                    desc: 'Dikerjakan teknisi senior lembur overnight dengan prioritas tertinggi.'
                  }
                ].map((item) => (
                  <div
                    key={item.tier}
                    id={`service-tier-${item.tier}`}
                    onClick={() => setServiceTier(item.tier as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      serviceTier === item.tier
                        ? 'bg-red-950/70 border-red-500 text-white shadow-lg shadow-red-500/15'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-xs font-mono mb-2">
                        <span className="text-red-400 font-bold">{item.time}</span>
                        <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">
                          {item.extraCost}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-100">{item.title}</h4>
                      <p className="text-[11px] text-neutral-400 mt-1.5 leading-snug">{item.desc}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-800 text-right text-xs font-mono font-bold">
                      <span className={serviceTier === item.tier ? 'text-red-300' : 'text-neutral-500'}>
                        {serviceTier === item.tier ? '✓ AKTIF' : 'PILIH'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Upgrades */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                  Rekomendasi Tambahan Perawatan Lab
                </label>

                {/* Ultrasonic Bath */}
                <div
                  id="toggle-ultrasonic"
                  onClick={() => setUltrasonicCleaning(!ultrasonicCleaning)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    ultrasonicCleaning ? 'bg-red-950/40 border-red-500/60' : 'bg-neutral-900/50 border-neutral-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={ultrasonicCleaning}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded text-red-600 bg-neutral-950 border-neutral-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-200 flex items-center gap-2">
                        <span>Pembersihan Rendam Ultrasonik Kimiawi PCB</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-red-950 border border-red-800 text-red-300">
                          Disarankan
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Menghilangkan sisa flux konduktif, kerak debu, dan residu korosi di bawah sela IC BGA.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400 whitespace-nowrap ml-4">+Rp 75.000</span>
                </div>

                {/* Honeywell PTM7950 Thermal Pad Upgrade */}
                <div
                  id="toggle-ptm7950"
                  onClick={() => setPtm7950Upgrade(!ptm7950Upgrade)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    ptm7950Upgrade ? 'bg-red-950/40 border-red-500/60' : 'bg-neutral-900/50 border-neutral-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={ptm7950Upgrade}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded text-red-600 bg-neutral-950 border-neutral-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-200 flex items-center gap-2">
                        <span>Aplikasi Honeywell PTM7950 Phase-Change + Thermal Pad High-K</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                          Turun Suhu s/d 15°C
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Material phase-change polimer industri tahan hingga 5+ tahun tanpa pump-out atau kering.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400 whitespace-nowrap ml-4">+Rp 150.000</span>
                </div>

                {/* Insured Return Shipping */}
                <div
                  id="toggle-insured-shipping"
                  onClick={() => setInsuredShipping(!insuredShipping)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    insuredShipping ? 'bg-red-950/40 border-red-500/60' : 'bg-neutral-900/50 border-neutral-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={insuredShipping}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded text-red-600 bg-neutral-950 border-neutral-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-200">
                        Asuransi Pengiriman Ekspedisi Penuh (JNE / J&T / SiCepat)
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Menjamin ganti rugi nilai penuh unit VGA dengan segel kemasan kayu dan proteksi guncangan.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400 whitespace-nowrap ml-4">+Rp 50.000</span>
                </div>
              </div>

              {/* Dynamic Live Cost Summary Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-red-500/30 font-mono text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-neutral-400">Estimasi Biaya Diagnosa & Servis:</div>
                  <div className="text-xl font-bold text-red-400">
                    {formatRp(estMin)} - {formatRp(estMax)}
                  </div>
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garansi No Fix = Rp 0 (Hanya bayar jika berhasil diperbaiki)</span>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>

                <button
                  type="button"
                  id="step3-next-btn"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/25 cursor-pointer"
                >
                  <span>Lanjut ke Kontak & Pengiriman</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FULFILLMENT & CONTACT INFO */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-red-400" />
                  <span>Langkah 4: Data Kontak & Metode Pengiriman</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Pilih kirim via paket ekspedisi ke lab kami atau antar langsung ke workshop Ruli Computer.
                </p>
              </div>

              {/* Delivery Mode Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="mode-mail-in"
                  onClick={() => setDeliveryMethod('mail-in')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryMethod === 'mail-in'
                      ? 'bg-red-950/70 border-red-500 text-white shadow-md'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs mb-1">
                    <Package className="w-4 h-4 text-red-400" />
                    <span>Kirim Paket Ekspedisi</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Kirim unit Anda via JNE/J&T/SiCepat/TIKI dengan panduan packing aman.
                  </p>
                </button>

                <button
                  type="button"
                  id="mode-local-dropoff"
                  onClick={() => setDeliveryMethod('local-dropoff')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryMethod === 'local-dropoff'
                      ? 'bg-red-950/70 border-red-500 text-white shadow-md'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs mb-1">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Antar Langsung ke Lab</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Drop-off langsung ke meja teknisi workshop Ruli Computer.
                  </p>
                </button>
              </div>

              {/* Local Drop-off Date Picker */}
              {deliveryMethod === 'local-dropoff' && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <label className="block text-xs font-mono text-red-300">
                    Rencana Tanggal Drop-Off:
                  </label>
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full h-10 px-3 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-mono text-white"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Alamat Workshop: Lab Ruli Computer, Sentra Servis Hardware Komputer. Buka Senin-Sabtu 09:00 - 20:00 WIB.
                  </p>
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-400" /> Nama Lengkap Pemilik *
                  </label>
                  <input
                    id="input-customer-name"
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Rian Anggoro"
                    className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" /> Alamat Email (Untuk Notifikasi Live) *
                  </label>
                  <input
                    id="input-customer-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: rian.anggoro@gmail.com"
                    className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" /> Nomor WhatsApp / Telepon Aktif *
                  </label>
                  <input
                    id="input-customer-phone"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812-9876-5432"
                    className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                    Alamat Lengkap (Untuk Pengiriman Kembali Unit)
                  </label>
                  <input
                    id="input-customer-address"
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Contoh: Jl. Merdeka No. 12, RT 02/05, Kebayoran Baru"
                    className="w-full h-11 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs font-mono">
                <div className="text-neutral-400 uppercase tracking-wider text-[11px] font-bold">
                  Ringkasan Booking Servis:
                </div>
                <div className="flex justify-between text-neutral-200">
                  <span>Unit VGA:</span>
                  <span className="text-red-400 font-bold">{selectedBrand} {selectedModel}</span>
                </div>
                <div className="flex justify-between text-neutral-200">
                  <span>Pilihan Layanan:</span>
                  <span>{serviceTier === 'priority_24h' ? 'Prioritas Darurat 24 Jam' : serviceTier === 'express_48h' ? 'Ekspres 48 Jam' : 'Standar 3-5 Hari Kerja'}</span>
                </div>
                <div className="flex justify-between text-neutral-200">
                  <span>Estimasi Biaya:</span>
                  <span className="text-emerald-400 font-bold">{formatRp(estMin)} - {formatRp(estMax)}</span>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>

                <button
                  type="submit"
                  id="submit-repair-booking-btn"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/25 hover:shadow-red-600/40 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi & Buat Nota Servis</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION & PRINTABLE WORK ORDER */}
          {currentStep === 5 && completedTicket && (
            <div className="space-y-6 animate-in fade-in duration-400">
              
              {/* Success Banner */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/60 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Nota Servis Berhasil Dibuat!</h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Tiket intake VGA Anda telah masuk ke sistem antrean lab Ruli Computer. Simpan Nomor Tiket Anda di bawah untuk pelacakan live.
                </p>
                <div className="inline-block mt-2 px-4 py-2 rounded-xl bg-neutral-900 border border-red-500/50 font-mono text-xl font-extrabold text-red-400 shadow-inner">
                  NOMOR TIKET: {completedTicket.ticketId}
                </div>
              </div>

              {/* Printable Packing & Shipping Sheet Box */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-400" />
                    <span className="font-bold text-white uppercase">Nota Servis Resmi & Lembar Resi Lab</span>
                  </div>
                  <button
                    id="print-work-order-btn"
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Nota / Slip Pengiriman</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-300">
                  <div>
                    <div className="text-neutral-500">Pemilik Unit:</div>
                    <div className="font-bold text-white">{completedTicket.customerName}</div>
                    <div className="text-[11px] text-neutral-400">{completedTicket.email} • {completedTicket.phone}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Unit Hardware:</div>
                    <div className="font-bold text-red-400">{completedTicket.gpuModel}</div>
                    <div className="text-[11px] text-neutral-400">{completedTicket.gpuManufacturer} (S/N: {completedTicket.serialNumber})</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Metode Pengiriman:</div>
                    <div className="font-semibold text-neutral-200 uppercase">{completedTicket.deliveryMethod === 'mail-in' ? 'Paket Ekspedisi' : 'Drop-off Langsung'}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Rentang Estimasi Biaya:</div>
                    <div className="font-bold text-emerald-400">{formatRp(completedTicket.estimatedCostMin)} - {formatRp(completedTicket.estimatedCostMax)}</div>
                  </div>
                </div>

                {/* Shipping / Drop-off Instructions */}
                <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                  <div className="font-bold text-red-300 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-red-400" /> Petunjuk Pengemasan & Pengiriman Paket Aman:
                  </div>
                  <ul className="space-y-1 text-neutral-300 text-[11px]">
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">1.</span> Masukkan VGA ke dalam <strong>kantong plastik anti-statis (ESD bag)</strong> jika tersedia.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">2.</span> Lapisi unit dengan <strong>bubble wrap tebal</strong> di seluruh sisi.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">3.</span> Tuliskan Nomor Tiket ini (<strong>{completedTicket.ticketId}</strong>) pada secarik kertas di dalam kardus.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">4.</span> Kirim ke alamat workshop: <strong>Lab Ruli Computer (Penerimaan Servis VGA), Sentra Servis Hardware Komputer, Indonesia / Hubungi WhatsApp untuk koordinasi resi</strong>.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  id="book-another-btn"
                  onClick={() => {
                    setCurrentStep(1);
                    setCompletedTicket(null);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                >
                  Daftarkan VGA Lain
                </button>

                <button
                  type="button"
                  id="track-this-ticket-btn"
                  onClick={() => {
                    // Trigger tracking in parent
                    onBookingComplete(completedTicket);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs font-mono shadow-lg shadow-red-600/20 cursor-pointer"
                >
                  <span>Lacak Status Tiket Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

