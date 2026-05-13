import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, AlertCircle, Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

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
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const role = await loginByEmail(email, password);
      if (role) {
        navigate(`/${role}`);
      } else {
        setError('Email atau kata sandi salah.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Background halus */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,58,138,0.18),transparent_65%)]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">SCOLA</div>
              <div className="text-[11px] text-slate-400 mt-0.5">SMAIT Nur Hidayah Sukoharjo</div>
            </div>
          </Link>
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3 w-3" /> Kembali ke beranda
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <Card className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
            <CardHeader className="pt-8 pb-3 text-center">
              <CardTitle className="text-2xl font-bold text-white tracking-tight">Masuk ke portal</CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-1">
                Gunakan akun yang telah diberikan oleh admin sekolah.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-2">
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="flex items-start gap-2 text-sm text-red-300 bg-red-900/25 p-3 rounded-xl border border-red-500/20">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nama@sekolah.sch.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-slate-950 border-white/10 rounded-xl pl-10 text-white placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-300">Kata Sandi</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-slate-950 border-white/10 rounded-xl pl-10 pr-10 text-white placeholder:text-slate-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Masuk'}
                </Button>

                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  Lupa kata sandi? Hubungi admin sekolah untuk pengaturan ulang.
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-[11px] text-slate-600">
            &copy; {new Date().getFullYear()} SCOLA · SMAIT Nur Hidayah Sukoharjo
          </p>
        </div>
      </div>
    </div>
  );
}
