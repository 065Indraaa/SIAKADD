import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Calendar, Users, Phone, ChevronRight } from 'lucide-react';
import Chatbot from '../components/Chatbot';

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">SIAKAD SMA</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="hidden sm:flex">Masuk</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">Portal Akademik</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/school/1920/1080?blur=4')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Sistem Informasi Akademik Terintegrasi
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Platform digital modern untuk mengelola data akademik, nilai, penjurusan, dan informasi sekolah secara real-time dan transparan.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Masuk ke Sistem <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-slate-50">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle>Kalender Akademik</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                <p>Tahun Ajaran Baru dimulai pada 15 Juli 2025. Ujian Tengah Semester dijadwalkan pada minggu kedua Oktober.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-slate-50">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Profil Sekolah</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                <p>Sekolah Menengah Atas Terintegrasi dengan akreditasi A. Mencetak generasi unggul berprestasi tingkat nasional.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-slate-50">
              <CardHeader>
                <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle>Kontak Admin</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                <p>Email: admin@sma-terintegrasi.sch.id<br/>Telp: (021) 555-0123<br/>Jam Operasional: 07:00 - 15:00 WIB</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 SIAKAD SMA Terintegrasi. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 flex items-center space-x-2"
      >
        <span className="hidden sm:inline font-medium">Tanya AI</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold">SIAKAD Assistant</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-blue-200">
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbot context="public" />
          </div>
        </div>
      )}
    </div>
  );
}
