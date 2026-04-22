import React, { createContext, useContext, useEffect, useState } from 'react';

type Role = 'admin' | 'guru' | 'siswa' | null;

interface UserData {
  uid: string;
  email: string | null;
  role: Role;
  name: string;
  // ID tabel Data Connect spesifik (untuk query)
  penggunaId?: string;   // ID di tabel pengguna
  guruId?: string;       // ID di tabel guru (jika role = guru)
  siswaId?: string;      // ID di tabel siswa (jika role = siswa)
  nip?: string;
  nis?: string;
  jabatan?: string;
  specialization?: string;
  className?: string;
  kelasId?: string;
  nisn?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (role: Role) => Promise<Role | void>;
  logout: () => Promise<void>;
  updateUserCache: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('mock_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (role: Role): Promise<Role | void> => {
    // Mock login — akan diganti Firebase Auth di fase berikutnya
    // guruId/siswaId diset kosong; akan diisi oleh fetchGuru/fetchSiswa ketika
    // pengguna berhasil ditemukan di Data Connect berdasarkan email
    const mockUser: UserData = {
      uid: `mock-${role}-123`,
      email: `${role}@demo.com`,
      role,
      name: `Demo ${role?.charAt(0).toUpperCase()}${role?.slice(1)}`,
      penggunaId: undefined,
      guruId: undefined,
      siswaId: undefined,
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return role;
  };

  const logout = async () => {
    localStorage.removeItem('mock_user');
    setUser(null);
  };

  // Memungkinkan komponen menyimpan guruId/siswaId setelah fetch berhasil
  const updateUserCache = (data: Partial<UserData>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('mock_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUserCache }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};
