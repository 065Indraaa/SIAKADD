import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Phone, GraduationCap, Zap, Shield, Calendar, BookOpen } from 'lucide-react';
import { getSiswa } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';
import { Loader2 } from 'lucide-react';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

export default function SiswaProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user?.siswaId) {
      setLoading(false);
      return;
    }
    try {
      const res = await getSiswa(dataConnect, { id: user.siswaId });
      setProfile(res.data.siswa);
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setLoading(false);
    }
  }, [user?.siswaId]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  useAutoRefresh(loadProfile, 30_000);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-sm text-slate-500">Memuat profil...</span>
      </div>
    );
  }

  const displayName = profile?.pengguna?.nama || user?.name || 'Siswa';
  const displayEmail = profile?.pengguna?.email || user?.email || '-';
  const displayPhone = profile?.pengguna?.telepon || user?.phone || '-';
  const displayAddress = profile?.pengguna?.alamat || profile?.alamat || user?.address || '-';
  const displayNis = profile?.nis || user?.nis || '-';
  const displayClass = profile?.kelas?.nama || user?.className || 'Belum Diatur';
  const displayGender = profile?.jenisKelamin === 'L' ? 'Laki-laki' : profile?.jenisKelamin === 'P' ? 'Perempuan' : '-';
  const displayBirthPlace = profile?.tempatLahir || user?.birthPlace || '-';
  const displayBirthDate = profile?.tanggalLahir 
    ? new Date(profile.tanggalLahir).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : '-';
  const displayJurusan = profile?.jurusan?.nama || user?.jurusanName || '-';
  const displayPeminatan = profile?.peminatan?.nama || user?.peminatanName || '-';
  const displayTahunMasuk = profile?.tahunMasuk || '-';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-white font-heading leading-none">
            Profil Saya
          </h2>
          <p className="text-slate-400 font-medium mt-4 text-lg max-w-xl">
            Informasi identitas resmi dan data kontak yang terdaftar dalam sistem akademik.
          </p>
        </div>

        <div className="bg-white/5 border border-white/5 p-2 rounded-2xl flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
            Terverifikasi
          </div>
          <Shield className="h-5 w-5 text-emerald-500 fill-emerald-500/20" />
        </div>
      </div>

      <div className="max-w-5xl space-y-8">
        {/* Header Profil */}
        <div className="bg-slate-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <User className="h-40 w-40" />
          </div>

          <div className="relative w-40 h-40 bg-slate-800 rounded-[2.5rem] overflow-hidden border-4 border-white/5 flex-shrink-0 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">{displayName}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
              <p className="text-indigo-400 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> {displayClass}
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Siswa Aktif</p>
            </div>
            <p className="text-slate-500 font-medium text-lg mt-4 max-w-md">
              NIS: {displayNis} • Tahun Masuk: {displayTahunMasuk}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Akademik */}
          <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden h-fit">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-white font-heading font-black text-2xl italic flex items-center gap-3">
                <Zap className="h-6 w-6 text-indigo-400" /> Data Akademik
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: "Nomor Induk Siswa", value: displayNis },
                { label: "Kelas", value: displayClass },
                { label: "Tempat Lahir", value: displayBirthPlace },
                { label: "Tanggal Lahir", value: displayBirthDate },
                { label: "Jenis Kelamin", value: displayGender },
                { label: "Jurusan", value: displayJurusan },
                { label: "Peminatan", value: displayPeminatan },
                { label: "Tahun Masuk", value: String(displayTahunMasuk) },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                  <p className="text-lg font-black text-white tracking-tight">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Informasi Kontak */}
          <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden h-fit">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-white font-heading font-black text-2xl italic">Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Alamat Lengkap</p>
                  <p className="text-lg font-bold text-white leading-snug">{displayAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nomor Telepon</p>
                  <p className="text-lg font-bold text-white leading-snug">{displayPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="h-12 w-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Alamat Email</p>
                  <p className="text-xl font-black text-white tracking-tighter truncate">{displayEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
