export interface RepairProject {
  id: string;
  title: string;
  gpuModel: string;
  brand: 'NVIDIA' | 'AMD' | 'Intel';
  manufacturer: string;
  issueCategory: 'VRAM Replacement' | 'Power Rail Short' | 'Connector Melt' | 'Core Reballing' | 'Vapor Chamber / Thermal' | 'BIOS / Firmware Recovery';
  difficulty: 'Standard' | 'Advanced' | 'Master L3 Micro-soldering';
  turnaroundTime: string;
  costSaved: string;
  symptoms: string[];
  diagnosticSteps: string[];
  workDone: string[];
  toolsUsed: string[];
  matsLog?: string;
  voltageRailLogs?: { rail: string; standard: string; measuredBefore: string; measuredAfter: string; status: 'Fixed' | 'Normal' }[];
  thermalBefore: number;
  thermalAfter: number;
  hotspotBefore: number;
  hotspotAfter: number;
  benchmarks: {
    furmarkFps: number;
    stressDuration: string;
    timeSpyScore: number;
  };
  summary: string;
  beforeImage: string;
  afterImage: string;
  microscopeImageUrl?: string;
  thermalImageUrl?: string;
  featured?: boolean;
}

export interface BookingRequest {
  ticketId: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  deliveryMethod: 'mail-in' | 'local-dropoff';
  dropoffDate?: string;
  gpuBrand: string;
  gpuSeries: string;
  gpuModel: string;
  gpuManufacturer: string;
  serialNumber?: string;
  symptoms: string[];
  customDescription: string;
  hasLiquidDamage: boolean;
  hasPriorRepairAttempt: boolean;
  serviceTier: 'standard' | 'express_48h' | 'priority_24h';
  addOns: {
    ultrasonicCleaning: boolean;
    ptm7950ThermalPadUpgrade: boolean;
    insuredReturnShipping: boolean;
  };
  estimatedCostMin: number;
  estimatedCostMax: number;
  status: 'Submitted' | 'Package Received' | 'Ultrasonic Wash' | 'Diagnostic Triage' | 'Micro-soldering' | '24h Stress Bench' | 'Ready for Dispatch' | 'Completed';
  technicianNotes?: string;
  voltageLog?: string;
  trackingNumber?: string;
  timeline: {
    time: string;
    stage: string;
    description: string;
    completed: boolean;
  }[];
}

export interface DiagnosticItem {
  id: string;
  name: string;
  category: 'Power' | 'Display' | 'VRAM' | 'Thermal' | 'Physical';
  description: string;
  typicalCause: string;
  estimatedFixTime: string;
  priceRange: string;
  severity: 'Moderate' | 'High' | 'Critical';
}
