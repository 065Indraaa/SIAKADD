import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit2, Trash2, Filter, RefreshCw, Loader2, Copy, CheckCircle2, Info, User, GraduationCap, BookOpen, Phone, MapPin, Calendar, Mail, MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  fetchGuru, fetchSiswa, fetchAdmin,
  createGuruWithAccount, createSiswaWithAccount,
  updateGuruData, updateSiswaData,
  deleteUserById,
  UserListItem,
} from '@/lib/userService';

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
            <div className="flex justify-between gap-4 relative z-10">
              <span className="text-slate-500 flex-shrink-0">Password</span>
              <span className="text-yellow-400 font-bold tracking-widest">{info.password}</span>
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
  const [roleFilter, setRoleFilter] = useState('siswa');
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

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

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
      specialization: '', jabatan: 'Guru',
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (user: UserListItem) => {
    setEditingUser(user);
    setFormData({
      ...user,
      role: user.role,
      phone: user.phone || '',
      address: user.address || '',
      specialization: user.specialization || '',
      jabatan: user.jabatan || 'Guru',
      gender: user.gender || 'L',
      birthPlace: user.birthPlace || '',
      birthDate: user.birthDate || '',
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
          });
        }
        setIsDialogOpen(false);
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
        }
        await fetchUsers();
      }
    } catch (e: any) {
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
      await fetchUsers(); // Refresh
    } catch (e: any) { 
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
          <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 h-12 px-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-white flex-1 md:flex-none">
            <Plus className="mr-2 h-5 w-5" /> Tambah User
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
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-500 font-bold p-6">Identitas</TableHead>
                <TableHead className="text-slate-500 font-bold">Credential</TableHead>
                <TableHead className="text-slate-500 font-bold">Metadata</TableHead>
                <TableHead className="text-right text-slate-500 font-bold pr-8">Operasi</TableHead>
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
                          {user.role === 'guru' ? <BookOpen className="h-3 w-3" /> : 
                           user.role === 'siswa' ? <GraduationCap className="h-3 w-3" /> : <User className="h-3 w-3" />}
                          {user.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-white font-medium">{user.email}</div>
                      <div className="font-mono text-[10px] uppercase text-blue-400 bg-blue-400/5 inline-block px-2 py-0.5 rounded border border-blue-400/10">
                        {user.role === 'guru' ? `NIP ${user.nip}` : user.role === 'siswa' ? `NIS ${user.nis}` : 'SYSTEM'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-slate-400 grid grid-cols-1 gap-1">
                      {user.phone && <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {user.phone}</div>}
                      {user.jabatan && <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div> {JABATAN_LABELS[user.jabatan] || user.jabatan}</div>}
                      {user.className && <Badge className="bg-white/5 border-white/5 text-slate-300 w-fit">{user.className}</Badge>}
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

      <AccountInfoModal info={newAccountInfo} onClose={() => setNewAccountInfo(null)} />
    </div>
  );
}