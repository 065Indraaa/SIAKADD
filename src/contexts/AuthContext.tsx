import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

type Role = 'admin' | 'guru' | 'siswa' | null;

interface UserData {
  uid: string;
  email: string | null;
  role: Role;
  name: string;
  status_akun: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (role: Role) => Promise<Role | void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bypass Firebase for now, use mock auth
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (role: Role): Promise<Role | void> => {
    // Bypass Firebase, force mock login
    const mockUser: UserData = {
      uid: `mock-${role}-123`,
      email: `${role}@demo.com`,
      role,
      name: `Demo ${role?.charAt(0).toUpperCase()}${role?.slice(1)}`,
      status_akun: 'aktif'
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return role;
  };

  const logout = async () => {
    // Bypass Firebase, force mock logout
    localStorage.removeItem('mock_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
