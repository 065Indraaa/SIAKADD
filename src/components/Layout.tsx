import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award,
  Settings,
  Menu,
  X,
  MessageSquare,
  Zap,
  Globe,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Chatbot from './Chatbot';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getNavigation = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Panel Utama', href: '/admin', icon: LayoutDashboard },
        { name: 'Pengguna', href: '/admin/users', icon: Users },
        { name: 'Kelas', href: '/admin/classes', icon: BookOpen },
        { name: 'Jadwal', href: '/admin/schedules', icon: BookOpen },
        { name: 'Penjurusan', href: '/admin/majors', icon: GraduationCap },
        { name: 'Alumni', href: '/admin/alumni', icon: Award },
        { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
      ];
    }
    if (user?.role === 'guru') {
      return [
        { name: 'Panel Utama', href: '/guru', icon: LayoutDashboard },
        { name: 'Input Nilai', href: '/guru/grades', icon: BookOpen },
        { name: 'Prestasi', href: '/guru/achievements', icon: Award },
        { name: 'Siswa', href: '/guru/students', icon: Users },
      ];
    }
    if (user?.role === 'siswa') {
      return [
        { name: 'Panel Utama', href: '/siswa', icon: LayoutDashboard },
        { name: 'Profil Saya', href: '/siswa/profile', icon: Users },
        { name: 'Nilai & Rapor', href: '/siswa/grades', icon: BookOpen },
        { name: 'Jadwal Peserta', href: '/siswa/schedule', icon: Calendar },
        { name: 'Pencapaian', href: '/siswa/achievements', icon: Award },
      ];
    }
    return [];
  };

  const Calendar = LayoutDashboard; // Fallback if not imported correctly, though I added it to imports logic in my mind. Wait.
  // Actually I'll use the icons already available.
  
  const navigation = getNavigation();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-slate-900 border-r border-white/5 shadow-2xl flex flex-col animate-in slide-in-from-left duration-500">
            <div className="flex h-20 items-center justify-between px-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white fill-white" />
                </div>
                <h1 className="text-xl font-black tracking-tighter text-white italic">SIAKAD<span className="text-blue-500">PRO</span></h1>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
              {/* User Info Mobile */}
              <div className="flex items-center gap-4 px-2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/20">
                  {user?.name?.[0]}
                </div>
                <div>
                  <p className="font-black text-white leading-none mb-1">{user?.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">{user?.role}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center rounded-2xl px-4 py-4 text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-blue-600 shadow-xl shadow-blue-600/20 text-white translate-x-2' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 border-t border-white/5">
              <Button 
                variant="ghost" 
                className="w-full justify-start h-14 rounded-2xl text-slate-400 hover:text-white hover:bg-red-500/10 font-bold group" 
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:animate-pulse" />
                Selesaikan Sesi
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden md:flex w-72 flex-col bg-slate-900/50 border-r border-white/5 backdrop-blur-3xl">
        <div className="flex h-24 items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white italic leading-none">SIAKAD<span className="text-blue-500">PRO</span></h1>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-500 mt-1">SCOLA</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-8">
          <nav className="flex-1 space-y-2 px-4 shadow-inner">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center rounded-2xl px-4 py-4 text-sm font-bold transition-all relative overflow-hidden ${
                    isActive 
                      ? 'bg-blue-600 shadow-xl shadow-blue-600/20 text-white' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {isActive && <div className="absolute left-0 w-1 h-6 bg-white rounded-full ml-1" />}
                  <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-blue-400'}`} aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bg-slate-900/80 border-t border-white/5 p-6 space-y-4">
          <div className="flex items-center gap-4 px-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-black text-blue-500 shadow-xl">
              {user?.name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white truncate leading-none mb-1">{user?.name}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start h-12 rounded-xl text-slate-500 hover:text-white hover:bg-red-500/10 font-bold transition-all" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4 text-red-500 opacity-50" />
            Keluar Sesi
          </Button>
        </div>
      </div>

      {/* --- VIEWPORT --- */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
        
        <header className="flex h-20 items-center justify-between border-b border-white/5 bg-slate-950/20 backdrop-blur-2xl px-6 sm:px-8 z-20">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90 md:block hidden" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* The line above is actually for tablets, for phones see below */}
            <button
              type="button"
              className="md:hidden p-2 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="hidden sm:flex flex-col">
               <h2 className="text-sm font-black text-white leading-none italic uppercase tracking-tighter">SIAKAD<span className="text-blue-500">PRO</span></h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">SIAKADPRO</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white border border-transparent hover:border-white/5 transition-all">
                 <Bell className="h-5 w-5" />
              </button>
              <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white border border-transparent hover:border-white/5 transition-all">
                 <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-transparent relative z-10 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* --- CHATBOT --- */}
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4 pointer-events-none">
        {isChatOpen && (
          <div className="w-[380px] h-[550px] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 pointer-events-auto">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                   <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                   <h3 className="font-black text-lg tracking-tight leading-none italic">SCOLA AI</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Asisten Virtual</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="h-10 w-10 rounded-2xl hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot context={user?.role || 'public'} />
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="h-16 w-16 bg-blue-600 text-white rounded-2xl shadow-[0_15px_40px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all pointer-events-auto flex items-center justify-center group"
        >
          {isChatOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7 group-hover:animate-bounce" />}
        </button>
      </div>
    </div>
  );
}