import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Trophy, Sparkles, Zap, ChevronRight } from 'lucide-react';

export default function SiswaAchievements() {
  const achievements = [
    { id: 1, name: 'Olimpiade Matematika Nasional', type: 'Akademik', level: 'Nasional', rank: 'Juara 1', date: '15 Agustus 2024', desc: 'Meraih medali emas pada Olimpiade Sains Nasional bidang Matematika.' },
    { id: 2, name: 'Lomba Debat Bahasa Inggris', type: 'Non-Akademik', level: 'Provinsi', rank: 'Juara 2', date: '10 September 2024', desc: 'Mewakili sekolah dalam kompetisi debat tingkat provinsi.' },
    { id: 3, name: 'Kompetisi Pemrograman Siswa', type: 'Akademik', level: 'Kota', rank: 'Juara 1', date: '5 Mei 2024', desc: 'Membuat aplikasi pembelajaran interaktif.' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <Trophy className="h-4 w-4 text-amber-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Excellence & Achievements</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Prestasi Saya
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
            Kumpulan dedikasi dan kerja keras Anda yang telah diakui secara resmi.
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-2xl">
           <div className="h-12 w-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/20">
              <Sparkles className="h-6 w-6" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Pencapaian</p>
              <p className="text-white font-bold">{achievements.length} Sertifikat Valid</p>
           </div>
        </div>
      </div>

      <div className="grid gap-8">
        {achievements.map((ach, idx) => (
          <Card key={ach.id} className="bg-slate-900/40 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl group hover:-translate-y-1 transition-all duration-500">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Prize Side */}
              <div className="relative bg-slate-950/40 p-10 flex flex-col items-center justify-center lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-24 w-24 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-4 shadow-2xl border border-white/5 transform group-hover:scale-110 transition-transform duration-500">
                  {ach.rank.includes('1') ? (
                    <Trophy className="h-12 w-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
                  ) : (
                    <Award className="h-12 w-12 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]" />
                  )}
                </div>
                <div className="relative text-center">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Peringkat</p>
                   <p className="font-black text-2xl text-white tracking-tighter italic">{ach.rank}</p>
                </div>
              </div>
              
              {/* Info Side */}
              <div className="p-10 flex-1 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Badge className={ach.type === 'Akademik' ? 'bg-blue-600/20 text-blue-400 border-blue-500/20 px-3 py-1 font-bold' : 'bg-purple-600/20 text-purple-400 border-purple-500/20 px-3 py-1 font-bold'}>
                        {ach.type}
                      </Badge>
                      <Badge variant="outline" className="bg-white/5 text-slate-400 border-white/5 px-3 py-1 font-bold">
                        TINGKAT {ach.level}
                      </Badge>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{ach.name}</h3>
                    <div className="flex items-center text-slate-500 gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{ach.date}</span>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex h-12 w-12 rounded-full border border-white/5 items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                     <ChevronRight className="h-6 w-6 text-slate-700 group-hover:text-white" />
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-white/[0.02] rounded-3xl border border-white/5 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/40" />
                   <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                     "{ach.desc}"
                   </p>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-32 bg-slate-900/20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <Award className="mx-auto h-20 w-20 text-slate-800 animate-pulse" />
            <h3 className="mt-6 text-2xl font-black text-slate-700 uppercase tracking-tighter">Belum Ada Catatan Prestasi</h3>
            <p className="mt-2 text-slate-500 font-medium">Terus semangat mengukir karya dan prestasi!</p>
          </div>
        )}
      </div>
    </div>
  );
}