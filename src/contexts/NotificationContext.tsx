import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationKind = 'system' | 'pengumuman' | 'akademik' | 'jadwal';
export type TargetRole = 'admin' | 'guru' | 'siswa';

export interface AppNotification {
  id: string;
  type: NotificationType;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  linkTo?: string;
  /**
   * Role yang boleh melihat notifikasi ini.
   * Jika kosong, default hanya role user saat notifikasi dibuat.
   */
  targetRoles?: TargetRole[];
  /** UID pengguna pembuat notifikasi (untuk audit). */
  ownerUid?: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  add: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read' | 'ownerUid'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  remove: (id: string) => void;
  clear: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const LEGACY_KEY = 'scola_notifications';
const STORAGE_PREFIX = 'scola_notifications_';
const MAX_NOTIFICATIONS = 50;

function storageKeyFor(uid?: string | null) {
  return uid ? `${STORAGE_PREFIX}${uid}` : null;
}

function loadFromStorage(uid?: string | null): AppNotification[] {
  if (typeof window === 'undefined') return [];
  const key = storageKeyFor(uid);
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Migrasi: hapus storage legacy yang di-share lintas role (sekali saja).
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(LEGACY_KEY) !== null) {
      localStorage.removeItem(LEGACY_KEY);
    }
  }, []);

  // Saat user berubah (login / logout / switch role) -> load dari storage user tsb.
  useEffect(() => {
    setNotifications(loadFromStorage(user?.uid));
  }, [user?.uid]);

  // Persist tiap perubahan ke storage user saat ini.
  useEffect(() => {
    const key = storageKeyFor(user?.uid);
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(notifications));
  }, [notifications, user?.uid]);

  const add = useCallback((n: Omit<AppNotification, 'id' | 'createdAt' | 'read' | 'ownerUid'>) => {
    if (!user) return; // jangan buat notifikasi tanpa user login
    const currentRole = user.role as TargetRole | null;
    const target: TargetRole[] | undefined = n.targetRoles && n.targetRoles.length > 0
      ? n.targetRoles
      : (currentRole ? [currentRole] : undefined);

    const notif: AppNotification = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      read: false,
      targetRoles: target,
      ownerUid: user.uid,
    };
    setNotifications(prev => [notif, ...prev].slice(0, MAX_NOTIFICATIONS));
  }, [user]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const remove = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clear = useCallback(() => {
    setNotifications([]);
  }, []);

  // Filter notifikasi agar user hanya melihat yang ditujukan untuk role-nya.
  const visibleNotifications = useMemo(() => {
    if (!user) return [];
    const role = user.role as TargetRole | null;
    return notifications.filter(n => {
      if (!n.targetRoles || n.targetRoles.length === 0) return true;
      return role ? n.targetRoles.includes(role) : false;
    });
  }, [notifications, user]);

  const unreadCount = visibleNotifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications: visibleNotifications,
      unreadCount, add, markAsRead, markAllAsRead, remove, clear,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications harus digunakan di dalam NotificationProvider');
  return ctx;
};
