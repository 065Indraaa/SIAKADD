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
  const nip = await generateNIP();
  const email = payload.email || generateGuruEmail(payload.name, nip);
  const defaultPassword = `Guru@${nip.slice(-5)}`;

  const userResult = await createPengguna(dataConnect, {
    email,
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
    tempatLahir: payload.birthPlace,
    tanggalLahir: payload.birthDate,
    jabatan: toJabatanGuru(payload.jabatan),
    spesialisasi: payload.specialization,
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
  const defaultPassword = `Siswa@${nis.slice(-6)}`;

  const userResult = await createPengguna(dataConnect, {
    email,
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
    tempatLahir: payload.birthPlace,
    tanggalLahir: payload.birthDate,
    alamat: payload.address,
    jurusanId: payload.majorId,
    kelasId: payload.classId,
    tahunMasuk: payload.tahunMasuk ?? new Date().getFullYear(),
  });

  const siswaId = siswaResult.data.siswa_insert.id;

  return { userId, siswaId, nis, email, defaultPassword };
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
    role: 'siswa' as const,
    phone: s.pengguna.telepon,
    address: s.alamat,
    nis: s.nis,
    gender: s.jenisKelamin,
    birthPlace: s.tempatLahir,
    birthDate: s.tanggalLahir ? String(s.tanggalLahir) : null,
    className: s.kelas?.nama ?? null,
    gradeLevel: s.kelas?.tingkat ?? null,
    tahunMasuk: s.tahunMasuk ?? null,
  }));
}

export async function fetchAdmin(): Promise<UserListItem[]> {
  const result = await listPengguna(dataConnect, { peran: PeranPengguna.admin });
  return result.data.penggunas.map((u) => ({
    id: u.id,
    name: u.nama,
    email: u.email,
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
    spesialisasi: data.specialization,
    tempatLahir: data.birthPlace,
    tanggalLahir: data.birthDate,
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
    kelasId: data.classId,
    jurusanId: data.majorId,
    tempatLahir: data.birthPlace,
    tanggalLahir: data.birthDate,
    alamat: data.address,
  });
}

// ============================================================
// DELETE
// ============================================================

export async function deleteUserById(userId: string) {
  await deletePengguna(dataConnect, { id: userId });
}
