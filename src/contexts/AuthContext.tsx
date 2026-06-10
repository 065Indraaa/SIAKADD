import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPenggunaByEmail, getGuruByPengguna, getGuru, getSiswaByPengguna, getSiswa } from '@uassiakad/connector';
import { dataConnect } from '../lib/userService';

type Role = 'admin' | 'guru' | 'siswa' | null;

interface UserData {
  uid: string;
  email: string | null;
  role: Role;
  name: string;
  penggunaId?: string;
  guruId?: string;
  siswaId?: string;
  nip?: string;
  nis?: string;
  jabatan?: string;
  specialization?: string;
  className?: string;
  kelasId?: string;
  peminatanId?: string;
  peminatanName?: string;
  jurusanId?: string;
  jurusanName?: string;
  phone?: string;
  address?: string;
  birthPlace?: string;
  birthDate?: string;
  gender?: string;
  tahunMasuk?: number;
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

  const enrichRoleData = async (baseUser: UserData): Promise<UserData> => {
    if (!baseUser.penggunaId && !baseUser.uid) return baseUser;
    const penggunaId = baseUser.penggunaId || baseUser.uid;

    try {
      if (baseUser.role === 'guru') {
        const guruLookup = await getGuruByPengguna(dataConnect, { penggunaId });
        const guruId = guruLookup.data.gurus[0]?.id;
        if (!guruId) return baseUser;

        const guruRes = await getGuru(dataConnect, { id: guruId });
        const g = guruRes.data.guru;
        if (!g) return baseUser;

        return {
          ...baseUser,
          guruId: g.id,
          nip: g.nip,
          jabatan: g.jabatan,
          specialization: g.spesialisasi || undefined,
          gender: g.jenisKelamin,
          birthPlace: g.tempatLahir || undefined,
          birthDate: g.tanggalLahir ? String(g.tanggalLahir) : undefined,
        };
      }

      if (baseUser.role === 'siswa') {
        const siswaLookup = await getSiswaByPengguna(dataConnect, { penggunaId });
        const siswaId = siswaLookup.data.siswas[0]?.id;
        if (!siswaId) return baseUser;

        const siswaRes = await getSiswa(dataConnect, { id: siswaId });
        const s = siswaRes.data.siswa;
        if (!s) return baseUser;

        return {
          ...baseUser,
          siswaId: s.id,
          nis: s.nis,
          gender: s.jenisKelamin,
          birthPlace: s.tempatLahir || undefined,
          birthDate: s.tanggalLahir ? String(s.tanggalLahir) : undefined,
          address: s.alamat || baseUser.address,
          className: s.kelas?.nama || undefined,
          kelasId: s.kelas?.id || undefined,
          jurusanId: (s as any).jurusan?.id || undefined,
          jurusanName: (s as any).jurusan?.nama || undefined,
          peminatanId: (s as any).peminatan?.id || undefined,
          peminatanName: (s as any).peminatan?.nama || undefined,
          tahunMasuk: s.tahunMasuk ?? undefined,
        };
      }
    } catch (e) {
      console.error('Gagal menyegarkan data peran:', e);
    }

    return baseUser;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('siakad_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as UserData;
        setUser(parsed);
        enrichRoleData(parsed).then((freshUser) => {
          localStorage.setItem('siakad_user', JSON.stringify(freshUser));
          setUser(freshUser);
        });
      } catch {
        localStorage.removeItem('siakad_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (role: Role): Promise<Role | void> => {
    const mockUser: UserData = {
      uid: `demo-${role}-${Date.now()}`,
      email: `${role}@demo.com`,
      role,
      name: `Demo ${role?.charAt(0).toUpperCase()}${role?.slice(1)}`,
    };
    localStorage.setItem('siakad_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return role;
  };

  const loginByEmail = async (email: string, password?: string): Promise<Role | void> => {
    // 1. Find pengguna by email (single query returns password too)
    // Gunakan executeQuery dengan SERVER_ONLY agar tidak memakai cache (menghindari bug login setelah daftar)
    const { executeQuery } = await import('firebase/data-connect');
    const { getPenggunaByEmailRef } = await import('@uassiakad/connector');
    
    const queryRef = getPenggunaByEmailRef(dataConnect, { email: email.trim().toLowerCase() });
    const res = await executeQuery(queryRef, { fetchPolicy: 'SERVER_ONLY' });
    const penggunas = res.data.penggunas;

    if (!penggunas || penggunas.length === 0) {
      // Try original case as fallback
      const fallbackRef = getPenggunaByEmailRef(dataConnect, { email });
      const fallback = await executeQuery(fallbackRef, { fetchPolicy: 'SERVER_ONLY' });
      if (!fallback.data.penggunas || fallback.data.penggunas.length === 0) {
        throw new Error('Email tidak terdaftar dalam sistem.');
      }
      penggunas.push(...fallback.data.penggunas);
    }

    const pengguna: any = penggunas[0];
    const storedPassword = pengguna.password;

    // 2. Verify password
    if (!password) throw new Error('Password wajib diisi.');
    if (storedPassword && storedPassword !== password) {
      throw new Error('Password salah.');
    }

    const role = pengguna.peran as Role;
    const penggunaId = pengguna.id;

    // 3. Build base user data
    let userData: UserData = {
      uid: penggunaId,
      email: pengguna.email,
      role,
      name: pengguna.nama,
      penggunaId,
      phone: pengguna.telepon || undefined,
      address: pengguna.alamat || undefined,
    };

    // 4. Fetch role-specific data
    userData = await enrichRoleData(userData);

    // 5. Persist
    localStorage.setItem('siakad_user', JSON.stringify(userData));
    setUser(userData);
    return role;
  };

  const logout = async () => {
    localStorage.removeItem('siakad_user');
    setUser(null);
  };

  const updateUserCache = (data: Partial<UserData>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('siakad_user', JSON.stringify(updated));
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
