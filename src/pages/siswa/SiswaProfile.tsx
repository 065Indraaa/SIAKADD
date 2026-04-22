import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Phone, GraduationCap, Zap, Shield, Fingerprint } from 'lucide-react';

export default function SiswaProfile() {
  const { user } = useAuth();

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
            Verified Status
          </div>
          <Shield className="h-5 w-5 text-emerald-500 fill-emerald-500/20" />
        </div>
      </div>

      <div className="max-w-5xl space-y-8">
        {/* 1. Header Profil (Futuristic Glassmorphism) */}
        <div className="bg-slate-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <User className="h-40 w-40" />
          </div>

          <div className="relative w-40 h-40 bg-slate-800 rounded-[2.5rem] overflow-hidden border-4 border-white/5 flex-shrink-0 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'student'}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">{user?.name || "YUSUF RAMADHAN"}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
              <p className="text-indigo-400 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> {user?.className || "XI-MIPA-1"}
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Siswa Aktif</p>
            </div>
            <p className="text-slate-500 font-medium text-lg mt-4 max-w-md">Terdaftar sejak Tahun Ajaran 2023/2024 sebagai siswa reguler.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 2. Data Diri */}
          <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] shadow-xl overflow-hidden h-fit">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-white font-heading font-black text-2xl italic flex items-center gap-3">
                <Zap className="h-6 w-6 text-indigo-400" /> Data Akademik
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: "Nomor Induk Siswa Nasional", value: user?.nisn || "0012345678", tag: "NISN" },
                { label: "Nomor Induk Siswa", value: user?.nis || "1001", tag: "NIS" },
                { label: "Tempat Lahir", value: "Jakarta" },
                { label: "Tanggal Lahir", value: "15 Mei 2007" },
                { label: "Jenis Kelamin", value: "Laki-laki" },
                { label: "Kurikulum", value: "Merdeka Belajar" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                  <p className="text-lg font-black text-white tracking-tight">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 3. Informasi Kontak */}
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
                  <p className="text-lg font-bold text-white leading-snug">Jl. Merdeka No. 123, Jakarta Selatan</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nomor Telepon</p>
                  <p className="text-lg font-bold text-white leading-snug">081234567890</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="h-12 w-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Alamat Email</p>
                  <p className="text-xl font-black text-white tracking-tighter truncate">{user?.email || 'yusuf@student.unesa.ac.id'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
