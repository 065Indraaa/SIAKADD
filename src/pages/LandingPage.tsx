import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Calendar, Users, Phone, ChevronRight } from 'lucide-react';
import Chatbot from '../components/Chatbot';

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* Header - Glassmorphism */}
      <header className="fixed w-full top-0 z-40 bg-slate-950/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="ml-2 text-xl font-bold tracking-wider">SCOLA</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="hover:text-blue-400">Masuk</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300">
                  Portal Akademik
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Futuristic Gradient & Grid */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.3),_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative z-10 text-center px-4">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium border border-blue-500/30 rounded-full bg-blue-950/30 text-blue-300 backdrop-blur-sm">
            Tersedia untuk tahun ajaran 2025/2026
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Sistem Akademik<br />Terintegrasi
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform digital modern untuk mengelola data akademik secara real-time dengan presisi tinggi.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-slate-950 hover:bg-blue-50 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Mulai Eksplorasi <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section - Glassmorphism Cards */}
      <section className="py-20 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "Kalender", desc: "Jadwal terorganisir dengan sinkronisasi otomatis." },
              { icon: Users, title: "Profil Sekolah", desc: "Data prestasi dan profil sekolah transparan." },
              { icon: Phone, title: "Pusat Bantuan", desc: "Layanan admin cepat 07:00 - 15:00 WIB." }
            ].map((item, idx) => (
              <Card key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950 text-slate-500 text-center">
        <p>&copy; 2025 SCOLA. All rights reserved.</p>
      </footer>

      {/* Floating Chatbot Button - Pulsing effect */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-all duration-300 z-50 flex items-center space-x-2 animate-pulse-slow"
      >
        <span className="font-medium">AI Assistant</span>
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col">
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <h3 className="font-semibold text-white">SIAKAD Assistant</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-blue-200">
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-hidden p-2">
            <Chatbot context="public" />
          </div>
        </div>
      )}
    </div>
  );
}