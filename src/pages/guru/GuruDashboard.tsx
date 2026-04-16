import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Award, CheckCircle } from 'lucide-react';
import GuruGrades from './GuruGrades';
import GuruAchievements from './GuruAchievements';
import GuruStudents from './GuruStudents';

function GuruOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Guru</h2>
        <p className="text-slate-500">Selamat datang kembali. Berikut ringkasan kelas Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kelas Diajar</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-slate-500">Matematika Wajib</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-slate-500">Di 4 kelas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Diinput</CardTitle>
            <CheckCircle className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-slate-500">UTS Semester Ganjil</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestasi Dicatat</CardTitle>
            <Award className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-500">Semester ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Jadwal Mengajar Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-l-4 border-blue-600 bg-slate-50 rounded-r-lg">
                <div>
                  <p className="font-bold text-slate-900">07:00 - 08:30</p>
                  <p className="text-sm font-medium">Matematika Wajib</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">XI-IPA-1</p>
                  <p className="text-sm text-slate-500">Ruang 204</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-l-4 border-green-600 bg-slate-50 rounded-r-lg">
                <div>
                  <p className="font-bold text-slate-900">09:00 - 10:30</p>
                  <p className="text-sm font-medium">Matematika Wajib</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">XI-IPA-2</p>
                  <p className="text-sm text-slate-500">Ruang 205</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Tugas Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg border-orange-200 bg-orange-50">
                <div>
                  <p className="font-medium text-orange-900">Input Nilai UTS</p>
                  <p className="text-sm text-orange-700">Kelas XI-IPS-1 belum selesai</p>
                </div>
                <Link to="/guru/grades" className="text-sm font-medium text-orange-700 hover:underline">Input</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GuruDashboard() {
  return (
    <Routes>
      <Route path="/" element={<GuruOverview />} />
      <Route path="/grades" element={<GuruGrades />} />
      <Route path="/achievements" element={<GuruAchievements />} />
      <Route path="/students" element={<GuruStudents />} />
    </Routes>
  );
}
