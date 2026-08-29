import React, { useState } from 'react';
import { BookingRequest } from '../types/repair';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Wrench, 
  Cpu, 
  Send, 
  ShieldCheck, 
  Truck, 
  AlertCircle, 
  FileText,
  MessageSquare,
  Thermometer,
  Layers
} from 'lucide-react';

interface RepairTrackerProps {
  tickets: Record<string, BookingRequest>;
  initialTicketId?: string;
  onOpenBooking: () => void;
}

export const RepairTracker: React.FC<RepairTrackerProps> = ({
  tickets,
  initialTicketId,
  onOpenBooking
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialTicketId || 'RC-8402');
  const [activeTicketId, setActiveTicketId] = useState<string>(initialTicketId || 'RC-8402');
  const [technicianMessage, setTechnicianMessage] = useState<string>('');
  const [messageSentSuccess, setMessageSentSuccess] = useState<boolean>(false);

  const currentTicket = tickets[activeTicketId];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveTicketId(searchInput.trim().toUpperCase());
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (technicianMessage.trim()) {
      setMessageSentSuccess(true);
      setTechnicianMessage('');
      setTimeout(() => setMessageSentSuccess(false), 4000);
    }
  };

  return (
    <section id="tracker-section" className="py-16 sm:py-24 bg-neutral-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
            <Search className="w-3.5 h-3.5 text-red-400" />
            <span>PELACAKAN STATUS & TELEMETRI REPARASI LIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lacak Status <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">Servis VGA Anda</span>
          </h2>
          <p className="text-neutral-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Masukkan Nomor Tiket / Nota Servis Anda untuk melihat log diagnosa langsung dari meja teknisi, pengukuran voltase, dan status pengujian.
          </p>
        </div>

        {/* Search Bar & Demo Ticket Selectors */}
        <div className="max-w-2xl mx-auto mb-10 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              id="repair-tracker-search-input"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Masukkan Nomor Tiket (misal: RC-8402, RC-7719)"
              className="w-full h-13 pl-11 pr-32 bg-neutral-900 border border-neutral-700 rounded-2xl text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-xl"
            />
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
            <button
              type="submit"
              id="repair-tracker-search-btn"
              className="absolute right-2 h-9 px-5 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs font-mono rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/20"
            >
              LACAK SEKARANG
            </button>
          </form>

          {/* Quick Demo Ticket Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-[11px] text-neutral-500">Contoh Tiket Demo:</span>
            {Object.keys(tickets).slice(0, 4).map((tid) => (
              <button
                key={tid}
                type="button"
                id={`quick-demo-ticket-${tid.toLowerCase()}`}
                onClick={() => {
                  setSearchInput(tid);
                  setActiveTicketId(tid);
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
                  activeTicketId === tid
                    ? 'bg-red-950 border-red-500 text-red-300 font-bold'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                #{tid}
              </button>
            ))}
          </div>
        </div>

        {/* Tracker Results Container */}
        {currentTicket ? (
          <div className="space-y-6">
            
            {/* Status Summary Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/95 to-neutral-950 border border-neutral-800 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                
                {/* Left Ticket Info */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-300 font-bold">
                      TIKET #{currentTicket.ticketId}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      Diterima {currentTicket.createdAt}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>{currentTicket.gpuModel}</span>
                    <span className="text-xs font-mono font-normal text-neutral-400 px-2 py-0.5 rounded bg-neutral-800">
                      {currentTicket.gpuManufacturer}
                    </span>
                  </h3>

                  <p className="text-xs font-mono text-neutral-400 mt-1">
                    Pemilik: <span className="text-neutral-300">{currentTicket.customerName}</span> • 
                    Paket: <span className="text-red-400 uppercase font-semibold">{currentTicket.serviceTier.replace('_', ' ')}</span>
                  </p>
                </div>

                {/* Right Current Status Badge */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">Tahapan Saat Ini</div>
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      {currentTicket.status}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Stage Milestones Timeline */}
            <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8 shadow-xl">
              <h4 className="text-sm font-mono font-bold text-neutral-200 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" />
                <span>Tahapan Pengerjaan Lab</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {currentTicket.timeline.map((step, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                        step.completed
                          ? 'bg-neutral-950 border-red-500/60 text-white shadow-sm'
                          : 'bg-neutral-950/40 border-neutral-800/80 text-neutral-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                          <span className={step.completed ? 'text-red-400 font-bold' : 'text-neutral-600'}>
                            0{idx+1}
                          </span>
                          {step.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-neutral-600" />
                          )}
                        </div>
                        <div className={`text-xs font-bold ${step.completed ? 'text-neutral-100' : 'text-neutral-500'}`}>
                          {step.stage}
                        </div>
                        <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                          {step.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-1 border-t border-neutral-800/60 text-[9px] font-mono text-neutral-500">
                        {step.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Logs & Technician Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Technician Workbench Notes */}
              <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-5 sm:p-6 space-y-4">
                <h4 className="text-xs font-mono font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-red-400" />
                  <span>Catatan Teknisi Meja Kerja Ruli Computer</span>
                </h4>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed">
                  {currentTicket.technicianNotes || 'Pemeriksaan tahap awal sedang berlangsung.'}
                </div>

                {currentTicket.voltageLog && (
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block mb-1">Telemetri Voltase Rel Terukur:</span>
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-400">
                      {currentTicket.voltageLog}
                    </div>
                  </div>
                )}

                {currentTicket.trackingNumber && (
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-red-400" />
                      <span>Nomor Resi Ekspedisi Pengembalian:</span>
                    </span>
                    <span className="text-red-400 font-bold">{currentTicket.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Client-to-Tech Message & Special Requests */}
              <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-5 sm:p-6 space-y-4">
                <h4 className="text-xs font-mono font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-red-400" />
                  <span>Kirim Pesan Langsung ke Teknisi Lab</span>
                </h4>

                <p className="text-xs text-neutral-400">
                  Ingin memberikan info tambahan atau konfirmasi persetujuan pergantian sparepart? Kirimkan catatan instan langsung ke terminal teknisi yang menangani #{currentTicket.ticketId}.
                </p>

                <form onSubmit={handleSendMessage} className="space-y-3">
                  <textarea
                    rows={3}
                    value={technicianMessage}
                    onChange={(e) => setTechnicianMessage(e.target.value)}
                    placeholder="Contoh: Tolong sekalian ganti thermal pad backplate dengan PTM7950 ya mas."
                    className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-red-500"
                  />

                  {messageSentSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Pesan berhasil dikirim ke terminal aktif teknisi.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="send-technician-note-btn"
                    className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-neutral-200 border border-neutral-700 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Catatan ke Meja Lab</span>
                  </button>
                </form>
              </div>

            </div>

          </div>
        ) : (
          /* Ticket Not Found State */
          <div className="text-center py-12 px-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Tiket #{activeTicketId} Tidak Ditemukan</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Silakan periksa kembali Nomor Nota/Tiket dari WhatsApp atau email konfirmasi Anda, atau buat permohonan servis baru.
            </p>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs font-mono cursor-pointer shadow-md shadow-red-600/20"
            >
              Mulai Booking Servis Baru
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

