import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LookupSelect } from '@/components/ui/lookup-select';
import { Search, Plus, Edit2, Trash2, RefreshCw, Loader2, Copy, CheckCircle2, FileSpreadsheet, Eye, EyeOff, Zap, Download, Upload, FileText, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  fetchGuru, fetchSiswa, fetchAdmin,
  createGuruWithAccount, createSiswaWithAccount, createAdminWithAccount,
  updateGuruData, updateSiswaData, updateAdminData,
  deleteUserById, clearAllData, seedDemoData,
  UserListItem,
} from '@/lib/userService';
import { fetchKelas, fetchJurusan, graduateSiswa } from '@/lib/schoolService';
import { currentGraduationYear } from '@/lib/tahunAjaran';
import { useAutoRefresh } from '@/lib/useAutoRefresh';
import { useManualRefresh } from '@/lib/useManualRefresh';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNotifications } from '@/contexts/NotificationContext';

const JABATAN_GURU = ['Guru', 'WaliKelas', 'Kepsek', 'WakilKepsek', 'BK'];
const JABATAN_LABELS: Record<string, string> = {
  Guru: 'Guru Mata Pelajaran',
  WaliKelas: 'Wali Kelas',
  Kepsek: 'Kepala Sekolah',
  WakilKepsek: 'Wakil Kepala Sekolah',
  BK: 'Guru BK / Konselor',
};

const SISWA_TEMPLATE_COLUMNS = ['Nama Lengkap', 'Jenis Kelamin (L/P)', 'Tempat Lahir', 'Tanggal Lahir (YYYY-MM-DD)', 'Alamat', 'Telepon', 'Tahun Masuk'];
const GURU_TEMPLATE_COLUMNS = ['Nama Lengkap', 'Jenis Kelamin (L/P)', 'NIP (opsional, kosongkan untuk auto)', 'Jabatan (Guru/WaliKelas/Kepsek/WakilKepsek/BK)', 'Spesialisasi', 'Tempat Lahir', 'Tanggal Lahir (YYYY-MM-DD)', 'Telepon', 'Alamat'];

// ============================================================
// TEMPLATE & EXPORT HELPERS
// ============================================================

function downloadTemplate(type: 'siswa' | 'guru') {
  const columns = type === 'siswa' ? SISWA_TEMPLATE_COLUMNS : GURU_TEMPLATE_COLUMNS;
  const example = type === 'siswa'
    ? ['Ahmad Fauzi', 'L', 'Jakarta', '2008-05-15', 'Jl. Merdeka No. 1', '081234567890', '2024']
    : ['Siti Aminah, S.Pd', 'P', '', 'Guru', 'Matematika', 'Bandung', '1985-03-20', '081298765432', 'Jl. Pendidikan No. 5'];
  const ws = XLSX.utils.aoa_to_sheet([columns, example]);
  ws['!cols'] = columns.map(() => ({ wch: 30 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Template ${type === 'siswa' ? 'Siswa' : 'Guru'}`);
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), `template_import_${type}.xlsx`);
}

function exportAccountsExcel(users: UserListItem[], label: string) {
  const header = ['Nama', 'NIP/NIS', 'Email', 'Password', 'Role', 'Kelas', 'Jurusan', 'Jabatan', 'Telepon', 'Alamat'];
  const rows = users.map(u => [
    u.name,
    u.nip || u.nis || '-',
    u.email,
    u.password || '-',
    u.role.toUpperCase(),
    u.className || '-',
    u.jurusanName || '-',
    u.jabatan ? (JABATAN_LABELS[u.jabatan] || u.jabatan) : '-',
    u.phone || '-',
    u.address || '-',
  ]);
  const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
  ws['!cols'] = header.map(() => ({ wch: 22 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Akun');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), `akun_${label}_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function exportAccountsPDF(users: UserListItem[], label: string) {
  const doc = new jsPDF({ orientation: 'landscape' });
  doc.setFontSize(14);
  doc.text(`Daftar Akun ${label} — SIAKAD SCOLA`, 14, 18);
  doc.setFontSize(9);
  doc.text(`Tanggal cetak: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 24);
  doc.text(`Total akun: ${users.length}`, 14, 29);
  autoTable(doc, {
    startY: 34,
    head: [['Nama', 'NIP/NIS', 'Email', 'Password', 'Role', 'Kelas', 'Telepon']],
    body: users.map(u => [u.name, u.nip || u.nis || '-', u.email, u.password || '-', u.role.toUpperCase(), u.className || '-', u.phone || '-']),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235] },
  });
  doc.save(`akun_${label}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

// ============================================================
// SUB COMPONENTS
// ============================================================
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

function AccountInfoModal({ info, onClose }: { info: { email: string; password: string; nip?: string; nis?: string } | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [showPw, setShowPw] = useState(false);
  if (!info) return null;
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border border-emerald-500/30 max-w-sm rounded-[2rem] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 flex items-center gap-2 text-xl font-bold">
            <CheckCircle2 className="h-6 w-6" /> Akun Dibuat
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-slate-400 text-sm">Berikan kredensial ini kepada pengguna untuk login pertama kali.</p>
          <div className="bg-slate-950 rounded-2xl p-5 space-y-3 border border-white/5 font-mono text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Email</span>
              <span className="text-white break-all font-bold text-right">{info.email}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500">Password</span>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">{showPw ? info.password : '••••••••'}</span>
                <button onClick={() => setShowPw(!showPw)} className="text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {info.nip && <div className="flex justify-between gap-4"><span className="text-slate-500">NIP</span><span className="text-white font-bold">{info.nip}</span></div>}
            {info.nis && <div className="flex justify-between gap-4"><span className="text-slate-500">NIS</span><span className="text-white font-bold">{info.nis}</span></div>}
          </div>
        </div>
        <DialogFooter className="gap-2 sm:flex-col">
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(`Email: ${info.email}\nPassword: ${info.password}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="w-full border-white/10 text-slate-300 h-12 rounded-xl">
            {copied ? <><CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" /> Tersalin</> : <><Copy className="h-4 w-4 mr-2" /> Salin Kredensial</>}
          </Button>
          <Button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-500 h-12 rounded-xl font-bold">Selesai</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AdminUsers() {
  const { add: addNotif } = useNotifications();
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

  // ── Luluskan siswa ke alumni ─────────────────────────────
  const [isGraduateOpen, setIsGraduateOpen] = useState(false);
  const [graduateTarget, setGraduateTarget] = useState<UserListItem | null>(null);
  const [graduateForm, setGraduateForm] = useState<{
    status: 'Kuliah' | 'Kerja' | 'Lainnya';
    institusi: string;
    jabatanAtauJurusan: string;
    tahunLulus: number;
    prestasi: string;
  }>({ status: 'Kuliah', institusi: '', jabatanAtauJurusan: '', tahunLulus: currentGraduationYear(), prestasi: '' });
  const [graduating, setGraduating] = useState(false);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importType, setImportType] = useState<'siswa' | 'guru'>('siswa');
  const [importProgress, setImportProgress] = useState<{ total: number; done: number; errors: string[] } | null>(null);
  const [importResults, setImportResults] = useState<{ name: string; email: string; password: string; nip?: string; nis?: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [kelasList, setKelasList] = useState<any[]>([]);
  const [jurusanList, setJurusanList] = useState<any[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  const showAllPasswords = () => {
    const all: Record<string, boolean> = {};
    users.forEach(u => { all[u.id] = true; });
    setVisiblePasswords(all);
  };
  const hideAllPasswords = () => setVisiblePasswords({});

  const fetchUsersData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      let data: UserListItem[] = [];
      if (roleFilter === 'guru') data = await fetchGuru();
      else if (roleFilter === 'siswa') data = await fetchSiswa();
      else if (roleFilter === 'admin') data = await fetchAdmin();
      else {
        const [g, s, a] = await Promise.all([fetchGuru(), fetchSiswa(), fetchAdmin()]);
        data = [...g, ...s, ...a];
      }
      setUsers(data);
    } catch (e: any) {
      setError(e.message || 'Gagal memuat data.');
    } finally { setLoading(false); }
  }, [roleFilter]);

  const loadMetadata = useCallback(async () => {
    try {
      const [k, j] = await Promise.all([fetchKelas(), fetchJurusan()]);
      setKelasList(k); setJurusanList(j);
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchUsersData(); loadMetadata(); }, [fetchUsersData, loadMetadata]);

  // Auto-refresh setiap 20 detik + saat tab kembali aktif
  useAutoRefresh(() => {
    fetchUsersData();
    loadMetadata();
  }, 20_000);

  const [refreshing, refresh] = useManualRefresh(fetchUsersData, loadMetadata);

  const filteredUsers = users.filter(user => {
    const low = searchTerm.toLowerCase();
    if (searchTerm &&
      !user.name.toLowerCase().includes(low) &&
      !user.email.toLowerCase().includes(low) &&
      !(user.nip || '').toLowerCase().includes(low) &&
      !(user.nis || '').toLowerCase().includes(low)) return false;
    if (roleFilter === 'siswa' && tingkatFilter !== 'semua' && String(user.gradeLevel) !== tingkatFilter) return false;
    return true;
  });

  const handleImportExcel = async (file: File) => {
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
    if (rows.length < 2) { alert('File kosong atau tidak valid.'); return; }
    const dataRows = rows.slice(1).filter(r => r && r[0] && String(r[0]).trim());
    if (dataRows.length === 0) { alert('Tidak ada baris data yang valid.'); return; }

    setImportProgress({ total: dataRows.length, done: 0, errors: [] });
    setImportResults([]);
    const results: typeof importResults = [];
    const errors: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const name = String(row[0] || '').trim();
      try {
        if (importType === 'siswa') {
          const r = await createSiswaWithAccount({
            name,
            gender: String(row[1] || 'L').trim().toUpperCase() === 'P' ? 'P' : 'L',
            birthPlace: String(row[2] || '').trim() || undefined,
            birthDate: String(row[3] || '').trim() || undefined,
            address: String(row[4] || '').trim() || undefined,
            phone: String(row[5] || '').trim() || undefined,
            tahunMasuk: parseInt(String(row[6] || new Date().getFullYear())) || new Date().getFullYear(),
          });
          results.push({ name, email: r.email, password: r.defaultPassword, nis: r.nis });
        } else {
          const r = await createGuruWithAccount({
            name,
            gender: String(row[1] || 'L').trim().toUpperCase() === 'P' ? 'P' : 'L',
            nip: String(row[2] || '').trim() || undefined,
            jabatan: String(row[3] || 'Guru').trim(),
            specialization: String(row[4] || '').trim() || undefined,
            birthPlace: String(row[5] || '').trim() || undefined,
            birthDate: String(row[6] || '').trim() || undefined,
            phone: String(row[7] || '').trim() || undefined,
            address: String(row[8] || '').trim() || undefined,
          });
          results.push({ name, email: r.email, password: r.defaultPassword, nip: r.nip });
        }
      } catch (e: any) {
        errors.push(`Baris ${i + 2} (${name}): ${e.message || 'Gagal diproses'}`);
      }
      setImportProgress({ total: dataRows.length, done: i + 1, errors: [...errors] });
    }
    setImportResults(results);
    setImportProgress(null);
    await fetchUsersData();
    addNotif({
      type: errors.length > 0 ? 'warning' : 'success',
      kind: 'system',
      title: `Impor ${importType === 'siswa' ? 'Siswa' : 'Guru'} Selesai`,
      body: `${results.length} akun berhasil dibuat${errors.length > 0 ? `, ${errors.length} gagal` : ''}.`,
    });
  };

  const exportImportResults = (format: 'xlsx' | 'pdf') => {
    if (importResults.length === 0) return;
    if (format === 'xlsx') {
      const header = ['Nama', 'Email', 'Password', importType === 'siswa' ? 'NIS' : 'NIP'];
      const rows = importResults.map(r => [r.name, r.email, r.password, r.nis || r.nip || '-']);
      const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
      ws['!cols'] = header.map(() => ({ wch: 25 }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Akun Baru');
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), `akun_baru_${importType}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } else {
      const doc = new jsPDF({ orientation: 'landscape' });
      doc.setFontSize(14);
      doc.text(`Akun Baru ${importType === 'siswa' ? 'Siswa' : 'Guru'} — Hasil Import`, 14, 18);
      doc.setFontSize(9);
      doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')} — Total: ${importResults.length} akun`, 14, 24);
      autoTable(doc, {
        startY: 30,
        head: [['Nama', 'Email', 'Password', importType === 'siswa' ? 'NIS' : 'NIP']],
        body: importResults.map(r => [r.name, r.email, r.password, r.nis || r.nip || '-']),
        styles: { fontSize: 9, cellPadding: 2.5 },
        headStyles: { fillColor: [37, 99, 235] },
      });
      doc.save(`akun_baru_${importType}_${new Date().toISOString().slice(0, 10)}.pdf`);
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    const role = ['guru', 'siswa', 'admin'].includes(roleFilter) ? roleFilter : 'siswa';
    setFormData({
      role, name: '', email: '', phone: '', address: '',
      gender: 'L', birthPlace: '', birthDate: '',
      specialization: '', jabatan: 'Guru', nip: '',
      classId: '', majorId: '', tahunMasuk: new Date().getFullYear(),
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (u: UserListItem) => {
    setEditingUser(u);
    setFormData({
      ...u, role: u.role,
      nip: u.nip || '', phone: u.phone || '', address: u.address || '',
      specialization: u.specialization || '', jabatan: u.jabatan || 'Guru',
      gender: u.gender || 'L', birthPlace: u.birthPlace || '',
      birthDate: u.birthDate || '',
      classId: u.kelasId || '', majorId: u.jurusanId || '',
      tahunMasuk: u.tahunMasuk || new Date().getFullYear(),
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) { setError('Nama wajib diisi.'); return; }
    setSaving(true); setError(null);
    try {
      if (editingUser) {
        if (editingUser.role === 'guru') {
          await updateGuruData(editingUser.id, editingUser.guruId!, {
            name: formData.name, phone: formData.phone, address: formData.address,
            specialization: formData.specialization, jabatan: formData.jabatan,
            birthPlace: formData.birthPlace, birthDate: formData.birthDate,
          });
        } else if (editingUser.role === 'siswa') {
          await updateSiswaData(editingUser.id, editingUser.siswaId!, {
            name: formData.name, phone: formData.phone, address: formData.address,
            birthPlace: formData.birthPlace, birthDate: formData.birthDate,
            classId: formData.classId || undefined, majorId: formData.majorId || undefined,
          });
        } else {
          await updateAdminData(editingUser.id, {
            name: formData.name, phone: formData.phone, address: formData.address,
          });
        }
        setIsDialogOpen(false);
        await fetchUsersData();
      } else {
        if (formData.role === 'guru') {
          const r = await createGuruWithAccount(formData);
          setIsDialogOpen(false);
          setNewAccountInfo({ email: r.email, password: r.defaultPassword, nip: r.nip });
          addNotif({
            type: 'success', kind: 'system',
            title: 'Akun Guru Dibuat',
            body: `Akun untuk ${formData.name} berhasil dibuat dengan NIP ${r.nip}.`,
          });
        } else if (formData.role === 'siswa') {
          const r = await createSiswaWithAccount(formData);
          setIsDialogOpen(false);
          setNewAccountInfo({ email: r.email, password: r.defaultPassword, nis: r.nis });
          addNotif({
            type: 'success', kind: 'system',
            title: 'Akun Siswa Dibuat',
            body: `Akun untuk ${formData.name} berhasil dibuat dengan NIS ${r.nis}.`,
          });
        } else {
          const r = await createAdminWithAccount(formData);
          setIsDialogOpen(false);
          setNewAccountInfo({ email: r.email, password: r.defaultPassword });
          addNotif({
            type: 'success', kind: 'system',
            title: 'Akun Admin Dibuat',
            body: `Akun administrator untuk ${formData.name} berhasil dibuat.`,
          });
        }
        await fetchUsersData();
      }
    } catch (e: any) {
      alert('Gagal menyimpan: ' + (e.message || 'Error'));
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => { setDeletingId(id); setIsAlertOpen(true); };

  // ── Luluskan siswa → buka dialog ────────────────────────
  const handleOpenGraduate = (user: UserListItem) => {
    setGraduateTarget(user);
    setGraduateForm({
      status: 'Kuliah',
      institusi: '',
      jabatanAtauJurusan: '',
      tahunLulus: currentGraduationYear(),
      prestasi: '',
    });
    setIsGraduateOpen(true);
  };

  const handleGraduate = async () => {
    if (!graduateTarget || !graduateTarget.siswaId) return;
    if (!graduateTarget.nis || !graduateTarget.name) {
      alert('Data siswa tidak lengkap (NIS/nama).');
      return;
    }
    setGraduating(true);
    try {
      await graduateSiswa({
        siswaId: graduateTarget.siswaId,
        nis: graduateTarget.nis,
        nama: graduateTarget.name,
        tahunLulus: graduateForm.tahunLulus,
        status: graduateForm.status,
        institusi: graduateForm.institusi || undefined,
        jabatanAtauJurusan: graduateForm.jabatanAtauJurusan || undefined,
        email: graduateTarget.email || undefined,
        telepon: graduateTarget.phone || undefined,
        alamat: graduateTarget.address || undefined,
        prestasi: graduateForm.prestasi || undefined,
      });
      addNotif({
        type: 'success', kind: 'akademik',
        title: 'Siswa Diluluskan',
        body: `${graduateTarget.name} telah ditambahkan ke data alumni tahun ${graduateForm.tahunLulus}.`,
      });
      setIsGraduateOpen(false);
      setGraduateTarget(null);
      await fetchUsersData();
    } catch (e: any) {
      alert('Gagal meluluskan siswa: ' + (e.message || 'NIS mungkin sudah terdaftar di alumni.'));
    } finally {
      setGraduating(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const user = users.find(u => u.id === deletingId);
    try {
      await deleteUserById(deletingId);
      addNotif({
        type: 'warning', kind: 'system',
        title: 'Pengguna Dihapus',
        body: `Akun ${user?.name || 'pengguna'} telah dihapus dari sistem.`,
      });
      await fetchUsersData();
    } catch (e: any) {
      alert('Gagal menghapus: ' + e.message);
    }
    setIsAlertOpen(false); setDeletingId(null);
  };

  const roleLabelExport = roleFilter === 'guru' ? 'Guru' : roleFilter === 'siswa' ? 'Siswa' : roleFilter === 'admin' ? 'Admin' : 'Semua';

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">Pusat Pengguna</h2>
          <p className="text-slate-400 font-medium mt-1">Kelola seluruh akun civitas akademik — siswa, guru, dan admin.</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 h-11 px-5 rounded-xl font-bold text-white">
          <Plus className="mr-2 h-4 w-4" /> Tambah Manual
        </Button>
        <Button onClick={() => { setImportType('siswa'); setIsImportModalOpen(true); setImportResults([]); }} className="bg-emerald-600 hover:bg-emerald-500 h-11 px-5 rounded-xl font-bold text-white">
          <Upload className="mr-2 h-4 w-4" /> Impor Excel
        </Button>
        <Button onClick={() => exportAccountsExcel(filteredUsers, roleLabelExport)} disabled={filteredUsers.length === 0}
          className="bg-teal-600 hover:bg-teal-500 h-11 px-5 rounded-xl font-bold text-white">
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Ekspor Excel
        </Button>
        <Button onClick={() => exportAccountsPDF(filteredUsers, roleLabelExport)} disabled={filteredUsers.length === 0}
          className="bg-rose-600 hover:bg-rose-500 h-11 px-5 rounded-xl font-bold text-white">
          <FileText className="mr-2 h-4 w-4" /> Ekspor PDF
        </Button>
        <Button variant="outline" onClick={refresh} disabled={refreshing}
          className="h-11 w-11 rounded-xl border-white/5 bg-white/5 p-0"
          title="Segarkan data">
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>

        <div className="ml-auto flex gap-2">
          {/* Tombol proses kelulusan manual — langsung dari frontend */}
          <Button onClick={async () => {
            if (!confirm(
              'Proses kelulusan akan memindahkan SEMUA siswa kelas 12 ke data alumni.\n\n' +
              'Pastikan data kelas sudah benar sebelum melanjutkan.\n\nLanjutkan?'
            )) return;
            setLoading(true);
            try {
              // Ambil semua siswa kelas 12
              const allSiswa = await fetchSiswa();
              const kelas12 = allSiswa.filter(s => String(s.gradeLevel) === '12');

              if (kelas12.length === 0) {
                alert('Tidak ada siswa kelas 12 yang ditemukan.');
                return;
              }

              const tahunLulus = currentGraduationYear();
              let processed = 0;
              let skipped = 0;
              const errors: string[] = [];

              for (const siswa of kelas12) {
                if (!siswa.siswaId || !siswa.nis) { skipped++; continue; }
                try {
                  await graduateSiswa({
                    siswaId: siswa.siswaId,
                    nis: siswa.nis,
                    nama: siswa.name,
                    tahunLulus,
                    status: 'Lainnya',
                    jabatanAtauJurusan: siswa.peminatanName || undefined,
                    email: siswa.email || undefined,
                    telepon: siswa.phone || undefined,
                    alamat: siswa.address || undefined,
                  });
                  processed++;
                } catch (e: any) {
                  // NIS sudah ada di alumni = skip
                  if (e.message?.includes('unique') || e.message?.includes('duplicate')) {
                    skipped++;
                  } else {
                    errors.push(`${siswa.name}: ${e.message}`);
                  }
                }
              }

              addNotif({
                type: errors.length > 0 ? 'warning' : 'success',
                kind: 'akademik',
                title: 'Proses Kelulusan Selesai',
                body: `${processed} siswa dipindahkan ke alumni tahun ${tahunLulus}. ${skipped} dilewati (sudah ada). ${errors.length > 0 ? `${errors.length} gagal.` : ''}`,
              });
              await fetchUsersData();
            } catch (e: any) {
              alert('Gagal memproses kelulusan: ' + e.message);
            } finally {
              setLoading(false);
            }
          }} variant="outline" className="h-11 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-xl">
            <GraduationCap className="mr-2 h-4 w-4" /> Proses Kelulusan
          </Button>
          <Button onClick={async () => {
            if (!confirm('Buat data demo SMAIT Nur Hidayah? Termasuk 3 admin, 5 guru, 10 siswa, jurusan, dan kelas.')) return;
            setLoading(true);
            try {
              await seedDemoData();
              addNotif({
                type: 'success', kind: 'system',
                title: 'Data Demo Dibuat',
                body: 'Akun admin, guru, siswa, beserta jurusan dan kelas telah dibuat. Silakan periksa tab Pengguna.',
              });
              await fetchUsersData();
            }
            catch (e: any) { alert('Gagal: ' + e.message); }
            finally { setLoading(false); }
          }} variant="outline" className="h-11 border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-xl">
            <Zap className="mr-2 h-4 w-4" /> Buat Data Demo
          </Button>
          <Button onClick={async () => {
            if (!confirm('PERINGATAN: Ini akan menghapus SELURUH data pada basis data. Tindakan ini tidak dapat dibatalkan. Lanjutkan?')) return;
            setLoading(true);
            try {
              await clearAllData();
              addNotif({
                type: 'warning', kind: 'system',
                title: 'Basis Data Dikosongkan',
                body: 'Seluruh data pengguna, kelas, jadwal, dan nilai telah dihapus.',
              });
              await fetchUsersData();
            }
            catch (e: any) { alert('Gagal: ' + e.message); }
            finally { setLoading(false); }
          }} variant="outline" className="h-11 border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl">
            <Trash2 className="mr-2 h-4 w-4" /> Bersihkan Data
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-900/20 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Main Card */}
      <Card className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="p-6 border-b border-white/5">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <Tabs value={roleFilter} onValueChange={(v) => setRoleFilter(v)}>
              <TabsList className="bg-slate-950/50 p-1 h-auto rounded-xl border border-white/5">
                {[
                  { v: 'semua', label: `Semua (${users.length})` },
                  { v: 'siswa', label: 'Siswa' },
                  { v: 'guru', label: 'Guru' },
                  { v: 'admin', label: 'Admin' },
                ].map(({ v, label }) => (
                  <TabsTrigger key={v} value={v} className="h-9 px-5 font-semibold rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-2 items-center">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input placeholder="Cari nama, email, NIP, atau NIS..."
                  className="pl-10 h-11 bg-slate-950/50 border-white/5 rounded-xl text-white"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              {roleFilter === 'siswa' && (
                <Select value={tingkatFilter} onValueChange={(v) => setTingkatFilter(v || 'semua')}>
                  <SelectTrigger className="w-32 h-11 bg-slate-950/50 border-white/5 rounded-xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    <SelectItem value="semua">Semua Kls</SelectItem>
                    <SelectItem value="10">Kelas 10</SelectItem>
                    <SelectItem value="11">Kelas 11</SelectItem>
                    <SelectItem value="12">Kelas 12</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Button onClick={Object.values(visiblePasswords).some(Boolean) ? hideAllPasswords : showAllPasswords}
                variant="outline" className="h-11 px-4 rounded-xl border-white/5 bg-white/5 text-slate-300">
                {Object.values(visiblePasswords).some(Boolean) ? <><EyeOff className="h-4 w-4 mr-2" /> Sembunyi</> : <><Eye className="h-4 w-4 mr-2" /> Tampil Pwd</>}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-950/30">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-5">Identitas</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-5">Kontak & Kelas</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-5">Kredensial Login</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px] p-5 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-24">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                    <p className="mt-3 text-slate-500 text-sm">Memuat data dari Firebase Data Connect...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 group">
                  <TableCell className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold ${
                        user.role === 'guru' ? 'bg-blue-500/10 text-blue-400' :
                        user.role === 'siswa' ? 'bg-purple-500/10 text-purple-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white">{user.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">
                          {user.role === 'guru' ? `NIP ${user.nip}` : user.role === 'siswa' ? `NIS ${user.nis}` : 'Admin'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-5">
                    <div className="text-sm text-white">{user.email}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {user.className || (user.role === 'guru' ? (JABATAN_LABELS[user.jabatan || ''] || 'Guru') : user.role === 'admin' ? 'Operator Sistem' : '-')}
                    </div>
                  </TableCell>
                  <TableCell className="p-5">
                    <div className="bg-slate-950/40 px-3 py-2 rounded-lg border border-white/5 flex items-center gap-3 w-fit">
                      <span className={`text-slate-300 font-mono text-xs ${!visiblePasswords[user.id] ? 'tracking-widest opacity-60' : ''}`}>
                        {visiblePasswords[user.id] ? (user.password || '(belum di-set)') : '••••••••'}
                      </span>
                      <button onClick={() => togglePassword(user.id)} className="text-slate-500 hover:text-blue-400">
                        {visiblePasswords[user.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right p-5">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {user.role === 'siswa' && String(user.gradeLevel) === '12' && (
                        <Button variant="ghost" size="icon" onClick={() => handleOpenGraduate(user)}
                          className="h-9 w-9 text-emerald-500 hover:text-white hover:bg-emerald-600 rounded-lg"
                          title="Luluskan siswa ke data alumni">
                          <GraduationCap className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(user)}
                        className="h-9 w-9 text-blue-400 hover:text-white hover:bg-blue-600 rounded-lg">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(user.id)}
                        className="h-9 w-9 text-red-400 hover:text-white hover:bg-red-600 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-24">
                    <div className="max-w-xs mx-auto">
                      <div className="h-16 w-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 opacity-40">📭</div>
                      <p className="text-lg font-bold text-slate-400">Belum ada pengguna</p>
                      <p className="text-sm text-slate-500 mt-1 mb-4">Mulai dengan menambahkan manual atau import Excel.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ========== Add / Edit Dialog ========== */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-lg rounded-3xl p-0 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <DialogTitle className="text-xl font-bold text-white">
              {editingUser ? 'Ubah Pengguna' : 'Tambah Pengguna Baru'}
            </DialogTitle>
            <p className="text-slate-400 text-xs mt-1">Data akan disimpan ke Firebase Cloud SQL.</p>
          </div>

          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {!editingUser && (
              <FormField label="Role Pengguna">
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger className="h-11 bg-slate-900 border-white/5 rounded-xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    <SelectItem value="guru">Guru / Pengajar</SelectItem>
                    <SelectItem value="siswa">Siswa</SelectItem>
                    <SelectItem value="admin">Admin / Operator</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            )}

            <FormField label="Nama Lengkap" required>
              <Input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama sesuai dokumen resmi"
                className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
            </FormField>

            {(formData.role === 'guru' || editingUser?.role === 'guru') && (
              <>
                <FormField label="NIP (kosongkan untuk auto-generate)">
                  <Input value={formData.nip || ''} onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    placeholder="Otomatis jika kosong"
                    disabled={!!editingUser}
                    className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
                </FormField>
                <FormField label="Jabatan Struktural">
                  <Select value={formData.jabatan} onValueChange={(v) => setFormData({ ...formData, jabatan: v })}>
                    <SelectTrigger className="h-11 bg-slate-900 border-white/5 rounded-xl text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      {JABATAN_GURU.map(j => <SelectItem key={j} value={j}>{JABATAN_LABELS[j]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mata Pelajaran / Spesialisasi">
                  <Input value={formData.specialization || ''} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="Contoh: Matematika"
                    className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
                </FormField>
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Jenis Kelamin">
                <Select value={formData.gender || 'L'} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                  <SelectTrigger className="h-11 bg-slate-900 border-white/5 rounded-xl text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Telepon">
                <Input value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08xxx"
                  className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Tempat Lahir">
                <Input value={formData.birthPlace || ''} onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
              </FormField>
              <FormField label="Tanggal Lahir">
                <Input type="date" value={formData.birthDate || ''} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="h-11 bg-slate-900 border-white/5 rounded-xl text-white [color-scheme:dark]" />
              </FormField>
            </div>

            <FormField label="Alamat">
              <Input value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
            </FormField>

            {(formData.role === 'siswa' || editingUser?.role === 'siswa') && (
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Kelas">
                  <LookupSelect
                    value={formData.classId || ''}
                    onChange={(v) => setFormData({ ...formData, classId: v })}
                    items={kelasList.map(k => ({ value: k.id, label: k.name, hint: `Kelas ${k.level}` }))}
                    placeholder={kelasList.length ? 'Pilih kelas' : 'Memuat...'}
                    allowEmpty
                    emptyLabel="Belum Ditempatkan"
                    className="h-11 bg-slate-900 border-white/5 rounded-xl text-white"
                  />
                </FormField>
                <FormField label="Jurusan">
                  <LookupSelect
                    value={formData.majorId || ''}
                    onChange={(v) => setFormData({ ...formData, majorId: v })}
                    items={jurusanList.map(j => ({ value: j.id, label: `${j.kode} — ${j.nama}`, hint: j.nama }))}
                    placeholder={jurusanList.length ? 'Pilih jurusan' : 'Memuat...'}
                    allowEmpty
                    emptyLabel="Tanpa Jurusan"
                    className="h-11 bg-slate-900 border-white/5 rounded-xl text-white"
                  />
                </FormField>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5 flex gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-11 rounded-xl text-slate-300">Batal</Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : editingUser ? 'Simpan Perubahan' : 'Buat Akun'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========== Import Modal ========== */}
      <Dialog open={isImportModalOpen} onOpenChange={(o) => { if (!o && !importProgress) { setIsImportModalOpen(false); setImportResults([]); } }}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-2xl rounded-3xl p-0 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-gradient-to-br from-emerald-600/10 to-transparent">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-emerald-400" /> Impor Pengguna dari Excel
            </DialogTitle>
            <p className="text-slate-400 text-xs mt-1">Unggah berkas .xlsx sesuai templat. Surel dan kata sandi dibuat otomatis oleh sistem.</p>
          </div>

          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {!importProgress && importResults.length === 0 && (
              <>
                {/* Type selector */}
                <div className="flex gap-2">
                  <button onClick={() => setImportType('siswa')}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${importType === 'siswa' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}>
                    <div className="text-white font-bold">Siswa</div>
                    <div className="text-xs text-slate-500 mt-0.5">Bulk import siswa baru</div>
                  </button>
                  <button onClick={() => setImportType('guru')}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${importType === 'guru' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}>
                    <div className="text-white font-bold">Guru</div>
                    <div className="text-xs text-slate-500 mt-0.5">Bulk import pengajar</div>
                  </button>
                </div>

                {/* Template download */}
                <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/15 space-y-3">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-bold text-sm">Template Excel {importType === 'siswa' ? 'Siswa' : 'Guru'}</p>
                      <p className="text-xs text-slate-400">Unduh templat, isi data Anda, lalu unggah kembali.</p>
                    </div>
                  </div>
                  <Button onClick={() => downloadTemplate(importType)} className="w-full bg-blue-600 hover:bg-blue-500 h-10 rounded-xl font-bold">
                    <Download className="mr-2 h-4 w-4" /> Unduh Templat {importType === 'siswa' ? 'Siswa' : 'Guru'}
                  </Button>
                  <div className="text-[11px] text-slate-500 pt-2 border-t border-white/5">
                    <p className="font-bold text-slate-400 mb-1">Kolom yang dibutuhkan:</p>
                    <ol className="list-decimal list-inside space-y-0.5">
                      {(importType === 'siswa' ? SISWA_TEMPLATE_COLUMNS : GURU_TEMPLATE_COLUMNS).map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Upload button */}
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImportExcel(f); e.target.value = ''; }} />
                <Button onClick={() => fileInputRef.current?.click()} className="w-full bg-emerald-600 hover:bg-emerald-500 h-12 rounded-xl font-bold">
                  <Upload className="mr-2 h-5 w-5" /> Pilih File Excel & Mulai Import
                </Button>
              </>
            )}

            {/* Progress */}
            {importProgress && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Memproses...</span>
                    <span className="text-white font-bold">{importProgress.done} / {importProgress.total}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all"
                      style={{ width: `${(importProgress.done / importProgress.total) * 100}%` }} />
                  </div>
                </div>
                {importProgress.errors.length > 0 && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl max-h-32 overflow-y-auto">
                    <p className="text-xs font-bold text-red-400 mb-1">{importProgress.errors.length} error:</p>
                    {importProgress.errors.slice(-5).map((e, i) => (
                      <p key={i} className="text-xs text-red-300 font-mono">{e}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Results */}
            {!importProgress && importResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">Import selesai!</p>
                    <p className="text-sm text-emerald-300">{importResults.length} akun baru berhasil dibuat.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => exportImportResults('xlsx')} className="flex-1 bg-teal-600 hover:bg-teal-500 h-11 rounded-xl font-bold">
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Unduh Excel
                  </Button>
                  <Button onClick={() => exportImportResults('pdf')} className="flex-1 bg-rose-600 hover:bg-rose-500 h-11 rounded-xl font-bold">
                    <FileText className="mr-2 h-4 w-4" /> Unduh PDF
                  </Button>
                </div>

                <div className="max-h-60 overflow-y-auto rounded-xl border border-white/5">
                  <Table>
                    <TableHeader className="bg-slate-950/50">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-[10px] text-slate-400 font-bold">Nama</TableHead>
                        <TableHead className="text-[10px] text-slate-400 font-bold">Email</TableHead>
                        <TableHead className="text-[10px] text-slate-400 font-bold">Password</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importResults.map((r, i) => (
                        <TableRow key={i} className="border-white/5">
                          <TableCell className="text-sm text-white py-2">{r.name}</TableCell>
                          <TableCell className="text-xs text-slate-300 font-mono py-2">{r.email}</TableCell>
                          <TableCell className="text-xs text-yellow-400 font-mono py-2">{r.password}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button onClick={() => { setIsImportModalOpen(false); setImportResults([]); }}
                  variant="outline" className="w-full h-11 rounded-xl border-white/5 bg-white/5 text-slate-300">
                  Tutup
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ========== Delete Confirmation ========== */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-slate-950 border border-red-500/10 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">Hapus Pengguna?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Data pengguna beserta relasi role (guru/siswa) akan dihapus permanen. Lanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 border-white/5 bg-white/5 text-slate-300 rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-11 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ========== Graduate Student Dialog ========== */}
      <Dialog open={isGraduateOpen} onOpenChange={setIsGraduateOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 max-w-lg rounded-3xl p-0 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-emerald-500/5">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-400" /> Luluskan Siswa
            </DialogTitle>
            <p className="text-slate-400 text-xs mt-1">
              Data siswa akan dipindahkan ke <b>Alumni</b>. Nilai dan prestasi tetap tersimpan.
            </p>
          </div>

          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {graduateTarget && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Siswa</p>
                <p className="text-white font-semibold mt-0.5">{graduateTarget.name}</p>
                <p className="text-xs text-slate-400 font-mono">NIS {graduateTarget.nis} · {graduateTarget.className || 'Tanpa kelas'}</p>
              </div>
            )}

            <FormField label="Tahun Lulus" required>
              <Input type="number" value={graduateForm.tahunLulus}
                onChange={(e) => setGraduateForm({ ...graduateForm, tahunLulus: parseInt(e.target.value, 10) || currentGraduationYear() })}
                className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
            </FormField>

            <FormField label="Status Setelah Lulus" required>
              <Select value={graduateForm.status}
                onValueChange={(v) => setGraduateForm({ ...graduateForm, status: v as 'Kuliah' | 'Kerja' | 'Lainnya' })}>
                <SelectTrigger className="h-11 bg-slate-900 border-white/5 rounded-xl text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="Kuliah">Kuliah</SelectItem>
                  <SelectItem value="Kerja">Kerja</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label={graduateForm.status === 'Kerja' ? 'Nama Perusahaan / Instansi' : 'Nama Universitas / Institusi'}>
              <Input value={graduateForm.institusi}
                onChange={(e) => setGraduateForm({ ...graduateForm, institusi: e.target.value })}
                placeholder={graduateForm.status === 'Kerja' ? 'Contoh: PT. Astra International' : 'Contoh: Universitas Gadjah Mada'}
                className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
            </FormField>

            <FormField label={graduateForm.status === 'Kerja' ? 'Jabatan / Posisi' : 'Program Studi / Jurusan'}>
              <Input value={graduateForm.jabatanAtauJurusan}
                onChange={(e) => setGraduateForm({ ...graduateForm, jabatanAtauJurusan: e.target.value })}
                placeholder={graduateForm.status === 'Kerja' ? 'Contoh: Software Engineer' : 'Contoh: Teknik Informatika'}
                className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
            </FormField>

            <FormField label="Catatan Prestasi (opsional)">
              <Input value={graduateForm.prestasi}
                onChange={(e) => setGraduateForm({ ...graduateForm, prestasi: e.target.value })}
                placeholder="Beasiswa, juara, dll"
                className="h-11 bg-slate-900 border-white/5 rounded-xl text-white" />
            </FormField>

            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-300 leading-relaxed">
              Data akan masuk ke menu <b>Alumni</b>. Admin & BK bisa memperbarui
              institusi/jabatan kapan saja saat ada update dari alumni.
            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsGraduateOpen(false)}
              className="h-11 px-5 rounded-xl text-slate-300 hover:bg-white/5">Batal</Button>
            <Button onClick={handleGraduate} disabled={graduating}
              className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
              {graduating ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <><GraduationCap className="h-4 w-4 mr-2" /> Luluskan ke Alumni</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account info after add */}
      {newAccountInfo && <AccountInfoModal info={newAccountInfo} onClose={() => setNewAccountInfo(null)} />}
    </div>
  );
}
