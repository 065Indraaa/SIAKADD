import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Phone, GraduationCap } from 'lucide-react';

export default function SiswaProfile() {
  const { user } = useAuth();

  return (
    // Background di-set ke slate-950 untuk menyamai Landing Page
    <div className="min-h-screen bg-slate-950 p-6 space-y-6 text-slate-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Profil Saya</h2>
          <p className="text-slate-400">Informasi data diri Anda.</p>
        </div>

        {/* 1. Header Profil (Futuristic Glassmorphism) */}
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-center gap-6 shadow-2xl">
          <div className="w-28 h-28 bg-slate-800 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
             <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{user?.name || "YUSUF RAMADHAN"}</h1>
            <p className="text-blue-400 font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> S1 Pendidikan Teknologi Informasi
            </p>
            <p className="text-slate-400 text-sm mt-1">Periode Kuliah 2025/2026 Genap</p>
          </div>
        </div>

        {/* 2. Data Diri */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" /> Data Diri
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "NISN", value: "0012345678" },
              { label: "NIS", value: "1001" },
              { label: "Tempat Lahir", value: "Jakarta" },
              { label: "Tanggal Lahir", value: "15 Mei 2007" },
              { label: "Jenis Kelamin", value: "Laki-laki" },
              { label: "Kelas / Jurusan", value: "XI-IPA-1 / MIPA" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="text-lg font-medium text-white">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 3. Informasi Kontak */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Informasi Kontak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Alamat Lengkap</p>
                <p className="text-white">Jl. Merdeka No. 123, Jakarta Selatan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Nomor Telepon</p>
                <p className="text-white">081234567890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-white">{user?.email || 'yusuf@student.unesa.ac.id'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}