import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import {
  LogOut, LayoutDashboard, Users, GraduationCap, BookOpen,
  Award, Settings, Menu, X, MessageSquare, Calendar,
  ChevronRight, Zap, Book, MoveRight, Sun, Moon
} from 'lucide-react';
import Chatbot from './Chatbot';
import NotificationBell from './NotificationBell';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, add: addNotif } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  // Welcome notification on first login of session
  useEffect(() => {
    if (!user) return;
    const sessionKey = `scola_welcome_${user.uid}`;
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, '1');
      addNotif({
        type: 'success',
        kind: 'system',
        title: `Selamat datang, ${user.name}!`,
        body: `Anda berhasil masuk sebagai ${user.role === 'admin' ? 'Administrator' : user.role === 'guru' ? 'Guru' : 'Siswa'}. Semoga harimu menyenangkan.`,
      });
    }
  }, [user, addNotif]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getNavigation = () => {
    if (user?.role === 'admin') return [
      { label: 'Beranda', href: '/admin', icon: LayoutDashboard },
      { label: 'Pengguna', href: '/admin/users', icon: Users },
      { label: 'Kelas', href: '/admin/classes', icon: BookOpen },
      { label: 'Mata Pelajaran', href: '/admin/subjects', icon: Book },
      { label: 'Jadwal', href: '/admin/schedules', icon: Calendar },
      { label: 'Jurusan', href: '/admin/majors', icon: Award },
      { label: 'Penjuruan', href: '/admin/penjuruan', icon: MoveRight },
      { label: 'Alumni', href: '/admin/alumni', icon: GraduationCap },
      { label: 'Pengaturan', href: '/admin/settings', icon: Settings },
    ];
    if (user?.role === 'guru') return [
      { label: 'Beranda', href: '/guru', icon: LayoutDashboard },
      { label: 'Input Nilai', href: '/guru/grades', icon: BookOpen },
      { label: 'Prestasi', href: '/guru/achievements', icon: Award },
      { label: 'Data Murid', href: '/guru/students', icon: Users },
    ];
    if (user?.role === 'siswa') return [
      { label: 'Beranda', href: '/siswa', icon: LayoutDashboard },
      { label: 'Profil Saya', href: '/siswa/profile', icon: Users },
      { label: 'Nilai & Rapor', href: '/siswa/grades', icon: BookOpen },
      { label: 'Jadwal', href: '/siswa/schedule', icon: Calendar },
      { label: 'Pencapaian', href: '/siswa/achievements', icon: Award },
    ];
    return [];
  };

  const navigation = getNavigation();

  const roleColors: Record<string, string> = {
    admin: 'bg-violet-500/15 text-violet-400',
    guru: 'bg-emerald-500/15 text-emerald-400',
    siswa: 'bg-blue-500/15 text-blue-400',
  };

  const roleLabel: Record<string, string> = {
    admin: 'Administrator',
    guru: 'Pengajar',
    siswa: 'Siswa',
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sidebar-foreground font-bold text-base leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            SCOLA
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5 font-medium leading-none">SMAIT Nur Hidayah</div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sidebar-foreground text-sm font-semibold leading-tight truncate">{user?.name}</p>
            <span className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleColors[user?.role || ''] || 'bg-slate-500/15 text-slate-400'}`}>
              {roleLabel[user?.role || ''] || user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="section-label px-3 mb-3">Navigasi</p>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`scola-nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/8 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Mobile Overlay ─────────────────────────────────── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 scola-sidebar shadow-2xl animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden md:flex w-60 flex-col scola-sidebar flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Main Area ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-background/90 backdrop-blur-xl flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden w-8 h-8 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">
                {user?.role === 'admin' ? 'Panel Administrator' : user?.role === 'guru' ? 'Panel Pengajar' : 'Portal Siswa'}
              </p>
              <p className="text-[11px] text-muted-foreground">SMAIT Nur Hidayah Sukoharjo — T.A. 2024/2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="w-8 h-8 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              aria-label="Ubah tema">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <NotificationBell />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ── Chatbot FAB ───────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-[380px] h-[560px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-border bg-card animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">SCOLA AI</p>
                  <p className="text-[10px] text-white/70 mt-0.5">Asisten Virtual</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot context={user?.role || 'public'} />
            </div>
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          {isChatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
