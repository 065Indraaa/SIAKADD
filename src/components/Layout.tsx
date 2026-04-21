import React from 'react';
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
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Chatbot from './Chatbot';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getNavigation = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Manajemen Pengguna', href: '/admin/users', icon: Users },
        { name: 'Manajemen Kelas', href: '/admin/classes', icon: BookOpen },
        { name: 'Jadwal Pelajaran', href: '/admin/schedules', icon: BookOpen },
        { name: 'Penjurusan', href: '/admin/majors', icon: GraduationCap },
        { name: 'Alumni', href: '/admin/alumni', icon: Award },
        { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
      ];
    }
    if (user?.role === 'guru') {
      return [
        { name: 'Dashboard', href: '/guru', icon: LayoutDashboard },
        { name: 'Input Nilai', href: '/guru/grades', icon: BookOpen },
        { name: 'Prestasi Siswa', href: '/guru/achievements', icon: Award },
        { name: 'Data Siswa', href: '/guru/students', icon: Users },
      ];
    }
    if (user?.role === 'siswa') {
      return [
        { name: 'Dashboard', href: '/siswa', icon: LayoutDashboard },
        { name: 'Profil Saya', href: '/siswa/profile', icon: Users },
        { name: 'Nilai & Rapor', href: '/siswa/grades', icon: BookOpen },
        { name: 'Jadwal', href: '/siswa/schedule', icon: LayoutDashboard },
        { name: 'Prestasi', href: '/siswa/achievements', icon: Award },
      ];
    }
    return [];
  };

  const navigation = getNavigation();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex w-64 flex-col bg-slate-950 border-r border-white/10">
        <div className="flex h-16 items-center justify-center border-b border-white/10 px-4">
          <h1 className="text-xl font-bold tracking-tight text-white">SIAKAD SMA</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all ${
                    isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-white/10 p-4">
          <div className="mb-4">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-red-900/20" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/50 backdrop-blur-md px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-slate-400 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-auto text-sm font-medium text-slate-400">
            Tahun Ajaran 2024/2025
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Floating Chatbot */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold">SCOLA Assistant</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-blue-200">
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbot context={user?.role || 'public'} />
          </div>
        </div>
      )}
    </div>
  );
}