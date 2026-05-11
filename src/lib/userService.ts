/**
 * userService.ts
 * Service layer untuk manajemen pengguna SIAKAD
 */

import {
  createPengguna,
  createGuru,
  createSiswa,
  updatePengguna,
  updateGuru,
  updateSiswa,
  deletePengguna,
  deleteGuru,
  deleteSiswa,
  resetDatabase,
  getPengguna,
  getGuruByPengguna,
  getSiswaByPengguna,
  listGuru,
  listSemuaSiswa,
  listSiswaByKelas,
  listPengguna,
  getLastNip,
  getLastNis,
  JenisKelamin,
  PeranPengguna,
  JabatanGuru,
} from '@uassiakad/connector';

import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@uassiakad/connector';
import { app } from './firebase';

export const dataConnect = getDataConnect(app, connectorConfig);

// ============================================================
// PAYLOAD TYPES
// ============================================================

export interface CreateGuruPayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  specialization?: string;
  gender: 'L' | 'P';
  birthPlace?: string;
  birthDate?: string;       // "YYYY-MM-DD"
  jabatan?: string;         // Guru / WaliKelas / Kepsek / WakilKepsek / BK
  nip?: string;             // Manual input
}

export interface CreateSiswaPayload {
  name: string;
  email?: string;
  gender: 'L' | 'P';
  birthPlace?: string;
  birthDate?: string;       // "YYYY-MM-DD"
  address?: string;
  phone?: string;
  classId?: string;
  majorId?: string;
  tahunMasuk?: number;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'guru' | 'siswa' | 'admin';
  phone?: string | null;
  address?: string | null;
  nip?: string;
  nis?: string;
  jabatan?: string | null;
  specialization?: string | null;
  className?: string | null;
  gradeLevel?: number | null;
  gender?: string;
  birthPlace?: string | null;
  birthDate?: string | null;
  tahunMasuk?: number | null;
  guruId?: string;
  siswaId?: string;
  kelasId?: string | null;
  jurusanId?: string | null;
  jurusanName?: string | null;
  peminatanId?: string | null;
  peminatanName?: string | null;
}

// ============================================================
// AUTO-GENERATE NIP
// Format: NIP{tahun}{5-digit-urutan}
// ============================================================

export async function generateNIP(): Promise<string> {
  try {
    const result = await getLastNip(dataConnect);
    const gurus = result.data.gurus;
    const year = new Date().getFullYear();
    if (!gurus || gurus.length === 0) return `NIP${year}00001`;
    const lastSeq = parseInt(gurus[0].nip.slice(-5), 10);
    const nextSeq = (lastSeq + 1).toString().padStart(5, '0');
    return `NIP${year}${nextSeq}`;
  } catch {
    const year = new Date().getFullYear();
    return `NIP${year}${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`;
  }
}

// ============================================================
// AUTO-GENERATE NIS
// Format: NIS{2-digit-tahun}{4-digit-urutan}
// ============================================================

export async function generateNIS(): Promise<string> {
  try {
    const result = await getLastNis(dataConnect);
    const siswas = result.data.siswas;
    const year = new Date().getFullYear().toString().slice(-2);
    if (!siswas || siswas.length === 0) return `NIS${year}0001`;
    const lastSeq = parseInt(siswas[0].nis.slice(-4), 10);
    return `NIS${year}${(lastSeq + 1).toString().padStart(4, '0')}`;
  } catch {
    const year = new Date().getFullYear().toString().slice(-2);
    return `NIS${year}${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
  }
}

// ============================================================
// HELPERS
// ============================================================

function generateGuruEmail(name: string, nip: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '');
  return `${slug}.${nip.slice(-5)}@guru.sma.sch.id`;
}

function generateSiswaEmail(nis: string): string {
  return `${nis.toLowerCase()}@siswa.sma.sch.id`;
}

function toJabatanGuru(val?: string): JabatanGuru {
  const map: Record<string, JabatanGuru> = {
    WaliKelas: JabatanGuru.WaliKelas,
    Kepsek: JabatanGuru.Kepsek,
    WakilKepsek: JabatanGuru.WakilKepsek,
    BK: JabatanGuru.BK,
    Guru: JabatanGuru.Guru,
  };
  return map[val ?? 'Guru'] ?? JabatanGuru.Guru;
}

// ============================================================
// CREATE GURU
// ============================================================

export async function createGuruWithAccount(payload: CreateGuruPayload): Promise<{
  userId: string;
  guruId: string;
  nip: string;
  email: string;
  defaultPassword: string;
}> {
  const nip = payload.nip || await generateNIP();
  const email = payload.email || generateGuruEmail(payload.name, nip);
  // Demo-friendly password for easy login during presentations
  const defaultPassword = email.endsWith('@demo.com') ? 'Guru@123' : `Guru@${nip.slice(-5)}`;

  const userResult = await createPengguna(dataConnect, {
    email,
    password: defaultPassword,
    nama: payload.name,
    peran: PeranPengguna.guru,
    telepon: payload.phone,
    alamat: payload.address,
  });

  const userId = userResult.data.pengguna_insert.id;

  const guruResult = await createGuru(dataConnect, {
    penggunaId: userId,
    nip,
    jenisKelamin: payload.gender === 'P' ? JenisKelamin.P : JenisKelamin.L,
    tempatLahir: payload.birthPlace || undefined,
    tanggalLahir: payload.birthDate || undefined,
    jabatan: toJabatanGuru(payload.jabatan),
    spesialisasi: payload.specialization || undefined,
  });

  const guruId = guruResult.data.guru_insert.id;

  return { userId, guruId, nip, email, defaultPassword };
}

// ============================================================
// CREATE SISWA
// ============================================================

export async function createSiswaWithAccount(payload: CreateSiswaPayload): Promise<{
  userId: string;
  siswaId: string;
  nis: string;
  email: string;
  defaultPassword: string;
}> {
  const nis = await generateNIS();
  const email = payload.email || generateSiswaEmail(nis);
  // Demo-friendly password for easy login during presentations
  const defaultPassword = email.endsWith('@demo.com') ? 'Siswa@123' : `Siswa@${nis.slice(-6)}`;

  const userResult = await createPengguna(dataConnect, {
    email,
    password: defaultPassword,
    nama: payload.name,
    peran: PeranPengguna.siswa,
    telepon: payload.phone,
    alamat: payload.address,
  });

  const userId = userResult.data.pengguna_insert.id;

  const siswaResult = await createSiswa(dataConnect, {
    penggunaId: userId,
    nis,
    jenisKelamin: payload.gender === 'L' ? JenisKelamin.L : JenisKelamin.P,
    tempatLahir: payload.birthPlace || undefined,
    tanggalLahir: payload.birthDate || undefined,
    alamat: payload.address || undefined,
    jurusanId: payload.majorId || undefined,
    kelasId: payload.classId || undefined,
    tahunMasuk: payload.tahunMasuk ?? new Date().getFullYear(),
  });

  const siswaId = siswaResult.data.siswa_insert.id;

  return { userId, siswaId, nis, email, defaultPassword };
}

// ============================================================
// CREATE ADMIN
// ============================================================

export async function createAdminWithAccount(payload: { name: string; email?: string; phone?: string; address?: string }): Promise<{
  userId: string;
  email: string;
  defaultPassword: string;
}> {
  const email = payload.email || `${payload.name.toLowerCase().replace(/\s+/g, '')}@admin.sma.sch.id`;
  const defaultPassword = `Admin@123`;

  const userResult = await createPengguna(dataConnect, {
    email,
    password: defaultPassword,
    nama: payload.name,
    peran: PeranPengguna.admin,
    telepon: payload.phone || undefined,
    alamat: payload.address || undefined,
  });

  const userId = userResult.data.pengguna_insert.id;

  return { userId, email, defaultPassword };
}

// ============================================================
// FETCH LIST
// ============================================================

export async function fetchGuru(): Promise<UserListItem[]> {
  const result = await listGuru(dataConnect);
  return result.data.gurus.map((t) => ({
    id: t.pengguna.id,
    guruId: t.id,
    name: t.pengguna.nama,
    email: t.pengguna.email,
    password: (t.pengguna as any).password,
    role: 'guru' as const,
    phone: t.pengguna.telepon,
    address: t.pengguna.alamat,
    nip: t.nip,
    jabatan: t.jabatan,
    specialization: t.spesialisasi,
    gender: t.jenisKelamin,
    birthPlace: t.tempatLahir,
    birthDate: t.tanggalLahir,
  }));
}

export async function fetchSiswa(classId?: string): Promise<UserListItem[]> {
  const result = classId 
    ? await listSiswaByKelas(dataConnect, { kelasId: classId })
    : await listSemuaSiswa(dataConnect);
  return result.data.siswas.map((s) => ({
    id: s.pengguna.id,
    siswaId: s.id,
    name: s.pengguna.nama,
    email: s.pengguna.email,
    password: (s.pengguna as any).password,
    role: 'siswa' as const,
    phone: s.pengguna.telepon,
    address: s.alamat,
    nis: s.nis,
    gender: s.jenisKelamin,
    birthPlace: s.tempatLahir,
    birthDate: s.tanggalLahir ? String(s.tanggalLahir) : null,
    className: s.kelas?.nama ?? null,
    kelasId: s.kelas?.id ?? null,
    gradeLevel: s.kelas?.tingkat ?? null,
    tahunMasuk: s.tahunMasuk ?? null,
    jurusanId: (s as any).jurusan?.id ?? null,
    jurusanName: (s as any).jurusan?.nama ?? null,
    peminatanId: (s as any).peminatan?.id ?? null,
    peminatanName: (s as any).peminatan?.nama ?? null,
  }));
}

export async function fetchAdmin(): Promise<UserListItem[]> {
  const result = await listPengguna(dataConnect, { peran: PeranPengguna.admin });
  return result.data.penggunas.map((u) => ({
    id: u.id,
    name: u.nama,
    email: u.email,
    password: (u as any).password,
    role: 'admin' as const,
    phone: u.telepon,
    address: u.alamat,
  }));
}

// ============================================================
// UPDATE
// ============================================================

export async function updateGuruData(userId: string, guruId: string, data: {
  jabatan?: string;
  specialization?: string;
  name?: string;
  phone?: string;
  address?: string;
  birthPlace?: string;
  birthDate?: string;
}) {
  await updatePengguna(dataConnect, { id: userId, nama: data.name, telepon: data.phone, alamat: data.address });
  await updateGuru(dataConnect, {
    id: guruId,
    jabatan: data.jabatan ? toJabatanGuru(data.jabatan) : undefined,
    spesialisasi: data.specialization || undefined,
    tempatLahir: data.birthPlace || undefined,
    tanggalLahir: data.birthDate || undefined,
  });
}

export async function updateSiswaData(userId: string, siswaId: string, data: {
  classId?: string;
  majorId?: string;
  birthPlace?: string;
  birthDate?: string;
  name?: string;
  phone?: string;
  address?: string;
}) {
  await updatePengguna(dataConnect, { id: userId, nama: data.name, telepon: data.phone, alamat: data.address });
  await updateSiswa(dataConnect, {
    id: siswaId,
    kelasId: data.classId || undefined,
    jurusanId: data.majorId || undefined,
    tempatLahir: data.birthPlace || undefined,
    tanggalLahir: data.birthDate || undefined,
    alamat: data.address || undefined,
  });
}

export async function updateAdminData(userId: string, data: { name?: string; phone?: string; address?: string }) {
  await updatePengguna(dataConnect, { id: userId, nama: data.name, telepon: data.phone || undefined, alamat: data.address || undefined });
}

// ============================================================
// DELETE
// ============================================================

export async function deleteUserById(userId: string) {
  try {
    // 1. Fetch the user to determine role
    const userRes = await getPengguna(dataConnect, { id: userId });
    if (!userRes.data.pengguna) return;
    
    const user = userRes.data.pengguna;
    
    // 2. Delete related records based on role
    if (user.peran === PeranPengguna.guru) {
      const gurus = await getGuruByPengguna(dataConnect, { penggunaId: userId });
      if (gurus.data.gurus.length > 0) {
        await deleteGuru(dataConnect, { id: gurus.data.gurus[0].id });
      }
    } else if (user.peran === PeranPengguna.siswa) {
      const siswas = await getSiswaByPengguna(dataConnect, { penggunaId: userId });
      if (siswas.data.siswas.length > 0) {
        await deleteSiswa(dataConnect, { id: siswas.data.siswas[0].id });
      }
    }

    // 3. Finally delete the Pengguna record
    await deletePengguna(dataConnect, { id: userId });
  } catch (e) {
    console.error("Error deleting user:", e);
    throw e;
  }
}

/**
 * MENGHAPUS SELURUH DATA DARI DATABASE
 * Gunakan dengan sangat hati-hati!
 */
export async function clearAllData() {
  return await resetDatabase(dataConnect);
}

export async function seedDemoData() {
  try {
    // --- 1. JURUSAN ---
    const { createJurusan, createMataPelajaran, createKelas } = await import('@uassiakad/connector');

    const jurusanList = [
      { kode: 'MIPA', nama: 'Matematika dan Ilmu Pengetahuan Alam' },
      { kode: 'IPS', nama: 'Ilmu Pengetahuan Sosial' },
      { kode: 'BHS', nama: 'Bahasa dan Budaya' },
    ];
    const jurusanIds: Record<string, string> = {};
    for (const j of jurusanList) {
      try {
        const r = await createJurusan(dataConnect, j);
        jurusanIds[j.kode] = r.data.jurusan_insert.id;
      } catch (e) { /* mungkin sudah ada */ }
    }

    // --- 2. MATA PELAJARAN ---
    const mapelList = [
      { kode: 'MTK', nama: 'Matematika' },
      { kode: 'BIN', nama: 'Bahasa Indonesia' },
      { kode: 'BIG', nama: 'Bahasa Inggris' },
      { kode: 'FIS', nama: 'Fisika' },
      { kode: 'KIM', nama: 'Kimia' },
      { kode: 'BIO', nama: 'Biologi' },
      { kode: 'SEJ', nama: 'Sejarah' },
      { kode: 'PKN', nama: 'Pendidikan Kewarganegaraan' },
    ];
    for (const m of mapelList) {
      try { await createMataPelajaran(dataConnect, m); } catch (e) { /* skip if exists */ }
    }

    // --- 3. ADMIN (3 akun) ---
    const admins = [
      { name: 'Super Administrator', email: 'admin@demo.com' },
      { name: 'Kepala Tata Usaha', email: 'katu@demo.com' },
      { name: 'Staff Admin', email: 'staff@demo.com' },
    ];
    for (const a of admins) {
      try { await createAdminWithAccount(a); } catch (e) { /* skip */ }
    }

    // --- 4. GURU (5 akun dengan jabatan berbeda) ---
    const guruList: CreateGuruPayload[] = [
      { name: 'Dr. Suyanto, M.Pd', email: 'kepsek@demo.com', gender: 'L', jabatan: 'Kepsek', specialization: 'Manajemen Pendidikan', nip: '196501011990031001', birthPlace: 'Yogyakarta', birthDate: '1965-01-01', phone: '081234567001' },
      { name: 'Dra. Rina Kusuma, M.Pd', email: 'wakepsek@demo.com', gender: 'P', jabatan: 'WakilKepsek', specialization: 'Kurikulum', nip: '197003151995032002', birthPlace: 'Solo', birthDate: '1970-03-15', phone: '081234567002' },
      { name: 'Budi Santoso, S.Pd', email: 'guru@demo.com', gender: 'L', jabatan: 'WaliKelas', specialization: 'Matematika', nip: '198505202010011003', birthPlace: 'Jakarta', birthDate: '1985-05-20', phone: '081234567003' },
      { name: 'Siti Aminah, S.Pd', email: 'guru.siti@demo.com', gender: 'P', jabatan: 'Guru', specialization: 'Bahasa Indonesia', nip: '198807102012032004', birthPlace: 'Bandung', birthDate: '1988-07-10', phone: '081234567004' },
      { name: 'Ahmad Fauzi, S.Pd, M.Psi', email: 'guru.bk@demo.com', gender: 'L', jabatan: 'BK', specialization: 'Bimbingan Konseling', nip: '199002252015031005', birthPlace: 'Surabaya', birthDate: '1990-02-25', phone: '081234567005' },
    ];
    const guruIds: string[] = [];
    for (const g of guruList) {
      try {
        const r = await createGuruWithAccount(g);
        guruIds.push(r.guruId);
      } catch (e) { console.error('Skip guru:', (e as any).message); }
    }

    // --- 5. KELAS (pakai wali kelas dari guru yang baru dibuat) ---
    const kelasData = [
      { nama: 'X-MIPA-1', tingkat: 10, tahunAjaran: '2024/2025', jurusanId: jurusanIds['MIPA'], waliKelasId: guruIds[2] },
      { nama: 'X-IPS-1', tingkat: 10, tahunAjaran: '2024/2025', jurusanId: jurusanIds['IPS'], waliKelasId: guruIds[3] },
      { nama: 'XI-MIPA-1', tingkat: 11, tahunAjaran: '2024/2025', jurusanId: jurusanIds['MIPA'], waliKelasId: guruIds[2] },
      { nama: 'XII-MIPA-1', tingkat: 12, tahunAjaran: '2024/2025', jurusanId: jurusanIds['MIPA'], waliKelasId: guruIds[4] },
    ];
    const kelasIds: string[] = [];
    for (const k of kelasData) {
      try {
        const r = await createKelas(dataConnect, k as any);
        kelasIds.push(r.data.kelas_insert.id);
      } catch (e) { /* skip */ }
    }

    // --- 6. SISWA (10 akun tersebar di beberapa kelas) ---
    const siswaList: CreateSiswaPayload[] = [
      { name: 'Yusuf Ramadhan', email: 'siswa@demo.com', gender: 'L', birthPlace: 'Jakarta', birthDate: '2008-05-15', address: 'Jl. Merdeka No. 1', phone: '081200000001', classId: kelasIds[2], majorId: jurusanIds['MIPA'], tahunMasuk: 2023 },
      { name: 'Aisha Putri', email: 'siswa.aisha@demo.com', gender: 'P', birthPlace: 'Bandung', birthDate: '2008-08-22', address: 'Jl. Sudirman No. 10', phone: '081200000002', classId: kelasIds[2], majorId: jurusanIds['MIPA'], tahunMasuk: 2023 },
      { name: 'Rizky Pratama', email: 'siswa.rizky@demo.com', gender: 'L', birthPlace: 'Surabaya', birthDate: '2009-02-10', address: 'Jl. Diponegoro No. 5', phone: '081200000003', classId: kelasIds[0], majorId: jurusanIds['MIPA'], tahunMasuk: 2024 },
      { name: 'Indah Permata', email: 'siswa.indah@demo.com', gender: 'P', birthPlace: 'Yogyakarta', birthDate: '2009-06-18', address: 'Jl. Malioboro No. 20', phone: '081200000004', classId: kelasIds[0], majorId: jurusanIds['MIPA'], tahunMasuk: 2024 },
      { name: 'Farhan Maulana', email: 'siswa.farhan@demo.com', gender: 'L', birthPlace: 'Medan', birthDate: '2009-11-03', address: 'Jl. Gatot Subroto No. 7', phone: '081200000005', classId: kelasIds[1], majorId: jurusanIds['IPS'], tahunMasuk: 2024 },
      { name: 'Dewi Anggraini', email: 'siswa.dewi@demo.com', gender: 'P', birthPlace: 'Semarang', birthDate: '2009-04-27', address: 'Jl. Pahlawan No. 33', phone: '081200000006', classId: kelasIds[1], majorId: jurusanIds['IPS'], tahunMasuk: 2024 },
      { name: 'Bagas Wicaksana', email: 'siswa.bagas@demo.com', gender: 'L', birthPlace: 'Malang', birthDate: '2007-09-12', address: 'Jl. Veteran No. 15', phone: '081200000007', classId: kelasIds[3], majorId: jurusanIds['MIPA'], tahunMasuk: 2022 },
      { name: 'Citra Lestari', email: 'siswa.citra@demo.com', gender: 'P', birthPlace: 'Palembang', birthDate: '2007-12-01', address: 'Jl. Ahmad Yani No. 8', phone: '081200000008', classId: kelasIds[3], majorId: jurusanIds['MIPA'], tahunMasuk: 2022 },
      { name: 'Doni Saputra', email: 'siswa.doni@demo.com', gender: 'L', birthPlace: 'Denpasar', birthDate: '2008-07-19', address: 'Jl. Imam Bonjol No. 12', phone: '081200000009', classId: kelasIds[2], majorId: jurusanIds['MIPA'], tahunMasuk: 2023 },
      { name: 'Eka Wulandari', email: 'siswa.eka@demo.com', gender: 'P', birthPlace: 'Makassar', birthDate: '2008-03-30', address: 'Jl. Urip Sumoharjo No. 22', phone: '081200000010', classId: kelasIds[2], majorId: jurusanIds['MIPA'], tahunMasuk: 2023 },
    ];
    for (const s of siswaList) {
      try { await createSiswaWithAccount(s); } catch (e) { console.error('Skip siswa:', (e as any).message); }
    }

    return {
      admin: admins.length,
      guru: guruList.length,
      siswa: siswaList.length,
      kelas: kelasData.length,
      jurusan: jurusanList.length,
      mapel: mapelList.length,
    };
  } catch (e) {
    console.error("Error seeding demo data:", e);
    throw e;
  }
}
