import React from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Cpu } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      author: 'Budi Santoso',
      role: 'Lead 3D Visualizer, PixelVibe Studio',
      cardRepaired: 'RTX 4090 ROG Strix 24GB',
      ticket: '#RC-8402',
      savings: 'Hemat Rp 27.500.000',
      rating: 5,
      date: 'Agu 2026',
      content: 'RTX 4090 studio kami mengalami soket 12VHPWR meleleh di tengah deadline render klien. Tim Ruli Computer membersihkan jalur PCB, jumper jalur tembaga 2oz, dan lulus benchmark 24 jam FurMark dalam 2 hari. Sangat profesional dan rapi.'
    },
    {
      author: 'Dimas Prasetyo',
      role: 'Esports Hardware Technician',
      cardRepaired: 'RTX 3080 Gaming X Trio',
      ticket: '#RC-7719',
      savings: 'Hemat Rp 11.200.000',
      rating: 5,
      date: 'Agu 2026',
      content: 'Kena Error Code 43 dan artifak kotak-kotak akibat IC memori Micron GDDR6X rusak. Diberikan bukti screenshot log MATS yang menunjukkan Bank B0 error, lalu diganti IC baru dan reballing. Sekarang performa gaming normal seperti baru.'
    },
    {
      author: 'Dr. Hendra Gunawan',
      role: 'Dosen & Peneliti AI Lab',
      cardRepaired: 'RTX 3090 FTW3 24GB',
      ticket: '#RC-6291',
      savings: 'Hemat Rp 18.500.000',
      rating: 5,
      date: 'Jul 2026',
      content: 'DrMOS short membuat PSU workstation langsung proteksi mati tiap kali dinyalakan. Ruli Computer menemukan titik korsleting menggunakan thermal camera FLIR, mengganti MOSFET Vishay SiC654A OEM, dan membersihkan papan secara ultrasonik. Sangat direkomendasikan!'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-950/70 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-mono font-medium mb-3">
            <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>ULASAN TERVERIFIKASI PELANGGAN LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dipercaya Oleh <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">Gamer, Studio Kreatif & Lab AI</span>
          </h2>
          <p className="text-neutral-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Simak pengalaman nyata dari kreator konten, gamer kompetitif, dan instansi yang mempercayakan servis VGA mereka kepada Ruli Computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-900/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                    {rev.savings}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 font-normal leading-relaxed mb-4">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{rev.author}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{rev.role}</div>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <div className="text-red-400 font-bold">{rev.cardRepaired}</div>
                    <div className="text-neutral-500">{rev.ticket}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

