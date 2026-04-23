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
  peminatanId?: string;
  peminatanName?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (role: Role) => Promise<Role | void>;
  loginByEmail: (email: string, password?: string) => Promise<Role | void>;
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
    const mockUser: UserData = {
      uid: `mock-${role}-123`,
      email: `${role}@demo.com`,
      role,
      name: `Demo ${role?.charAt(0).toUpperCase()}${role?.slice(1)}`,
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return role;
  };

  const loginByEmail = async (email: string, password?: string): Promise<Role | void> => {
    // For demo: identify role from email
    let role: Role = null;
    const lowerEmail = email.toLowerCase();
    
    if (lowerEmail.includes('admin')) role = 'admin';
    else if (lowerEmail.includes('guru')) role = 'guru';
    else if (lowerEmail.includes('siswa')) role = 'siswa';
    else role = 'siswa'; // Default fallback

    const mockUser: UserData = {
      uid: `user-${Date.now()}`,
      email,
      role,
      name: email.split('@')[0].split('.')[0],
    };
    
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return role;
  };

  const logout = async () => {
    localStorage.removeItem('mock_user');
    setUser(null);
  };

  const updateUserCache = (data: Partial<UserData>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('mock_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginByEmail, logout, updateUserCache }}>
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
