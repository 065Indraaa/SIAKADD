import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, AlertCircle, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Futuristic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(30,58,138,0.2),_transparent_70%)]"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-extrabold text-white tracking-tight">
          SIAKAD SMA
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Sistem Informasi Akademik Terintegrasi
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-white">Masuk ke Sistem</CardTitle>
            <CardDescription className="text-center text-slate-400">Pilih peran Anda untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 pt-6">
            {error && (
              <div className="flex items-center text-sm text-red-400 bg-red-950/30 p-3 rounded-lg border border-red-500/20 mb-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            {/* Button Siswa */}
            <Button 
              onClick={() => handleBypassLogin('siswa')} 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 h-14 text-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Masuk sebagai Siswa"}
            </Button>

            {/* Button Guru */}
            <Button 
              onClick={() => handleBypassLogin('guru')} 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 h-14 text-lg shadow-[0_0_15px_rgba(5,150,105,0.3)] transition-all hover:scale-[1.02]"
            >
              Masuk sebagai Guru
            </Button>

            {/* Button Admin */}
            <Button 
              onClick={() => handleBypassLogin('admin')} 
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white h-14 text-lg border border-white/10 transition-all hover:scale-[1.02]"
            >
              Masuk sebagai Admin
            </Button>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Mode Bypass: Login tanpa autentikasi Firebase.</p>
        </div>
      </div>
    </div>
  );
}