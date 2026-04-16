import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import AdminUsers from './AdminUsers';
import AdminClasses from './AdminClasses';
import AdminMajors from './AdminMajors';
import AdminAlumni from './AdminAlumni';

function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Admin</h2>
        <p className="text-slate-500">Ringkasan sistem informasi akademik hari ini.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-slate-500">+12% dari tahun lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-slate-500">2 guru baru bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-slate-500">12 kelas per angkatan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alumni Terdaftar</CardTitle>
            <Award className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,520</div>
            <p className="text-xs text-slate-500">+320 lulusan tahun ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aktivitas Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Guru Budi menginput nilai Matematika</p>
                    <p className="text-sm text-slate-500">Kelas XI-IPA-1</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-slate-500">
                    {i * 10} menit yang lalu
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Persetujuan Akun Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Siti Aminah</p>
                  <p className="text-sm text-slate-500">Guru Sejarah</p>
                </div>
                <Link to="/admin/users" className="text-sm text-blue-600 hover:underline">Review</Link>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Ahmad Fauzi</p>
                  <p className="text-sm text-slate-500">Siswa Pindahan</p>
                </div>
                <Link to="/admin/users" className="text-sm text-blue-600 hover:underline">Review</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<AdminOverview />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/classes" element={<AdminClasses />} />
      <Route path="/majors" element={<AdminMajors />} />
      <Route path="/alumni" element={<AdminAlumni />} />
      <Route path="/settings" element={<div className="p-4 bg-white rounded-lg shadow">Pengaturan (WIP)</div>} />
    </Routes>
  );
}
