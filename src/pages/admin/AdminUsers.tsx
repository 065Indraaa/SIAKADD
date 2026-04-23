import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit2, Trash2, Filter, RefreshCw, Loader2, Copy, CheckCircle2, Info, User, GraduationCap, BookOpen, Phone, MapPin, Calendar, Mail, MoreVertical, FileSpreadsheet, Eye, EyeOff, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  fetchGuru, fetchSiswa, fetchAdmin,
  createGuruWithAccount, createSiswaWithAccount, createAdminWithAccount,
  updateGuruData, updateSiswaData, updateAdminData,
  deleteUserById, clearAllData, seedDemoData,
  UserListItem,
} from '@/lib/userService';
import { fetchKelas, fetchJurusan } from '@/lib/schoolService';

const JABATAN_GURU = ['Guru', 'WaliKelas', 'Kepsek', 'WakilKepsek', 'BK'];
const JABATAN_LABELS: Record<string, string> = {
  Guru: 'Guru Mata Pelajaran',
  WaliKelas: 'Wali Kelas',
  Kepsek: 'Kepala Sekolah',
  WakilKepsek: 'Wakil Kepala Sekolah',
  BK: 'Guru BK / Konselor',
};

function AccountInfoModal({ info, onClose }: {
  info: { email: string; password: string; nip?: string; nis?: string } | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  if (!info) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Email: ${info.email}\nPassword: ${info.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border border-emerald-500/30 max-w-sm rounded-[2rem] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 flex items-center gap-2 text-xl font-bold font-heading">
            <CheckCircle2 className="h-6 w-6" /> Akun Siap!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-slate-400 text-sm leading-relaxed">Berikan kredensial ini kepada pengguna. Keamanan adalah prioritas kami.</p>
          <div className="bg-slate-950 rounded-2xl p-5 space-y-3 border border-white/5 font-mono text-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between gap-4 relative z-10">
              <span className="text-slate-500 flex-shrink-0">Email</span>
              <span className="text-white text-right break-all font-bold">{info.email}</span>
            </div>
            <div className="flex justify-between items-center gap-4 relative z-10">
              <span className="text-slate-500 flex-shrink-0">Password</span>
              <div className="flex items-center gap-2">
                <span className={`text-yellow-400 font-bold ${!showPassword ? 'tracking-[0.3em]' : 'tracking-normal'}`}>
                  {showPassword ? info.password : '••••••••'}
                </span>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:flex-col">
          <Button variant="outline" onClick={handleCopy} className="w-full border-white/10 text-slate-300 h-12 rounded-xl hover:bg-white/5">
            {copied ? <><CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" /> Tersalin</> : <><Copy className="h-4 w-4 mr-2" /> Salin Info</>}
          </Button>
          <Button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-500 h-12 rounded-xl font-bold shadow-lg shadow-emerald-600/20">Selesai</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-400 text-[11px] uppercase font-bold tracking-wider ml-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [tingkatFilter, setTingkatFilter] = useState('semua');
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserListItem | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newAccountInfo, setNewAccountInfo] = useState<any>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [jurusanList, setJurusanList] = useState<any[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data: UserListItem[] = [];
      if (roleFilter === 'guru') data = await fetchGuru();
      else if (roleFilter === 'siswa') data = await fetchSiswa();
      else if (roleFilter === 'admin') data = await fetchAdmin();
      else {
        const [guru, siswa, admin] = await Promise.all([fetchGuru(), fetchSiswa(), fetchAdmin()]);
        data = [...guru, ...siswa, ...admin];
      }
      setUsers(data);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data pengguna.');
    } finally {
      setLoading(false);
    }
  }, [roleFilter]);

  const loadMetadata = useCallback(async () => {
    try {
      const [k, j] = await Promise.all([fetchKelas(), fetchJurusan()]);
      setKelasList(k);
      setJurusanList(j);
    } catch (e) {
      console.error("Failed to load classes/majors:", e);
    }
  }, []);

  useEffect(() => { 
    fetchUsers(); 
    loadMetadata();
  }, [fetchUsers, loadMetadata]);

  const filteredUsers = users.filter(user => {
    const low = searchTerm.toLowerCase();
    if (searchTerm &&
      !user.name.toLowerCase().includes(low) &&
      !user.email.toLowerCase().includes(low) &&
      !(user.nip || '').toLowerCase().includes(low) &&
      !(user.nis || '').toLowerCase().includes(low)) return false;
    
    if (roleFilter === 'siswa' && tingkatFilter !== 'semua') {
      if (String(user.gradeLevel) !== tingkatFilter) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    const role = ['guru', 'siswa', 'admin'].includes(roleFilter) ? roleFilter : 'siswa';
    setFormData({
      role,
      name: '', email: '', phone: '', address: '',
      gender: 'L', birthPlace: '', birthDate: '',
      specialization: '', jabatan: 'Guru', nip: '',
      classId: '', majorId: '', tahunMasuk: new Date().getFullYear()
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (user: UserListItem) => {
    setEditingUser(user);
    setFormData({
      ...user,
      role: user.role,
      nip: user.nip || '',
      phone: user.phone || '',
      address: user.address || '',
      specialization: user.specialization || '',
      jabatan: user.jabatan || 'Guru',
      gender: user.gender || 'L',
      birthPlace: user.birthPlace || '',
      birthDate: user.birthDate || '',
      classId: user.kelasId || '',
      majorId: user.jurusanId || '',
      tahunMasuk: user.tahunMasuk || new Date().getFullYear()
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) { setError('Nama lengkap wajib diisi.'); return; }
    setSaving(true);
    setError(null);
    try {
      if (editingUser) {
        if (editingUser.role === 'guru') {
          await updateGuruData(editingUser.id, editingUser.guruId!, {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            specialization: formData.specialization,
            jabatan: formData.jabatan,
            birthPlace: formData.birthPlace,
            birthDate: formData.birthDate,
          });
        } else if (editingUser.role === 'siswa') {
          await updateSiswaData(editingUser.id, editingUser.siswaId!, {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            birthPlace: formData.birthPlace,
            birthDate: formData.birthDate,
            classId: formData.classId || undefined,
            majorId: formData.majorId || undefined,
          });
        } else if (editingUser.role === 'admin') {
          await updateAdminData(editingUser.id, {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
          });
        }
        setIsDialogOpen(false);
        alert('Data berhasil diperbarui!');
        await fetchUsers(); // This triggers table refresh
      } else {
        if (formData.role === 'guru') {
          const result = await createGuruWithAccount(formData);
          setIsDialogOpen(false);
          setNewAccountInfo({ email: result.email, password: result.defaultPassword, nip: result.nip });
        } else if (formData.role === 'siswa') {
          const result = await createSiswaWithAccount(formData);
          setIsDialogOpen(false);
          setNewAccountInfo({ email: result.email, password: result.defaultPassword, nis: result.nis });
        } else if (formData.role === 'admin') {
          const result = await createAdminWithAccount(formData);
          setIsDialogOpen(false);
          setNewAccountInfo({ email: result.email, password: result.defaultPassword });
        }
        alert('Akun baru berhasil dibuat!');
        await fetchUsers();
      }
    } catch (e: any) {
      console.error(e);
      alert('Gagal menyimpan: ' + (e.message || 'Terjadi kesalahan sistem.'));
      setError(e.message || 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => { setDeletingId(id); setIsAlertOpen(true); };
  const handleDelete = async () => {
    if (!deletingId) return;
    try { 
      await deleteUserById(deletingId); 
      alert('Pengguna berhasil dihapus!');
      await fetchUsers(); // Refresh
    } catch (e: any) { 
      console.error(e);
      alert('Gagal menghapus: ' + (e.message || 'Data ini mungkin terhubung dengan data lain (seperti kelas atau nilai).'));
      setError(e.message); 
    }
    setIsAlertOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white font-heading">Pusat Pengguna</h2>
          <p className="text-slate-400 font-medium">Orkestrasi identitas digital seluruh civitas akademik.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={fetchUsers} disabled={loading} className="w-12 h-12 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all active:scale-95">
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setIsImportModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500 h-12 px-6 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-white flex-1 md:flex-none">
            <FileSpreadsheet className="mr-2 h-5 w-5" /> Import Excel
          </Button>
          <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 h-12 px-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-white flex-1 md:flex-none">
            <Plus className="mr-2 h-5 w-5" /> Tambah User
          </Button>
          <Button onClick={async () => {
            setLoading(true);
            try {
              await seedDemoData();
              alert("Data demo berhasil dibuat!");
              await fetchUsers();
            } catch(e: any) {
              alert("Gagal membuat data demo: " + e.message);
            } finally {
              setLoading(false);
            }
          }} className="bg-amber-600 hover:bg-amber-500 h-12 px-6 rounded-2xl font-bold shadow-lg shadow-amber-600/20 active:scale-95 transition-all text-white flex-1 md:flex-none">
            <Zap className="mr-2 h-5 w-5" /> Buat Data Demo
          </Button>
          <Button onClick={async () => {
            if(confirm("PERINGATAN: Ini akan menghapus SELURUH data di database! Lanjutkan?")) {
              setLoading(true);
              try {
                await clearAllData();
                alert("Database berhasil dibersihkan!");
                await fetchUsers();
              } catch(e: any) {
                alert("Gagal membersihkan database: " + e.message);
              } finally {
                setLoading(false);
              }
            }
          }} className="bg-red-600 hover:bg-red-500 h-12 px-6 rounded-2xl font-bold shadow-lg shadow-red-600/20 active:scale-95 transition-all text-white flex-1 md:flex-none">
            <Trash2 className="mr-2 h-5 w-5" /> Wipe DB
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <Tabs value={roleFilter} onValueChange={(v) => setRoleFilter(v)} className="w-full lg:w-auto">
              <TabsList className="bg-slate-950/50 p-1.5 h-auto rounded-2xl border border-white/5">
                {[
                  { v: 'semua', label: 'Dashboard' },
                  { v: 'siswa', label: '🎓 Siswa' },
                  { v: 'guru', label: '👨‍🏫 Pengajar' },
                  { v: 'admin', label: '🔧 Operator' },
                ].map(({ v, label }) => (
                  <TabsTrigger key={v} value={v}
                    className="h-10 px-6 font-bold rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-500">
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="flex gap-3">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input placeholder="Cari nama atau ID..."
                  className="pl-12 h-12 bg-slate-950/50 border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:ring-blue-500/20"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={fetchUsers} disabled={loading}
                className="h-12 w-12 bg-slate-950/50 border border-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              {roleFilter === 'siswa' && (
                <Select value={tingkatFilter} onValueChange={(v) => setTingkatFilter(v ?? 'semua')}>
                  <SelectTrigger className="w-[140px] h-12 bg-slate-950/50 border-white/5 rounded-2xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 rounded-xl">
                    <SelectItem value="semua">Semua Kelas</SelectItem>
                    <SelectItem value="10">Kelas 10</SelectItem>
                    <SelectItem value="11">Kelas 11</SelectItem>
                    <SelectItem value="12">Kelas 12</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/20">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-6">Identitas Pengguna</TableHead>
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-6">Kontak & Kelas</TableHead>
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-6">Kredensial</TableHead>
                  <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-6 text-right">Manajemen</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-32">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto opacity-50" />
                    <p className="mt-4 text-slate-500 font-medium">Sinkronisasi Cloud SQL...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black ${
                        user.role === 'guru' ? 'bg-blue-500/10 text-blue-400' : 
                        user.role === 'siswa' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-white tracking-tight">{user.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 uppercase tracking-widest font-bold">
                          {user.role === 'guru' ? `NIP ${user.nip}` : user.role === 'siswa' ? `NIS ${user.nis}` : 'Admin'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white font-medium">{user.email}</div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                      {user.className || (user.role === 'guru' ? (JABATAN_LABELS[user.jabatan || ''] || user.role) : '-')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 group/pass">
                      <div className="bg-slate-950/40 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-3">
                        <span className={`text-slate-300 font-mono text-xs min-w-[80px] ${!visiblePasswords[user.id] ? 'tracking-[0.2em] opacity-40' : 'tracking-normal opacity-100'}`}>
                          {visiblePasswords[user.id] ? (user.password || 'no-pass') : '••••••••'}
                        </span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); togglePassword(user.id); }}
                          className="text-slate-500 hover:text-blue-400 transition-colors p-1"
                          title={visiblePasswords[user.id] ? "Sembunyikan" : "Tampilkan"}
                        >
                          {visiblePasswords[user.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(user)}
                        className="h-10 w-10 text-blue-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(user.id)}
                        className="h-10 w-10 text-red-400 hover:text-white hover:bg-red-600 rounded-xl transition-all">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-32">
                    <div className="max-w-xs mx-auto">
                      <div className="h-20 w-20 bg-slate-800 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6 grayscale opacity-20">📭</div>
                      <p className="text-xl font-bold text-slate-600">Hening Di Sini...</p>
                      <p className="text-slate-500 text-sm mt-2 mb-6">Belum ada identitas yang ditemukan untuk kriteria ini.</p>
                      <Button onClick={handleOpenAdd} variant="outline" className="border-white/5 text-slate-300">Tambah Sekarang</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Logic Dialogs & Info Modals */}
      {/* ... keeping the dialog code but applying the new UI style ... */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-lg rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
           <div className="p-8 border-b border-white/5 bg-white/5">
              <DialogTitle className="text-2xl font-black tracking-tight text-white font-heading">
                {editingUser ? `Modifikasi Profil` : 'Entitas Baru'}
              </DialogTitle>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Data akan disimpan secara permanen di database pusat.</p>
           </div>
           
           <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {!editingUser && (
                <FormField label="Privilese / Role">
                  <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                    <SelectTrigger className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      <SelectItem value="guru">Pengajar / Guru</SelectItem>
                      <SelectItem value="siswa">Siswa Terdaftar</SelectItem>
                      <SelectItem value="admin">Operator Sistem</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              )}

              <FormField label="Nama Identitas" required>
                <Input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama lengkap sesuai dokumen" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
              </FormField>

              {(formData.role === 'guru' || editingUser?.role === 'guru') && (
                <>
                  <FormField label="Nomor Induk Pegawai (NIP)" required={!editingUser}>
                    <Input value={formData.nip || ''} onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                      placeholder="Masukkan NIP manual" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" 
                      disabled={!!editingUser} />
                  </FormField>
                  <FormField label="Keahlian Spesifik">
                    <Input value={formData.specialization || ''} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="Contoh: Logika Matematika" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
                  </FormField>
                  <FormField label="Jabatan Struktural">
                    <Select value={formData.jabatan} onValueChange={(v) => setFormData({...formData, jabatan: v})}>
                       <SelectTrigger className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white">
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent className="bg-slate-900 border-white/10">
                          {JABATAN_GURU.map(j => <SelectItem key={j} value={j}>{JABATAN_LABELS[j]}</SelectItem>)}
                       </SelectContent>
                    </Select>
                  </FormField>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Jenis Kelamin">
                  <Select value={formData.gender || 'L'} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                    <SelectTrigger className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      <SelectItem value="L">Laki-Laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Nomor Telepon">
                  <Input value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08123xxx" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tempat Lahir">
                  <Input value={formData.birthPlace || ''} onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    placeholder="Contoh: Jakarta" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
                </FormField>
                <FormField label="Tanggal Lahir">
                  <Input type="date" value={formData.birthDate || ''} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white [color-scheme:dark]" />
                </FormField>
              </div>

              <FormField label="Alamat Tempat Tinggal">
                <Input value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Alamat lengkap..." className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
              </FormField>

              {(formData.role === 'siswa' || editingUser?.role === 'siswa') && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Kelas">
                    <Select key={`user-kelas-${editingUser?.id || 'new'}-${kelasList.length}`} value={formData.classId || 'none'} onValueChange={(v) => setFormData({ ...formData, classId: v === 'none' ? '' : v })}>
                      <SelectTrigger className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white">
                        <SelectValue placeholder={kelasList.length > 0 ? "Pilih Kelas" : "Memuat..."} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 max-h-48">
                        <SelectItem value="none">Belum Ada</SelectItem>
                        {kelasList.map(k => <SelectItem key={k.id} value={k.id}>{k.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Jurusan">
                    <Select key={`user-jurusan-${editingUser?.id || 'new'}-${jurusanList.length}`} value={formData.majorId || 'none'} onValueChange={(v) => setFormData({ ...formData, majorId: v === 'none' ? '' : v })}>
                      <SelectTrigger className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white">
                        <SelectValue placeholder={jurusanList.length > 0 ? "Pilih Jurusan" : "Memuat..."} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 max-h-48">
                        <SelectItem value="none">Umum</SelectItem>
                        {jurusanList.map(j => <SelectItem key={j.id} value={j.id}>{j.nama}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
              )}

              {(formData.role === 'siswa' || editingUser?.role === 'siswa') && (
                <FormField label="Tahun Masuk">
                  <Input type="number" value={formData.tahunMasuk || ''} onChange={(e) => setFormData({ ...formData, tahunMasuk: parseInt(e.target.value) })}
                    placeholder="2023" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
                </FormField>
              )}

              <FormField label="Jalur Komunikasi (Email)">
                 <Input value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Kosongkan untuk auto-generate" className="h-12 bg-slate-900 border-white/5 rounded-2xl text-white" />
              </FormField>
           </div>

           <div className="p-8 bg-white/5 border-t border-white/5 flex gap-3">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-12 rounded-2xl text-slate-400 hover:text-white">Batal</Button>
              <Button onClick={handleSave} disabled={saving} className="flex-1 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold shadow-xl shadow-blue-600/20">
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : editingUser ? 'Terapkan Perubahan' : 'Finalisasi Akun'}
              </Button>
           </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-950 border border-red-500/10 rounded-[2.5rem] shadow-2xl">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-2xl font-black text-white font-heading">Hapus Entitas?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 leading-relaxed">
              Tindakan ini akan menghapus data <span className="text-red-400 font-bold font-mono">permanen</span> dari server. Akses pengguna akan dicabut secara instan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="h-12 rounded-2xl border-white/5 bg-white/5 text-slate-400 hover:text-white">Pertahankan Data</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-12 rounded-2xl bg-red-600 hover:bg-red-500 font-bold shadow-xl shadow-red-600/20">Eksekusi Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent className="bg-slate-950 border border-emerald-500/30 max-w-md rounded-[2.5rem] shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight text-white font-heading flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-emerald-400" /> Import via Excel
            </DialogTitle>
            <DialogDescription className="text-slate-400 pt-2">
              Unggah file Excel (.xlsx) untuk memasukkan data guru atau siswa secara massal tanpa perlu input manual.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
             <div className="h-16 w-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="h-8 w-8 text-emerald-400" />
             </div>
             <p className="text-white font-bold mb-1">Klik untuk Memilih File</p>
             <p className="text-slate-500 text-xs">atau seret dan lepas file Anda ke sini</p>
             <p className="text-emerald-500/50 text-[10px] uppercase font-bold tracking-widest mt-4">Logika upload menyusul</p>
          </div>

          <DialogFooter className="gap-2 sm:flex-col mt-4">
            <Button variant="outline" onClick={() => setIsImportModalOpen(false)} className="w-full h-12 rounded-2xl border-white/5 bg-transparent text-slate-400 hover:text-white hover:bg-white/5">
              Batal
            </Button>
            <Button className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold shadow-xl shadow-emerald-600/20 text-white" onClick={() => {
              alert('Fitur import akan diimplementasikan nanti.');
              setIsImportModalOpen(false);
            }}>
              Mulai Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AccountInfoModal info={newAccountInfo} onClose={() => setNewAccountInfo(null)} />
    </div>
  );
}