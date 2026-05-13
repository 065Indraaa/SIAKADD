import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Trophy } from 'lucide-react';

export default function SiswaAchievements() {
  const achievements = [
    { id: 1, name: 'Olimpiade Matematika Nasional', type: 'Akademik', level: 'Nasional', rank: 'Juara 1', date: '15 Agustus 2024', desc: 'Meraih medali emas pada Olimpiade Sains Nasional bidang Matematika.' },
    { id: 2, name: 'Lomba Debat Bahasa Inggris', type: 'Non-Akademik', level: 'Provinsi', rank: 'Juara 2', date: '10 September 2024', desc: 'Mewakili sekolah dalam kompetisi debat tingkat provinsi.' },
    { id: 3, name: 'Kompetisi Pemrograman Siswa', type: 'Akademik', level: 'Kota', rank: 'Juara 1', date: '5 Mei 2024', desc: 'Membuat aplikasi pembelajaran interaktif.' },
  ];

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Prestasi Saya
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Daftar pencapaian akademik dan non-akademik Anda.
        </p>
      </div>

      <div className="grid gap-6">
        {achievements.map((ach) => (
          <Card
            key={ach.id}
            className="bg-white border-slate-200 overflow-hidden shadow-sm hover:border-blue-400 transition-all dark:bg-slate-900/50 dark:backdrop-blur-md dark:border-white/10 dark:shadow-xl dark:hover:border-blue-500/50"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Icon Area */}
              <div className="bg-blue-50 p-6 flex flex-col items-center justify-center sm:w-48 border-b border-slate-200 sm:border-b-0 sm:border-r dark:bg-blue-900/20 dark:border-white/5">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-3 border border-slate-200 dark:bg-slate-950/50 dark:border-white/5">
                  {ach.rank.includes('1')
                    ? <Trophy className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
                    : <Award className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                  }
                </div>
                <span className="font-bold text-center text-slate-900 dark:text-white">
                  {ach.rank}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ach.name}</h3>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{ach.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={
                        ach.type === 'Akademik'
                          ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/50 dark:text-blue-100 dark:border-blue-500/50'
                          : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      }
                    >
                      {ach.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-slate-500 border-slate-300 dark:text-slate-400 dark:border-white/10"
                    >
                      Tingkat {ach.level}
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {ach.desc}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-2xl dark:bg-slate-900/50 dark:border-white/10">
            <Award className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
              Belum ada prestasi
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Terus semangat belajar dan raih prestasimu!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}