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
import { currentTahunAjaran, currentSemester } from '../lib/tahunAjaran';

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
      { label: 'Pengisian Nilai', href: '/guru/grades', icon: BookOpen },
      { label: 'Prestasi', href: '/guru/achievements', icon: Award },
      { label: 'Data Murid', href: '/guru/students', icon: Users },
    ];
    if (user?.role === 'siswa') return [
      { label: 'Beranda', href: '/siswa', icon: LayoutDashboard },
      { label: 'Profil Saya', href: '/siswa/profile', icon: Users },
      { label: 'Nilai & Rapor', href: '/siswa/grades', icon: BookOpen },
      { label: 'Jadwal', href: '/siswa/schedule', icon: Calendar },
      { label: 'Pencapaian', href: '/siswa/achievements', icon: Award },
      { label: 'Jejak Alumni', href: '/siswa/alumni', icon: GraduationCap },
    ];
    return [];
  };

  const navigation = getNavigation();

  const roleColors: Record<string, string> = {
    admin: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
    guru: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    siswa: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
  };

  const roleLabel: Record<string, string> = {
    admin: 'Administrator',
    guru: 'Guru',
    siswa: 'Siswa',
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/30">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sidebar-foreground font-bold text-base leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            SCOLA
          </div>
          <div className="mt-0.5 text-[10px] font-medium leading-none text-muted-foreground">SMAIT Nur Hidayah</div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sidebar-foreground text-sm font-semibold leading-tight truncate">{user?.name}</p>
            <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${roleColors[user?.role || ''] || 'bg-slate-500/15 text-slate-700 dark:text-slate-300'}`}>
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
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-red-500/8 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Mobile Overlay ─────────────────────────────────── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
           <div className="scola-sidebar absolute inset-y-0 left-0 w-[min(18rem,85vw)] animate-in shadow-2xl slide-in-from-left duration-300">
            <button
              onClick={() => setIsMobileOpen(false)}
               className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
        <aside className="scola-sidebar hidden w-60 flex-shrink-0 flex-col md:flex">
        <SidebarContent />
      </aside>

      {/* ── Main Area ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="z-20 flex h-16 flex-shrink-0 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:h-14 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.role === 'admin' ? 'Panel Administrator' : user?.role === 'guru' ? 'Panel Guru' : 'Portal Siswa'}
              </p>
              <p className="hidden truncate text-[11px] text-muted-foreground sm:block">SMAIT Nur Hidayah Sukoharjo · Tahun Ajaran {currentTahunAjaran()} · Semester {currentSemester()}</p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <button onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              aria-label="Ubah tema">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <NotificationBell />
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="scola-portal flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ── Tombol asisten ───────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {isChatOpen && (
          <div className="flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] animate-in flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">Asisten SCOLA</p>
                  <p className="text-[10px] text-white/70 mt-0.5">Asisten Virtual</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white/20" aria-label="Tutup asisten">
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
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-blue-500 active:scale-95"
          aria-label="Buka asisten"
        >
          {isChatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
