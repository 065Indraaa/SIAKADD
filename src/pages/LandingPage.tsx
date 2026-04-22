import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, ChevronRight, Shield, Zap, Globe, Users, BookOpen, Award, Target, Briefcase, Building2, Star } from 'lucide-react';
import Chatbot from '../components/Chatbot';

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center group cursor-pointer">
              <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-black tracking-tighter font-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">SMK ASOLOLE</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-xs font-black uppercase tracking-widest text-slate-500">
              <a href="#profil" className="hover:text-blue-400 transition-colors">Profil</a>
              <a href="#jurusan" className="hover:text-blue-400 transition-colors">Kompetensi</a>
              <a href="#alumni" className="hover:text-blue-400 transition-colors">Lulusan</a>
              <a href="#fasilitas" className="hover:text-blue-400 transition-colors">Fasilitas</a>
            </div>
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 shadow-lg shadow-blue-600/20 active:scale-95 transition-all font-bold">
                Portal Akademik
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold uppercase tracking-widest border border-blue-500/20 rounded-full bg-blue-500/5 text-blue-400 backdrop-blur-sm animate-fade-in">
            Pusat Keunggulan Vokasi Digital
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter font-heading mb-8 leading-[0.8] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 italic">
            MENCETAK<br />ELITE DIGITAL
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            SMK ASOLOLE hadir untuk membentuk teknokrat masa depan yang siap tempur di industri global dengan skil teknis mumpuni dan integritas tinggi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px]">ST</div>)}
              </div>
              <span>+2,500 Alumni Terserap Industri</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile & Vision */}
      <section id="profil" className="py-32 relative bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block p-3 bg-blue-600/10 rounded-2xl">
                <Target className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-5xl font-black text-white font-heading italic tracking-tighter">Visi Kami</h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                "Menjadi institusi pendidikan vokasi terdepan di Asia yang menghasilkan inovator digital dengan karakter disiplin, kreatif, dan mandiri pada tahun 2030."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <h4 className="text-blue-400 font-black mb-2 uppercase tracking-widest text-xs">Kurikulum</h4>
                  <p className="text-slate-400 text-sm">Berbasis industri (Link & Match) dengan perusahaan teknologi top.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <h4 className="text-blue-400 font-black mb-2 uppercase tracking-widest text-xs">Karakter</h4>
                  <p className="text-slate-400 text-sm">Penguatan mentalitas juara dan etika profesional dalam setiap aspek.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-[3rem] border border-white/10 p-8 shadow-3xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"></div>
                <Building2 className="h-40 w-40 text-blue-500/50 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-slate-900/90 rounded-2xl border border-white/10 backdrop-blur-xl">
                  <p className="text-blue-400 font-black text-2xl tracking-tighter">Akreditasi A+</p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Sertifikasi Internasional BNSP & Oracle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs / Jurusan */}
      <section id="jurusan" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-white font-heading italic tracking-tighter">Kompetensi Keahlian</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Jurusan unggulan dengan fasilitas laboratorium standar industri modern.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Rekayasa Perangkat Lunak", desc: "Mempelajari pengembangan backend, mobile apps, dan AI engineering.", tags: ["Python", "Cloud", "DevOps"] },
              { icon: Globe, title: "TKJ & Cyber Security", desc: "Fokus pada infrastruktur jaringan server, keamanan data, dan cloud computing.", tags: ["Cisco", "Linux", "Security"] },
              { icon: Award, title: "Multimedia & Visual", desc: "Mencetak kreator konten, animator, dan UI/UX designer profesional.", tags: ["3D Design", "VFX", "UI/UX"] }
            ].map((item, idx) => (
              <Card key={idx} className="bg-slate-950 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group overflow-hidden rounded-[2.5rem]">
                <CardContent className="p-10 space-y-6">
                  <div className="h-16 w-16 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white italic tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(t => <Badge key={t} className="bg-white/5 border-white/5 text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni / Graduates */}
      <section id="alumni" className="py-32 relative bg-slate-900/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-950 font-black">AI</div>
              <h2 className="text-4xl font-black text-white font-heading italic tracking-tighter">Jejaring Alumni</h2>
              <p className="text-slate-400 font-medium">98% lulusan kami langsung terserap di dunia kerja atau melanjutkan ke perguruan tinggi ternama.</p>
              <Button variant="outline" className="border-white/10 text-white rounded-xl h-12 hover:bg-white/5">Lihat Success Story</Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "Budi Santoso", pos: "Software Engineer @ Google", msg: "SMK Asolole memberikan fondasi logika yang kuat dan disiplin industri." },
                { name: "Siti Aminah", pos: "UI Designer @ Tokopedia", msg: "Peralatan lab yang canggih sangat membantu saya mengeksplorasi kreativitas." }
              ].map((a, i) => (
                <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
                  </div>
                  <p className="text-slate-300 italic font-medium">"{a.msg}"</p>
                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-600/20 rounded-full"></div>
                    <div>
                      <p className="text-white font-black text-sm">{a.name}</p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{a.pos}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="fasilitas" className="py-32 relative max-w-7xl mx-auto px-4">
        <div className="rounded-[3rem] bg-blue-600 p-12 lg:p-20 relative overflow-hidden group shadow-3xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-slate-950 font-heading italic tracking-tighter">Fasilitas Modern</h2>
              <p className="text-blue-950 text-xl font-medium">Lingkungan belajar yang inspiratif dengan infrastruktur kelas dunia.</p>
              <ul className="space-y-4">
                {[
                  "Laboratorium iMac & PC High-End",
                  "Perpustakaan Digital Terintegrasi",
                  "Studio Podcast & Produksi Film",
                  "Gedung Olahraga & Auditorium Modern"
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-blue-950 font-bold">
                    <CheckCircle className="h-5 w-5 bg-white text-blue-600 rounded-full p-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="aspect-video bg-blue-700/50 border border-white/20 rounded-2xl flex items-center justify-center font-black text-white/20">PREVIEW</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center group cursor-pointer w-fit">
                <div className="p-2 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-2xl font-black tracking-tighter text-white">SMK ASOLOLE</span>
              </div>
              <p className="text-slate-500 max-w-sm font-medium">
                Jl. Asolole No. 69, Kota Pendidikan, Indonesia.<br />
                Email: info@smkasolole.sch.id<br />
                Telp: (021) 1234-5678
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Tautan Cepat</h4>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400">Pendaftaran Siswa</a></li>
                <li><a href="#" className="hover:text-blue-400">Kurikulum Sekolah</a></li>
                <li><a href="#" className="hover:text-blue-400">Lowongan Alumni</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Media Sosial</h4>
              <div className="flex gap-4">
                {[Globe, Shield, Zap].map((Icon, i) => <div key={i} className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-slate-400 hover:text-white"><Icon className="h-5 w-5" /></div>)}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <p>&copy; 2026 SMK ASOLOLE. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-10 right-10 p-5 bg-blue-600 text-white rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all duration-300 z-50 group hover:-translate-y-2 active:scale-95"
      >
        <div className="flex items-center gap-3">
          <span className="hidden group-hover:inline font-bold animate-in slide-in-from-right-10 duration-300">Tanya Admin</span>
          <Briefcase className="h-6 w-6" />
        </div>
      </button>

      {isChatOpen && (
        <div className="fixed bottom-32 right-10 w-96 max-w-[calc(100vw-40px)] h-[600px] bg-slate-900 border border-white/10 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-blue-600 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              <h3 className="font-bold text-white tracking-tight">Asolole Helpdesk AI</h3>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white text-2xl hover:scale-110 transition-transform">&times;</button>
          </div>
          <div className="flex-1 overflow-hidden p-2">
            <Chatbot context="public" />
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}