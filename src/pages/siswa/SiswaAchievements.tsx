import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Trophy, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchPrestasiSiswa } from '@/lib/schoolService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

export default function SiswaAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAchievements = useCallback(async () => {
    if (!user?.siswaId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPrestasiSiswa(user.siswaId);
      setAchievements(data || []);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Gagal memuat data prestasi.');
    } finally {
      setLoading(false);
    }
  }, [user?.siswaId]);

  useEffect(() => { loadAchievements(); }, [loadAchievements]);
  useAutoRefresh(loadAchievements, 20_000);

  if (loading && achievements.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-sm text-muted-foreground">Memuat data prestasi...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Prestasi Saya</h2>
        <p className="text-muted-foreground mt-1">Daftar pencapaian akademik dan non-akademik Anda.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="grid gap-6">
        {achievements.map((ach) => (
          <Card key={ach.id} className="bg-card border-border overflow-hidden shadow-sm hover:border-blue-500/50 transition-all">
            <div className="flex flex-col sm:flex-row">
              {/* Icon Area */}
              <div className="bg-blue-500/5 dark:bg-blue-900/20 p-6 flex flex-col items-center justify-center sm:w-48 border-b sm:border-b-0 sm:border-r border-border">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-3 border border-border">
                  {ach.rank?.includes('1') ? <Trophy className="h-8 w-8 text-yellow-500 dark:text-yellow-400" /> : <Award className="h-8 w-8 text-blue-500 dark:text-blue-400" />}
                </div>
                <span className="font-bold text-center text-foreground">{ach.rank}</span>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{ach.name}</h3>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {ach.date ? new Date(ach.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={ach.type === 'Akademik' ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-600/50 dark:text-blue-100 dark:border-blue-500/50' : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}>
                      {ach.type}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground border-border">
                      Tingkat {ach.level}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{ach.desc || '-'}</p>
              </div>
            </div>
          </Card>
        ))}

        {achievements.length === 0 && !error && (
          <div className="text-center py-12 bg-card border border-dashed border-border rounded-2xl">
            <Award className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-2 text-sm font-semibold text-foreground">Belum ada prestasi</h3>
            <p className="mt-1 text-sm text-muted-foreground">Terus semangat belajar dan raih prestasimu!</p>
          </div>
        )}
      </div>
    </div>
  );
}
