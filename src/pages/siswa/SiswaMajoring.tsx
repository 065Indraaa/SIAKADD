import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { fetchJurusan, savePeminatan } from '@/lib/schoolService';
import { BookOpen, CheckCircle2, Loader2, Save, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SiswaMajoring() {
  const { user } = useAuth();
  const [jurusans, setJurusans] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJurusan();
        setJurusans(data);
        if ((user as any)?.peminatanId) {
          setSelectedId((user as any).peminatanId);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user?.siswaId || !selectedId) return;
    setSaving(true);
    try {
      await savePeminatan(user.siswaId, selectedId);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan pilihan rumpun peminatan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-sm text-slate-500">Memuat data rumpun peminatan...</span>
      </div>
    );
  }

  const currentJurusan = jurusans.find(j => j.id === selectedId);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-white">Rumpun Peminatan</h2>
          <p className="text-slate-400 mt-1">Pilih rumpun peminatan (A/B/C) untuk dipertimbangkan dalam penetapan kelas 11.</p>
        </div>
        {selectedId && (
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] px-8 rounded-2xl h-12">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSuccess ? 'Tersimpan!' : 'Simpan Pilihan'}
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {jurusans.map((j) => (
          <div 
            key={j.id} 
            onClick={() => setSelectedId(j.id)}
            className={`cursor-pointer transition-all duration-300 relative group ${
              selectedId === j.id 
              ? 'ring-2 ring-blue-500 bg-blue-600/10' 
              : 'hover:bg-white/5 border border-white/5'
            } rounded-[2.5rem] p-8 overflow-hidden`}
          >
            {selectedId === j.id && (
              <div className="absolute top-6 right-6">
                <CheckCircle2 className="h-6 w-6 text-blue-400" />
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${
              selectedId === j.id ? 'bg-blue-600' : 'bg-slate-800'
            }`}>
              <BookOpen className="h-6 w-6 text-white" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{j.nama}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Program keahlian {j.nama} fokus pada pengembangan kompetensi di bidang {j.nama.toLowerCase()}.
            </p>
            
            <div className="mt-6 flex items-center text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Pilih Rumpun Ini <MoveRight className="ml-2 h-3 w-3" />
            </div>
          </div>
        ))}
      </div>

      {selectedId && (
        <Card className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 text-lg">Konfirmasi Pilihan</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Anda telah memilih <span className="text-white font-bold underline decoration-blue-500/50">{currentJurusan?.nama}</span>. 
                  Pilihan ini akan diteruskan ke tim kurikulum & BK untuk dipertimbangkan dalam penetapan kelas 11. 
                  Jika kuota rumpun pilihan utama penuh, sekolah dapat menawarkan rumpun alternatif.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
