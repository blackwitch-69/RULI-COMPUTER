import { DiagnosticItem } from '../types/repair';

export const COMMON_SYMPTOMS_LIST: DiagnosticItem[] = [
  {
    id: 'symp-no-power',
    name: 'Mati Total / PSU Proteksi Cetek (OCP Trip)',
    category: 'Power',
    description: 'Saat tombol power PC ditekan, PSU langsung bunyi cetek dan mati seketika, atau kipas VGA sama sekali tidak berputar (short 12V).',
    typicalCause: 'Korsleting jalur utama 12V PCIe / EPS, DrMOS power stage jebol, atau MOSFET high-side tembus.',
    estimatedFixTime: '24-48 Jam',
    priceRange: 'Rp 450.000 - Rp 950.000',
    severity: 'Critical'
  },
  {
    id: 'symp-code-43',
    name: 'Error Code 43 di Device Manager / Artefak Layar',
    category: 'VRAM',
    description: 'Windows menonaktifkan VGA dengan status Code 43. Tampilan grafis garis-garis pink/hijau, kotak catur, atau driver NVIDIA/AMD crash.',
    typicalCause: 'Kerusakan modul GDDR6/GDDR6X VRAM, solder ball BGA retak karena panas, atau jalur memory controller putus.',
    estimatedFixTime: '24-48 Jam',
    priceRange: 'Rp 500.000 - Rp 1.200.000',
    severity: 'High'
  },
  {
    id: 'symp-12vhpwr-melt',
    name: 'Konektor 12VHPWR / 16-Pin Meleleh / Terbakar',
    category: 'Power',
    description: 'Plastik konektor 16-pin RTX 40 meleleh, bau sangit hangus, pin ground terbakar, layar hitam mendadak saat full load gaming.',
    typicalCause: 'Resistansi kontak tinggi pada pin terminal, header terbakar, lapisan tembaga internal PCB terkarbonisasi.',
    estimatedFixTime: '48 Jam',
    priceRange: 'Rp 650.000 - Rp 1.400.000',
    severity: 'Critical'
  },
  {
    id: 'symp-hotspot-110',
    name: 'Kipas 100% Jet Engine & Suhu Hotspot >105°C',
    category: 'Thermal',
    description: 'Kipas langsung meraung kencang begitu buka game. Suhu GPU Core ~65°C namun Hotspot / Memory Junction melonjak drastis hingga 110°C.',
    typicalCause: 'Thermal paste pump-out/kering, thermal pad mengeras, vapor chamber bocor, atau tekanan bracket tidak merata.',
    estimatedFixTime: '12-24 Jam',
    priceRange: 'Rp 250.000 - Rp 550.000',
    severity: 'Moderate'
  },
  {
    id: 'symp-black-screen-driver',
    name: 'Layar Hitam (Black Screen) Saat Install Driver',
    category: 'Display',
    description: 'VGA tampil normal di BIOS dan Windows basic VGA driver, tapi langsung no display / black screen begitu driver resmi di-install.',
    typicalCause: 'Kerusakan fasa core PLL / PEX, jalur komunikasi GPU clock timing error, atau tabel BIOS EEPROM korup.',
    estimatedFixTime: '24-48 Jam',
    priceRange: 'Rp 400.000 - Rp 850.000',
    severity: 'High'
  },
  {
    id: 'symp-broken-pcie',
    name: 'Jalur Pin PCIe Patah / Retak Akibat GPU Sagging',
    category: 'Physical',
    description: 'Pin emas PCIe finger retak atau terkelupas akibat guncangan pengiriman atau beban VGA berat tanpa bracket penyangga.',
    typicalCause: 'Kerusakan fisik PCB; jalur diferensial PCIe kecepatan tinggi putus.',
    estimatedFixTime: '24-48 Jam',
    priceRange: 'Rp 450.000 - Rp 900.000',
    severity: 'High'
  },
  {
    id: 'symp-no-display-fans-max',
    name: 'Kipas Putar Kencang, Layar Tidak Tampil (No Signal)',
    category: 'Power',
    description: 'VGA dapat daya dan lampu LED nyala, kipas putar 100%, namun monitor menampilkan "No Signal" di semua port DP & HDMI.',
    typicalCause: 'Tegangan rel sekunder hilang (1.8V PLL, 0.9V PEX, 3.3V atau 5V LDO) atau chip BIOS bermasalah.',
    estimatedFixTime: '24-48 Jam',
    priceRange: 'Rp 350.000 - Rp 750.000',
    severity: 'Moderate'
  },
  {
    id: 'symp-liquid-spill',
    name: 'Korosi Akibat Bocor Water Cooling / Kena Cairan',
    category: 'Physical',
    description: 'Kebocoran custom loop water-cooling atau ketumpahan cairan yang menimbulkan kerak putih/hijau oksida pada komponen PCB.',
    typicalCause: 'Oksidasi elektrokimia di bawah bola timah BGA, jalur via korosi, dan resistor SMD nilai melar.',
    estimatedFixTime: '48-72 Jam',
    priceRange: 'Rp 550.000 - Rp 1.350.000',
    severity: 'Critical'
  }
];

export const GPU_MODELS_DATABASE = {
  NVIDIA: {
    'RTX 40 Series': [
      'RTX 4090 24GB',
      'RTX 4080 Super 16GB',
      'RTX 4080 16GB',
      'RTX 4070 Ti Super 16GB',
      'RTX 4070 Ti 12GB',
      'RTX 4070 Super 12GB',
      'RTX 4070 12GB',
      'RTX 4060 Ti 16GB/8GB',
      'RTX 4060 8GB'
    ],
    'RTX 30 Series': [
      'RTX 3090 Ti 24GB',
      'RTX 3090 24GB',
      'RTX 3080 Ti 12GB',
      'RTX 3080 12GB/10GB',
      'RTX 3070 Ti 8GB',
      'RTX 3070 8GB',
      'RTX 3060 Ti 8GB',
      'RTX 3060 12GB'
    ],
    'RTX 20 / GTX 16 Series': [
      'RTX 2080 Ti 11GB',
      'RTX 2080 Super 8GB',
      'RTX 2080 8GB',
      'RTX 2070 Super 8GB',
      'RTX 2060 Super 8GB',
      'GTX 1660 Ti / Super 6GB',
      'GTX 1080 Ti 11GB'
    ]
  },
  AMD: {
    'RX 7000 Series': [
      'Radeon RX 7900 XTX 24GB',
      'Radeon RX 7900 XT 20GB',
      'Radeon RX 7900 GRE 16GB',
      'Radeon RX 7800 XT 16GB',
      'Radeon RX 7700 XT 12GB',
      'Radeon RX 7600 XT 16GB',
      'Radeon RX 7600 8GB'
    ],
    'RX 6000 Series': [
      'Radeon RX 6950 XT 16GB',
      'Radeon RX 6900 XT 16GB',
      'Radeon RX 6800 XT 16GB',
      'Radeon RX 6800 16GB',
      'Radeon RX 6750 XT 12GB',
      'Radeon RX 6700 XT 12GB',
      'Radeon RX 6600 XT 8GB'
    ]
  },
  Intel: {
    'Arc Battlemage & Alchemist': [
      'Arc A770 16GB',
      'Arc A750 8GB',
      'Arc A580 8GB',
      'Arc B580 12GB',
      'Arc B570 10GB'
    ]
  }
};

export const MANUFACTURERS_LIST = [
  'ASUS (ROG Strix / TUF / Dual)',
  'MSI (Suprim X / Gaming X / Ventus)',
  'Gigabyte (AORUS / Gaming OC / Eagle)',
  'EVGA (FTW3 / XC3 / Classified)',
  'ZOTAC (AMP Extreme / Trinity / Twin Edge)',
  'Sapphire (Nitro+ / Pulse / Pure)',
  'PowerColor (Red Devil / Hellhound)',
  'Palit / Gainward (GameRock / Phantom)',
  'Galax / KFA2 (HOF / EX Gamer / 1-Click OC)',
  'Inno3D (iChill / Twin X2)',
  'NVIDIA Founders Edition',
  'Colorful (iGame Vulcan / Neptune / Ultra)',
  'PNY (XLR8 Gaming / Verto)',
  'XFX (Speedster Merc / QICK)',
  'ASRock (Taichi / Phantom Gaming)',
  'Manli / Lainnya / Custom'
];

