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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex w-64 flex-col bg-slate-900 text-white">
        <div className="flex h-16 items-center justify-center border-b border-slate-800 px-4">
          <h1 className="text-xl font-bold tracking-tight">SIAKAD SMA</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center mb-4">
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs font-medium text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-slate-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-900 text-white pt-5 pb-4">
            <div className="flex items-center px-4">
              <h1 className="text-xl font-bold">SIAKAD SMA</h1>
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="space-y-1 px-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${
                        isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="mr-4 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="border-t border-slate-800 p-4">
              <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-slate-500 hover:text-slate-700 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-sm font-medium text-slate-700 mr-4 hidden sm:block">
                Tahun Ajaran 2024/2025
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageSquare className="h-6 w-6" />
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
            <Chatbot context={user?.role || 'public'} />
          </div>
        </div>
      )}
    </div>
  );
}
