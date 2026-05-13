import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import GuruDashboard from './pages/guru/GuruDashboard';
import SiswaDashboard from './pages/siswa/SiswaDashboard';
import Layout from './components/Layout';
import { useTimeTheme } from './hooks/useTimeTheme';

// ✅ ProtectedRoute di luar App, bukan di dalamnya
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Memuat...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role || '')) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

// ✅ Hanya satu export default App
export default function App() {
  useTimeTheme(); // ← tema otomatis berdasarkan waktu

  return (
<<<<<<< HEAD
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/guru/*" element={
            <ProtectedRoute allowedRoles={['guru']}>
              <GuruDashboard />
            </ProtectedRoute>
          } />

          <Route path="/siswa/*" element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <SiswaDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
=======
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Guru Routes */}
              <Route path="/guru/*" element={
                <ProtectedRoute allowedRoles={['guru']}>
                  <GuruDashboard />
                </ProtectedRoute>
              } />

              {/* Siswa Routes */}
              <Route path="/siswa/*" element={
                <ProtectedRoute allowedRoles={['siswa']}>
                  <SiswaDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
>>>>>>> 75ba1c482785795b5c0a639ee927110c79e258f9
  );
}