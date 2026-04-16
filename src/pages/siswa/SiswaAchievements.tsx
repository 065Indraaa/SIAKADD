import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Trophy } from 'lucide-react';

export default function SiswaAchievements() {
  const achievements = [
    { id: 1, name: 'Olimpiade Matematika Nasional', type: 'Akademik', level: 'Nasional', rank: 'Juara 1', date: '15 Agustus 2024', desc: 'Meraih medali emas pada Olimpiade Sains Nasional bidang Matematika.' },
    { id: 2, name: 'Lomba Debat Bahasa Inggris', type: 'Non-Akademik', level: 'Provinsi', rank: 'Juara 2', date: '10 September 2024', desc: 'Mewakili sekolah dalam kompetisi debat tingkat provinsi.' },
    { id: 3, name: 'Kompetisi Pemrograman Siswa', type: 'Akademik', level: 'Kota', rank: 'Juara 1', date: '5 Mei 2024', desc: 'Membuat aplikasi pembelajaran interaktif.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Prestasi Saya</h2>
        <p className="text-slate-500">Daftar pencapaian akademik dan non-akademik Anda.</p>
      </div>

      <div className="grid gap-6">
        {achievements.map((ach) => (
          <Card key={ach.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-blue-50 p-6 flex flex-col items-center justify-center sm:w-48 border-b sm:border-b-0 sm:border-r border-blue-100">
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  {ach.rank.includes('1') ? <Trophy className="h-8 w-8 text-yellow-500" /> : <Award className="h-8 w-8" />}
                </div>
                <span className="font-bold text-center text-blue-900">{ach.rank}</span>
              </div>
              <div className="p-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{ach.name}</h3>
                    <div className="flex items-center text-slate-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{ach.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={ach.type === 'Akademik' ? 'default' : 'secondary'}>
                      {ach.type}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-50">
                      Tingkat {ach.level}
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-600">{ach.desc}</p>
              </div>
            </div>
          </Card>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
            <Award className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">Belum ada prestasi</h3>
            <p className="mt-1 text-sm text-slate-500">Terus semangat belajar dan raih prestasimu!</p>
          </div>
        )}
      </div>
    </div>
  );
}
