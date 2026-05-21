import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Phone, GraduationCap, Shield, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { getSiswa } from '@uassiakad/connector';
import { dataConnect } from '@/lib/userService';
import { useAutoRefresh } from '@/lib/useAutoRefresh';

export default function SiswaProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!user?.siswaId) {
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const res = await getSiswa(dataConnect, { id: user.siswaId });
      setProfile(res.data.siswa);
    } catch (e: any) {
      console.error('Failed to load profile:', e);
      setError(e.message || 'Gagal memuat data profil.');
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
        <span className="text-sm text-muted-foreground">Memuat profil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Gagal memuat profil</p>
            <p className="text-sm mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Null-safe display values
  const displayName = profile?.pengguna?.nama || user?.name || 'Siswa';
  const displayEmail = profile?.pengguna?.email || user?.email || '-';
  const displayPhone = profile?.pengguna?.telepon || user?.phone || '-';
  const displayAddress = profile?.pengguna?.alamat || profile?.alamat || user?.address || '-';
  const displayNis = profile?.nis || user?.nis || '-';
  const displayClass = profile?.kelas?.nama || user?.className || 'Belum Diatur';
  const displayGender = profile?.jenisKelamin === 'L'
    ? 'Laki-laki'
    : profile?.jenisKelamin === 'P'
    ? 'Perempuan'
    : '-';
  const displayBirthPlace = profile?.tempatLahir || user?.birthPlace || '-';
  const displayBirthDate = profile?.tanggalLahir
    ? new Date(profile.tanggalLahir).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '-';
  const displayJurusan = profile?.jurusan?.nama || user?.jurusanName || '-';
  const displayPeminatan = profile?.peminatan?.nama || user?.peminatanName || '-';
  // Gunakan !== undefined/null agar angka 0 tidak jadi '-'
  const displayTahunMasuk = profile?.tahunMasuk != null
    ? String(profile.tahunMasuk)
    : '-';

  const infoAkademik = [
    { label: 'Nomor Induk Siswa', value: displayNis },
    { label: 'Kelas', value: displayClass },
    { label: 'Jenis Kelamin', value: displayGender },
    { label: 'Tempat Lahir', value: displayBirthPlace },
    { label: 'Tanggal Lahir', value: displayBirthDate },
    { label: 'Jurusan', value: displayJurusan },
    { label: 'Rumpun Peminatan', value: displayPeminatan },
    { label: 'Tahun Masuk', value: displayTahunMasuk },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Profil Saya</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Informasi identitas dan data kontak yang terdaftar dalam sistem akademik.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 scola-card rounded-xl">
          <Shield className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Terverifikasi</span>
        </div>
      </div>

      {/* Kartu identitas utama */}
      <div className="scola-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" /> {displayClass}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">Siswa Aktif</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">NIS: {displayNis}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Akademik */}
        <Card className="scola-card rounded-2xl overflow-hidden">
          <CardHeader className="p-5 border-b border-border">
            <CardTitle className="text-foreground text-base font-bold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" /> Data Akademik
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoAkademik.map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold text-foreground mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Informasi Kontak */}
        <Card className="scola-card rounded-2xl overflow-hidden">
          <CardHeader className="p-5 border-b border-border">
            <CardTitle className="text-foreground text-base font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" /> Informasi Kontak
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="flex items-start gap-4">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Surel</p>
                <p className="text-sm font-semibold text-foreground mt-0.5 break-all">{displayEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Telepon</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{displayPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Alamat</p>
                <p className="text-sm font-semibold text-foreground mt-0.5 leading-relaxed">{displayAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
