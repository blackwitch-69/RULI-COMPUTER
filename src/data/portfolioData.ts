import { RepairProject } from '../types/repair';

// Local asset paths
import microsolderImg from '../assets/images/gpu_microsoldering_repair_1788038002140.jpg';
import thermalImg from '../assets/images/gpu_thermal_inspection_1788038015677.jpg';
import benchImg from '../assets/images/gpu_repair_bench_1788038028087.jpg';

export const PORTFOLIO_PROJECTS: RepairProject[] = [
  {
    id: 'case-rtx4090-strix',
    title: 'Rekonstruksi Jalur Tembaga & Ganti Header 12VHPWR Hangus',
    gpuModel: 'GeForce RTX 4090 ROG Strix 24GB OC',
    brand: 'NVIDIA',
    manufacturer: 'ASUS',
    issueCategory: 'Connector Melt',
    difficulty: 'Master L3 Micro-soldering',
    turnaroundTime: '48 Jam',
    costSaved: 'Hemat Rp 26.500.000 vs Beli Baru',
    featured: true,
    symptoms: [
      'Blackout mendadak saat benchmark Cyberpunk 2077 4K Path Tracing',
      'Bau gosong plastik menyengat dari header soket 16-pin',
      'VGA gagal inisialisasi tegangan 12V; motherboard stuck lampu LED VGA debug'
    ],
    diagnosticSteps: [
      'Pemeriksaan mikroskop stereo menemukan pin 1, 2 dan ground 12VHPWR meleleh menyatu',
      'Desoldering soket lama dengan stasiun hot air Quick 861DW pada suhu 420°C dengan pelindung fluks',
      'Pengukuran multimeter resolusi tinggi mendeteksi lapisan tembaga ground terkelupas dan short 0.02Ω ke ground Vcore'
    ],
    workDone: [
      'Ekskavasi lapisan fiberglass PCB yang terkarbonisasi untuk menghilangkan residu arang pemicu korsleting',
      'Rekonstruksi jalur tembaga internal 4-layer 2oz menggunakan shim tembaga 0.5mm insulated',
      'Pelapisan ulang UV solder mask industri tahan panas transisi kaca >180°C',
      'Pemasangan header konektor OEM Amphenol Gen 5.0 12V-2x6 revisi anti-meleleh',
      'Pembersihan kimiawi dalam ultrasonic cleaner Branson untuk melarutkan sisa fluks'
    ],
    toolsUsed: [
      'Solder JBC C245 + Mata Chisel 3.2D',
      'Quick 861DW 1000W Hot Air Rework Station',
      'Mikroskop Stereo AmScope SM-4TP',
      'Kamera Termal Flir E8-XT High-Res',
      'Mechanic UV Mask & Lampu Curing 395nm'
    ],
    voltageRailLogs: [
      { rail: '12V 16-Pin Input', standard: '12.10V', measuredBefore: '0.14V (Short Ground)', measuredAfter: '12.08V', status: 'Fixed' },
      { rail: 'NVVDD (Core)', standard: '0.85V-1.05V', measuredBefore: '0.00V', measuredAfter: '0.98V', status: 'Fixed' },
      { rail: 'FBVDD (VRAM)', standard: '1.35V', measuredBefore: '0.00V', measuredAfter: '1.35V', status: 'Fixed' },
      { rail: '1.8V PLL Rail', standard: '1.80V', measuredBefore: '0.00V', measuredAfter: '1.81V', status: 'Fixed' }
    ],
    thermalBefore: 104,
    thermalAfter: 58,
    hotspotBefore: 118,
    hotspotAfter: 67,
    benchmarks: {
      furmarkFps: 298,
      stressDuration: '24 Jam Loop FurMark 4K Lolos Uji',
      timeSpyScore: 36420
    },
    summary: 'Menyelamatkan RTX 4090 dari kerusakan total. Pembuangan arang PCB, restorasi bus tembaga internal, dan pemasangan soket baru 12V-2x6 mengembalikan kestabilan performa 100% seperti baru.',
    beforeImage: microsolderImg,
    afterImage: benchImg,
    microscopeImageUrl: microsolderImg,
    thermalImageUrl: thermalImg
  },
  {
    id: 'case-rtx3080-vram',
    title: 'Bit Error MATS Bank B0 & Penggantian Chip VRAM Micron GDDR6X',
    gpuModel: 'GeForce RTX 3080 Gaming X Trio 10GB',
    brand: 'NVIDIA',
    manufacturer: 'MSI',
    issueCategory: 'VRAM Replacement',
    difficulty: 'Advanced',
    turnaroundTime: '24 Jam',
    costSaved: 'Hemat Rp 8.500.000 vs Beli Baru',
    featured: true,
    symptoms: [
      'Artefak garis-garis ungu vertikal pada layar monitor saat booting BIOS dan Windows',
      'Device Manager Windows memberi peringatan "Error Code 43"',
      'Layar biru BSOD file nvlddmkm.sys langsung saat driver NVIDIA di-install'
    ],
    diagnosticSteps: [
      'Booting sistem diagnostik memori Linux NVIDIA MATS/MODS via riser PCIe tester',
      'Laporan MODS MATS v455 mendeteksi bit error masif pada Channel B, Bank B0 (Bits 32..63)',
      'Pengujian hambatan mengonfirmasi pasokan 1.35V FBVDD normal tanpa short, membuktikan silikon chip memori rusak internal'
    ],
    workDone: [
      'Pre-heating PCB dengan Infrared Aoyue pada suhu 150°C untuk mencegah PCB melengkung (warping)',
      'Pengangkatan modul GDDR6X Micron D9ZBD yang rusak dengan hot air presisi',
      'Pembersihan pad BGA PCB menggunakan Goot Wick tembaga & fluks Amtech NC-559-V2-TF',
      'Reballing chip Micron pengganti dengan timah Sn63Pb37 0.45mm agar lebih tahan siklus termal',
      'Pemasangan chip baru dengan profil pemanasan presisi di bawah mikroskop',
      'Uji ulang MATS: 0 error pada 100% alamat memory address'
    ],
    toolsUsed: [
      'Jig Reballing BGA & Stensil 0.45mm',
      'Aoyue 853A+ Quartz Infrared Preheater',
      'Software NVIDIA MODS / MATS Memory Testing',
      'Osiloskopi Digital Rigol DS1054Z',
      'Thermal Pad Honeywell PTM7950'
    ],
    matsLog: `MATS version 455.128. Testing GA102 with 10240 MB of memory.
Errors found in Bank B0:
  Channel B0 [Bits 32..63] : Read 0x00000000, Expected 0xAAAAAAAA (FAIL)
  Error Count: 142,880 bit miscompares
------------------------------------------------------
HASIL SETELAH REWORK:
  Channel A0: PASSED (0 error)
  Channel A1: PASSED (0 error)
  Channel B0: PASSED (0 error - CHIP BERHASIL DIGANTI)
  Channel B1: PASSED (0 error)
  Channel C0: PASSED (0 error)
  Channel C1: PASSED (0 error)
  Channel D0: PASSED (0 error)
  Channel D1: PASSED (0 error)
  Channel E0: PASSED (0 error)
  Channel E1: PASSED (0 error)
MATS RESULT: ALL CHANNELS PASS [100% NORMAL]`,
    voltageRailLogs: [
      { rail: 'FBVDD (VRAM)', standard: '1.35V', measuredBefore: '1.34V', measuredAfter: '1.35V', status: 'Normal' },
      { rail: 'NVVDD (Core)', standard: '0.88V', measuredBefore: '0.88V', measuredAfter: '0.89V', status: 'Normal' },
      { rail: 'PEX (PCIe)', standard: '1.00V', measuredBefore: '1.01V', measuredAfter: '1.00V', status: 'Normal' }
    ],
    thermalBefore: 96,
    thermalAfter: 63,
    hotspotBefore: 108,
    hotspotAfter: 72,
    benchmarks: {
      furmarkFps: 184,
      stressDuration: '12 Jam FurMark + Heaven 4.0 Loop Lolos',
      timeSpyScore: 17890
    },
    summary: 'Penggantian modul GDDR6X Micron dengan teknik reball timah leaded berkualitas tinggi. Kartu berhasil melewati stress test 12 jam tanpa artefak grafis sama sekali.',
    beforeImage: thermalImg,
    afterImage: microsolderImg,
    microscopeImageUrl: microsolderImg,
    thermalImageUrl: thermalImg
  },
  {
    id: 'case-rx7900xtx-vapor',
    title: 'Mengatasi Suhu Hotspot 110°C & Overhaul Thermal Vapor Chamber',
    gpuModel: 'Radeon RX 7900 XTX Red Devil 24GB',
    brand: 'AMD',
    manufacturer: 'PowerColor',
    issueCategory: 'Vapor Chamber / Thermal',
    difficulty: 'Standard',
    turnaroundTime: '24 Jam',
    costSaved: 'Hemat Rp 7.000.000 vs Beli Baru',
    featured: true,
    symptoms: [
      'Kipas langsung meraung 100% 3500 RPM seperti mesin jet dalam 10 detik setelah game dimulai',
      'Selisih suhu delta ekstrem hingga 48°C antara GPU Core (62°C) dan Hotspot Junction (110°C)',
      'Clock speed turun drastis (throttling) dari 2650MHz ke 1420MHz sehingga game patah-patah parah'
    ],
    diagnosticSteps: [
      'Pemeriksaan kamera inframerah mendeteksi vapor chamber kering di bagian tengah dan tekanan mounting Navi 31 kurang rapat',
      'Thermal paste bawaan pabrik mengalami pump-out dan kering total, meninggalkan silikon telanjang tanpa pendinginan',
      'Thermal pad VRAM bawaan terdegradasi dan mengeluarkan minyak silikon ke kapasitor SMD sekitar'
    ],
    workDone: [
      'Pembersihan ultrasonic degreasing fin heatsink dan sisa minyak pada substrat PCB',
      'Pemasangan polimer fase-ubah Honeywell PTM7950 0.2mm khusus di atas die core Navi 31',
      'Pemasangan thermal pad performa tinggi Gelid GP-Ultimate 15W/mK pada seluruh 12 modul GDDR6 dan VRM',
      'Pengencangan bracket X-spring custom menggunakan obeng torsi presisi terkalibrasi 0.6Nm'
    ],
    toolsUsed: [
      'Honeywell PTM7950 Phase Change Matrix',
      'Wiha Calibrated Micro Torque Screwdriver',
      'Pembersih Ultrasonic Branson',
      'Gelid GP-Ultimate 15W/mK Thermal Pad',
      'Kamera Diagnostik Termal Flir'
    ],
    thermalBefore: 72,
    thermalAfter: 54,
    hotspotBefore: 112,
    hotspotAfter: 71,
    benchmarks: {
      furmarkFps: 242,
      stressDuration: '48 Jam Render Stabil Non-Stop',
      timeSpyScore: 29850
    },
    summary: 'Berhasil melenyapkan thermal delta 48°C. Suhu Hotspot turun drastis dari 112°C menjadi 71°C pada konsumsi daya penuh 400W TBP, mengembalikan boost clock maksimal dengan kipas yang sangat hening.',
    beforeImage: benchImg,
    afterImage: thermalImg,
    microscopeImageUrl: microsolderImg,
    thermalImageUrl: thermalImg
  },
  {
    id: 'case-rtx3090-drmos',
    title: 'Perbaikan Korsleting Jalur Vcore & Penggantian Power Stage DrMOS',
    gpuModel: 'GeForce RTX 3090 FTW3 Ultra 24GB',
    brand: 'NVIDIA',
    manufacturer: 'EVGA',
    issueCategory: 'Power Rail Short',
    difficulty: 'Master L3 Micro-soldering',
    turnaroundTime: '48 Jam',
    costSaved: 'Hemat Rp 14.000.000 vs Beli Baru',
    featured: false,
    symptoms: [
      'Power supply langsung proteksi trip OCP (bunyi cetek) saat komputer dinyalakan',
      'Komputer tidak mau menyala sama sekali selama VGA masih terpasang di PCIe slot',
      'Pengecekan resistansi pin 12V 8-pin menunjukkan angka short total 0.00Ω ke ground'
    ],
    diagnosticSteps: [
      'Injeksi tegangan rendah 1.0V @ 3.0A menggunakan DC power supply lab presisi ke jalur 12V yang short',
      'Kamera termal langsung mendeteksi IC DrMOS Vishay SiC654A pada fasa 6 menyala merah membara 120°C',
      'MOSFET high-side tembus langsung menghubungkan jalur 12V ke rel inti GA102 yang sensitif'
    ],
    workDone: [
      'Pelepasan IC DrMOS Vishay SiC654A yang terbakar di bawah mikroskop stereo',
      'Pengukuran hambatan die GA102 core; terbaca 0.28Ω sehat saat dingin (silikon GPU Core selamat)',
      'Penggantian kapasitor driver penyaring dan dioda bootstrap yang rusak',
      'Penyolderan IC baru OEM Vishay SiC654A DrMOS dengan paduan timah perak kualitas tinggi',
      'Pengujian sinyal PWM dari IC controller UPI uP9511R dengan osiloskop; gelombang kotak 350kHz bersih'
    ],
    toolsUsed: [
      'Osiloskop Rigol DS1054Z 4-Channel 100MHz',
      'DC Bench Power Supply Korad 30V 5A',
      'Kamera Inframerah Flir',
      'Pinset Solder JBC Nano'
    ],
    voltageRailLogs: [
      { rail: '12V Main 8-Pin Input', standard: '12.00V', measuredBefore: '0.00V (0.00Ω Short)', measuredAfter: '12.12V', status: 'Fixed' },
      { rail: 'NVVDD Fasa 6', standard: '0.92V', measuredBefore: '0.00V', measuredAfter: '0.92V (Gelombang Normal)', status: 'Fixed' },
      { rail: '1.8V Logic Rail', standard: '1.80V', measuredBefore: '0.00V', measuredAfter: '1.80V', status: 'Fixed' }
    ],
    thermalBefore: 88,
    thermalAfter: 61,
    hotspotBefore: 102,
    hotspotAfter: 69,
    benchmarks: {
      furmarkFps: 215,
      stressDuration: '18 Jam Stress Test Lolos Sempurna',
      timeSpyScore: 19800
    },
    summary: 'Mengisolasi DrMOS yang korslet dan menyelamatkan die GPU Core. Semua fasa PWM sinkron kembali dan VGA mampu menyalurkan daya penuh 450W dengan stabil.',
    beforeImage: microsolderImg,
    afterImage: benchImg,
    microscopeImageUrl: microsolderImg,
    thermalImageUrl: thermalImg
  },
  {
    id: 'case-rtx3070-pcie',
    title: 'Penyambungan Jalur Emas PCIe Patah & Restorasi Rel 3.3V',
    gpuModel: 'GeForce RTX 3070 AORUS Master 8GB',
    brand: 'NVIDIA',
    manufacturer: 'Gigabyte',
    issueCategory: 'Power Rail Short',
    difficulty: 'Advanced',
    turnaroundTime: '24 Jam',
    costSaved: 'Hemat Rp 5.500.000 vs Beli Baru',
    featured: false,
    symptoms: [
      'VGA rusak fisik saat pengiriman paket tanpa bracket pengaman',
      'Pin emas PCIe 1-4 patah retak di dekat kuncian slot motherboard',
      'Motherboard tidak mendeteksi keberadaan kartu grafis; kipas tidak berputar'
    ],
    diagnosticSteps: [
      'Pemeriksaan mikroskop mendeteksi 4 jalur sinyal diferensial berkecepatan tinggi terputus dan pin 3.3V aux koyak',
      'Uji kontinuitas menunjukkan sirkuit terbuka menuju IC PCIe clock generator'
    ],
    workDone: [
      'Pengikisan lapisan pelindung conformal coating untuk membuka jalur tembaga sehat',
      'Micro-soldering kawat tembaga enamel 0.1mm di bawah mikroskop stereo perbesaran 40x',
      'Pencetakan resin fiberglass epoxy untuk merekonstruksi tab penahan PCB yang patah',
      'Pelapisan ulang permukaan pin kontak dengan tembaga konduktif lapis emas nikel keras',
      'Pengujian link speed penuh PCIe 4.0 x16 di GPU-Z tanpa penurunan bandwidth'
    ],
    toolsUsed: [
      'Mikroskop Stereo AmScope SM-4TP (Perbesaran 40x)',
      'Kawat Magnet Enamel 0.1mm',
      'Pengelas Plastik UV Bondic',
      'GPU-Z PCIe Lane Analyzer'
    ],
    thermalBefore: 70,
    thermalAfter: 60,
    hotspotBefore: 85,
    hotspotAfter: 71,
    benchmarks: {
      furmarkFps: 152,
      stressDuration: '8 Jam Uji PCIe 4.0 x16 Stabil',
      timeSpyScore: 13950
    },
    summary: 'Rekonstruksi fisik presisi tinggi pada konektor PCIe. Memulihkan kecepatan penuh Gen 4.0 x16 tanpa harus mengganti board secara keseluruhan.',
    beforeImage: microsolderImg,
    afterImage: benchImg,
    microscopeImageUrl: microsolderImg,
    thermalImageUrl: thermalImg
  },
  {
    id: 'case-rx6800xt-bios',
    title: 'Pemulihan Chip Dual BIOS SPI Flash Korup & Brick UEFI',
    gpuModel: 'Radeon RX 6800 XT Nitro+ 16GB',
    brand: 'AMD',
    manufacturer: 'Sapphire',
    issueCategory: 'BIOS / Firmware Recovery',
    difficulty: 'Standard',
    turnaroundTime: '12 Jam',
    costSaved: 'Hemat Rp 6.000.000 vs Beli Baru',
    featured: false,
    symptoms: [
      'VGA mati (brick) setelah gagal update flash BIOS custom mining yang terputus di tengah jalan',
      'Layar gelap tanpa tampilan di posisi switch BIOS Silent maupun Performance',
      'Kipas berputar 100% seketika tanpa menampilkan gambar'
    ],
    diagnosticSteps: [
      'Pemasangan clip tester SOIC-8 ke IC SPI flash Winbond 25Q128FWSG',
      'Perbandingan hex dump dengan ROM original Sapphire VBIOS menunjukkan checksum rusak dan bagian EFI GOP driver hilang'
    ],
    workDone: [
      'Pelepasan kedua IC SOIC-8 dual-BIOS untuk memastikan isolasi tegangan flashing bersih',
      'Pemrograman ulang file ROM resmi Sapphire Nitro+ Performance & Silent via programmer eksternal CH341A',
      'Verifikasi hash SHA256 integritas 256-bit sebelum chip disolder kembali ke papan PCB',
      'Pengujian multi-monitor DisplayPort dan HDMI 2.1 dengan fitur UEFI Secure Boot'
    ],
    toolsUsed: [
      'Programmer USB SPI CH341A High-Speed',
      'Software AsProgrammer Flash Suite',
      'Stasiun Solder Uap Panas SMD',
      'Penganalisis Sinyal DisplayPort 1.4'
    ],
    thermalBefore: 68,
    thermalAfter: 59,
    hotspotBefore: 82,
    hotspotAfter: 73,
    benchmarks: {
      furmarkFps: 178,
      stressDuration: '6 Jam Siklus Benchmark Lolos',
      timeSpyScore: 18200
    },
    summary: 'Memulihkan firmware dual-BIOS yang rusak total. Mengembalikan driver UEFI GOP pabrikan dan memvalidasi output multi-display dengan lancar.',
    beforeImage: benchImg,
    afterImage: thermalImg,
    microscopeImageUrl: microsolderImg,
    thermalImageUrl: thermalImg
  }
];

export const LAB_EQUIPMENT_DATA = [
  {
    name: 'JBC CD-2BQF Micro-Soldering Station',
    category: 'Micro-Soldering',
    specs: 'Daya 130W puncak, pemanasan 2 detik ke 350°C, mata solder ultra-halus mikro & chisel',
    description: 'Respon panas kilat untuk menyolder bidang ground tebal pada PCB VGA 14-layer tanpa merusak jalur halus di sekitarnya.',
    badge: 'Standar IPC-A-610'
  },
  {
    name: 'Quick 861DW Hot Air Rework Station',
    category: 'Hot Air BGA',
    specs: 'Daya 1000W, hembusan pusaran 120 L/menit, profil suhu digital terkalibrasi',
    description: 'Pengangkatan dan pemasangan paket IC memori GDDR6/GDDR6X dan soket 16-pin 12VHPWR secara mulus dan aman.',
    badge: 'BGA Certified'
  },
  {
    name: 'Kamera Inframerah Flir E8-XT High-Res',
    category: 'Thermal Diagnostics',
    specs: 'Resolusi IR 320x240, peningkatan citra MSX, rentang suhu -20°C hingga 550°C',
    description: 'Deteksi instan korsleting mikro, titik resistansi tinggi, dan fasa DrMOS yang overheat dalam hitungan detik.',
    badge: 'Precision IR'
  },
  {
    name: 'Mikroskop Trinokular AmScope SM-4TP',
    category: 'Optical Inspection',
    specs: 'Zoom kontinu 7x hingga 45x, boom stand double-arm, kamera sensor Sony 4K HDMI feed',
    description: 'Memungkinkan jumper micro-trace 0.1mm, restorasi pad yang koyak, dan inspeksi bola timah BGA yang retak.',
    badge: '4K Micro-View'
  },
  {
    name: 'Osiloskop Digital Rigol DS1054Z 4-Channel',
    category: 'Signal Analysis',
    specs: 'Sampling real-time 1GSa/s, memori depth 24Mpts, analisis ripple gelombang PWM',
    description: 'Menganalisa kestabilan sinyal switching PWM VRM, PCIe clock timing jitter, dan jalur bus data I2C/SMBus.',
    badge: 'Precision Scope'
  },
  {
    name: 'Branson Industrial Ultrasonic Cleaner',
    category: 'Chemical Bath',
    specs: 'Kavitasi gelombang 40kHz, pemanas tangki otomatis, cairan degreaser khusus elektronik',
    description: 'Membersihkan residu fluks korosif, debu tambang mining yang mengendap, dan kerak cairan dari kolong chip BGA.',
    badge: 'Cleanroom Grade'
  }
];

export const INITIAL_DEMO_TRACKING_TICKETS: Record<string, import('../types/repair').BookingRequest> = {
  'RC-8402': {
    ticketId: 'RC-8402',
    createdAt: '27 Agu 2026, 10:15 WIB',
    customerName: 'Budi Santoso',
    email: 'budi.santoso@studioanimasi.id',
    phone: '+62 812-3456-7890',
    deliveryMethod: 'mail-in',
    gpuBrand: 'NVIDIA',
    gpuSeries: 'RTX 40 Series',
    gpuModel: 'RTX 4090 Founders Edition 24GB',
    gpuManufacturer: 'NVIDIA',
    serialNumber: 'NV-4090-FE-89218',
    symptoms: ['Konektor 12VHPWR terbakar meleleh', 'Layar hitam saat full load', 'Bau sangit hangus'],
    customDescription: 'VGA mati mendadak di tengah proses rendering Blender 4K. Soket power 16-pin bau gosong dan plastik agak meleleh.',
    hasLiquidDamage: false,
    hasPriorRepairAttempt: false,
    serviceTier: 'priority_24h',
    addOns: {
      ultrasonicCleaning: true,
      ptm7950ThermalPadUpgrade: true,
      insuredReturnShipping: true
    },
    estimatedCostMin: 750000,
    estimatedCostMax: 1450000,
    status: '24h Stress Bench',
    technicianNotes: 'Soket 16-pin berhasil diganti dengan header 12V-2x6 revisi baru. Jalur tembaga internal sudah di-jumper. Sedang diuji FurMark 4K jam ke-18 dari 24 jam. Suhu Core 56°C, Hotspot 64°C.',
    voltageLog: '12V Rail: 12.08V | NVVDD: 0.98V | FBVDD: 1.35V | Semua rel normal sesuai spesifikasi pabrik',
    trackingNumber: 'JNE-CGK-892019482',
    timeline: [
      { time: '27 Agu, 10:15 WIB', stage: 'Work Order Dibuat', description: 'Tiket servis darurat prioritas 24 jam terdaftar online.', completed: true },
      { time: '28 Agu, 09:30 WIB', stage: 'Paket Diterima', description: 'Paket dibuka di ruang unboxing anti-statis lab Ruli Computer.', completed: true },
      { time: '28 Agu, 11:00 WIB', stage: 'Diagnostik Triage', description: 'Kamera termal mengisolasi kerusakan konektor 12V yang hangus.', completed: true },
      { time: '28 Agu, 14:45 WIB', stage: 'Micro-soldering', description: 'Penyolderan header 12V-2x6 dan rekonstruksi jalur tembaga selesai.', completed: true },
      { time: '29 Agu, 08:00 WIB', stage: '24h Stress Bench', description: 'Uji kestabilan FurMark 4K + 3DMark TimeSpy (Jam 18/24).', completed: true },
      { time: '29 Agu, 17:00 WIB', stage: 'Siap Kirim / Ambil', description: 'Penerbitan sertifikat QA lolos uji & packing kardus berlapis bubble tebal.', completed: false }
    ]
  },
  'RC-7719': {
    ticketId: 'RC-7719',
    createdAt: '28 Agu 2026, 14:30 WIB',
    customerName: 'Reza Pratama',
    email: 'reza.gamedev@gmail.com',
    phone: '+62 813-8877-2211',
    deliveryMethod: 'local-dropoff',
    gpuBrand: 'NVIDIA',
    gpuSeries: 'RTX 30 Series',
    gpuModel: 'RTX 3080 Ti SUPRIM X 12GB',
    gpuManufacturer: 'MSI',
    serialNumber: 'MSI-3080TI-77341',
    symptoms: ['Artefak garis / kotak catur', 'Error Code 43 di Device Manager', 'Crash saat buka game'],
    customDescription: 'Muncul artefak kotak catur warna pink tepat saat proyek Unreal Engine 5 dibuka.',
    hasLiquidDamage: false,
    hasPriorRepairAttempt: false,
    serviceTier: 'express_48h',
    addOns: {
      ultrasonicCleaning: true,
      ptm7950ThermalPadUpgrade: false,
      insuredReturnShipping: false
    },
    estimatedCostMin: 650000,
    estimatedCostMax: 1150000,
    status: 'Micro-soldering',
    technicianNotes: 'Diagnostik MATS mengidentifikasi GDDR6X Bank A1 rusak. Chip lama sudah diangkat; chip Micron baru sedang di-reball dengan timah berleaded.',
    voltageLog: 'FBVDD: 1.34V | Bit error MATS terlokalisasi di Bank A1',
    timeline: [
      { time: '28 Agu, 14:30 WIB', stage: 'Work Order Dibuat', description: 'Pendaftaran servis Express 48 Jam via website.', completed: true },
      { time: '29 Agu, 10:00 WIB', stage: 'VGA Diterima di Lab', description: 'VGA diserahkan langsung di meja resepsionis lab Ruli Computer.', completed: true },
      { time: '29 Agu, 11:30 WIB', stage: 'Diagnostik Triage', description: 'Pemindaian memori MATS menemukan modul BGA rusak di Bank A1.', completed: true },
      { time: '29 Agu, 13:15 WIB', stage: 'Micro-soldering', description: 'Pengerjaan BGA rework sedang berlangsung di meja servis #2.', completed: true },
      { time: 'Menunggu', stage: '24h Stress Bench', description: 'Verifikasi MATS 0-error + burn-in FurMark.', completed: false },
      { time: 'Menunggu', stage: 'Siap Kirim / Ambil', description: 'Siap diambil langsung oleh pemilik.', completed: false }
    ]
  },
  'RC-9104': {
    ticketId: 'RC-9104',
    createdAt: '29 Agu 2026, 08:45 WIB',
    customerName: 'Hendra Wijaya',
    email: 'hendra.esports@yahoo.com',
    phone: '+62 856-9102-3344',
    deliveryMethod: 'mail-in',
    gpuBrand: 'AMD',
    gpuSeries: 'RX 7000 Series',
    gpuModel: 'Radeon RX 7900 XTX Nitro+ 24GB',
    gpuManufacturer: 'Sapphire',
    serialNumber: 'SPH-7900XTX-9012',
    symptoms: ['Kipas meraung 100%', 'Suhu Hotspot tembus >105°C', 'Komputer macet / BSOD'],
    customDescription: 'Hotspot melonjak ke 110°C seketika saat main game berat. Diduga pasta kering atau vapor chamber.',
    hasLiquidDamage: false,
    hasPriorRepairAttempt: false,
    serviceTier: 'standard',
    addOns: {
      ultrasonicCleaning: true,
      ptm7950ThermalPadUpgrade: true,
      insuredReturnShipping: true
    },
    estimatedCostMin: 350000,
    estimatedCostMax: 650000,
    status: 'Diagnostic Triage',
    technicianNotes: 'Kamera termal mengonfirmasi selisih suhu 46°C core-to-junction. Sedang dipersiapkan pencucian ultrasonic dan pemasangan Honeywell PTM7950.',
    voltageLog: 'Semua rel tegangan normal. Masalah murni akibat degradasi thermal interface.',
    timeline: [
      { time: '29 Agu, 08:45 WIB', stage: 'Work Order Dibuat', description: 'Pendaftaran paket servis thermal overhaul standar.', completed: true },
      { time: '29 Agu, 11:00 WIB', stage: 'Paket Diterima', description: 'Tiba via kurir SiCepat Ekspres.', completed: true },
      { time: '29 Agu, 13:30 WIB', stage: 'Diagnostik Triage', description: 'Inspeksi kamera termal & analisis tekanan mounting heatsink.', completed: true },
      { time: 'Menunggu', stage: 'Micro-soldering', description: 'Tidak diperlukan (Penggantian thermal pad & pasta PTM7950).', completed: false },
      { time: 'Menunggu', stage: '24h Stress Bench', description: 'Verifikasi penurunan suhu delta hotspot.', completed: false },
      { time: 'Menunggu', stage: 'Siap Kirim / Ambil', description: 'Pengiriman kembali bergaransi ke alamat pelanggan.', completed: false }
    ]
  }
};

