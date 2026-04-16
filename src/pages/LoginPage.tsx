import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          SIAKAD SMA
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sistem Informasi Akademik Terintegrasi
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">Masuk ke Sistem</CardTitle>
            <CardDescription className="text-center">Pilih peran Anda untuk melanjutkan (Mode Bypass)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 pt-6">
            {error && (
              <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            <Button 
              onClick={() => handleBypassLogin('siswa')} 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
            >
              Masuk sebagai Siswa
            </Button>
            <Button 
              onClick={() => handleBypassLogin('guru')} 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
            >
              Masuk sebagai Guru
            </Button>
            <Button 
              onClick={() => handleBypassLogin('admin')} 
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg"
            >
              Masuk sebagai Admin
            </Button>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>Mode Bypass: Login tanpa autentikasi Firebase untuk keperluan testing.</p>
        </div>
      </div>
    </div>
  );
}
