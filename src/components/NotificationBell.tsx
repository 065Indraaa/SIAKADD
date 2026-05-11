import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, CheckCheck, Info, AlertCircle, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useNotifications, NotificationType } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

const typeIcons: Record<NotificationType, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const typeColors: Record<NotificationType, string> = {
  info: 'text-blue-400 bg-blue-500/10',
  success: 'text-emerald-400 bg-emerald-500/10',
  warning: 'text-amber-400 bg-amber-500/10',
  error: 'text-red-400 bg-red-500/10',
};

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, remove, clear } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (id: string, linkTo?: string) => {
    markAsRead(id);
    if (linkTo) {
      navigate(linkTo);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        aria-label="Notifikasi"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Notifikasi</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {notifications.length > 0 && (
                <>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="h-8 px-2 rounded-lg hover:bg-accent flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      title="Tandai semua dibaca"
                    >
                      <CheckCheck className="h-3 w-3" />
                      Baca Semua
                    </button>
                  )}
                  <button
                    onClick={() => { if (confirm('Hapus semua notifikasi?')) clear(); }}
                    className="h-8 w-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors"
                    title="Hapus semua"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors md:hidden"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[440px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <div className="h-12 w-12 rounded-xl bg-muted mx-auto flex items-center justify-center mb-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Belum ada notifikasi</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Aktivitas terbaru akan muncul di sini.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map(notif => {
                  const Icon = typeIcons[notif.type];
                  return (
                    <div
                      key={notif.id}
                      onClick={() => handleClick(notif.id, notif.linkTo)}
                      className={`px-5 py-3 hover:bg-accent cursor-pointer transition-colors group ${!notif.read ? 'bg-blue-500/5' : ''}`}
                    >
                      <div className="flex gap-3">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[notif.type]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm leading-tight ${!notif.read ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
                              {notif.title}
                            </p>
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                            {notif.body}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[11px] text-muted-foreground">
                              {formatRelativeTime(notif.createdAt)}
                            </span>
                            <button
                              onClick={(e) => { e.stopPropagation(); remove(notif.id); }}
                              className="opacity-0 group-hover:opacity-100 text-[11px] text-muted-foreground hover:text-red-400 transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-border bg-muted/30">
              <p className="text-[11px] text-muted-foreground text-center">
                Menampilkan {notifications.length} notifikasi terbaru
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
