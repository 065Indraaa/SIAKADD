import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, AlertCircle, Loader2, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginByEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const role = await loginByEmail(email, password);
      if (role) {
        navigate(`/${role}`);
      } else {
        setError('Email atau password salah');
      }
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
          Sistem Informasi Akademik · SMAIT Nur Hidayah Sukoharjo
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-1000 delay-200">
        <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden">
          <CardHeader className="pt-10 pb-2 text-center">
            <CardTitle className="text-2xl font-black text-white tracking-tight">Selamat Datang Kembali</CardTitle>
            <CardDescription className="text-slate-400 font-medium">Masuk untuk mengakses portal akademik Anda</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="flex items-center text-sm text-red-300 bg-red-900/30 p-4 rounded-xl border border-red-500/20 animate-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email / Nama Pengguna</Label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@sekolah.sch.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-slate-950 border-white/5 rounded-2xl pl-12 text-white placeholder:text-slate-600 focus:border-blue-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Kata Sandi</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-slate-950 border-white/5 rounded-2xl pl-12 pr-12 text-white placeholder:text-slate-600 focus:border-blue-500/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all duration-300 group"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Masuk Sekarang
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="h-px bg-white/5 flex-1"></div>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-700">Akun Demo (setelah Seed)</span>
                <div className="h-px bg-white/5 flex-1"></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setEmail('admin@demo.com'); setPassword('Admin@123'); }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all text-center border border-white/5"
                >
                  ADMIN
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('guru@demo.com'); setPassword('Guru@123'); }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all text-center border border-white/5"
                >
                  GURU
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('siswa@demo.com'); setPassword('Siswa@123'); }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all text-center border border-white/5"
                >
                  SISWA
                </button>
              </div>

              <div className="text-[10px] text-slate-600 text-center leading-relaxed pt-2">
                Jalankan <span className="text-blue-400 font-mono">Buat Data Demo</span> di menu admin → password default: <span className="text-yellow-400 font-mono">Admin@123</span>, <span className="text-yellow-400 font-mono">Guru@123</span>, <span className="text-yellow-400 font-mono">Siswa@123</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <p className="mt-10 text-center text-xs text-slate-600 font-medium tracking-wide relative z-10 animate-fade-in delay-500">
        &copy; 2026 SCOLA · Digunakan oleh SMAIT Nur Hidayah Sukoharjo
      </p>
    </div>
  );
}