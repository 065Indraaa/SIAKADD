import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, AlertCircle, Loader2, User, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBypassLogin = async (role: 'admin' | 'guru' | 'siswa') => {
    setError('');
    setIsLoading(true);
    try {
      await login(role);
      navigate(`/${role}`);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(30,58,138,0.2),_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="flex justify-center group pointer-events-none">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-8 text-center text-5xl font-black text-white tracking-tighter font-heading italic">
          SCOLA
        </h2>
        <p className="mt-3 text-center text-slate-400 font-medium tracking-wide">
          Sistem Informasi Akademik Berbasis Cloud
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-1000 delay-200">
        <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden">
          <CardHeader className="pt-10 pb-2">
            <CardTitle className="text-2xl font-black text-center text-white tracking-tight">Selamat Datang</CardTitle>
            <CardDescription className="text-center text-slate-400 font-medium">Silakan pilih akses yang sesuai dengan peran Anda</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 p-8">
            {error && (
              <div className="flex items-center text-sm text-red-300 bg-red-900/30 p-4 rounded-xl border border-red-500/20 mb-4 animate-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Akses Siswa */}
            <button
              onClick={() => handleBypassLogin('siswa')}
              disabled={isLoading}
              className="group relative flex items-center justify-between w-full p-4 h-16 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-400 rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-600 group-hover:bg-white/20 rounded-xl flex items-center justify-center mr-4 transition-colors">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Akses Siswa</span>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-400 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </button>

            {/* Akses Guru */}
            <button
              onClick={() => handleBypassLogin('guru')}
              disabled={isLoading}
              className="group relative flex items-center justify-between w-full p-4 h-16 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 hover:border-emerald-400 rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-emerald-600 group-hover:bg-white/20 rounded-xl flex items-center justify-center mr-4 transition-colors">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Akses Pengajar</span>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-400 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </button>

            {/* Akses Admin */}
            <button
              onClick={() => handleBypassLogin('admin')}
              disabled={isLoading}
              className="group relative flex items-center justify-between w-full p-4 h-16 bg-slate-800/50 hover:bg-slate-700 border border-white/10 rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-slate-700 group-hover:bg-white/20 rounded-xl flex items-center justify-center mr-4 transition-colors">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Kontrol Akses</span>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </button>
          </CardContent>
        </Card>
      </div>

      <p className="mt-10 text-center text-xs text-slate-600 font-medium tracking-wide relative z-10 animate-fade-in delay-500">
        &copy; 2026 SCOLA
      </p>
    </div>
  );
}