import {
  listSemuaKelas,
  listKelasByTingkat,
  createKelas,
  updateKelas,
  deleteKelas,
  listJurusan,
  listMataPelajaran,
  createMataPelajaran,
  updateMataPelajaran,
  deleteMataPelajaran,
  createJurusan,
  updateJurusan,
  deleteJurusan,
  getJadwalByKelas,
  getJadwalByGuru,
  getNilaiBySiswa,
  getNilaiByKelas,
  upsertNilai,
  listPrestasi,
  createPrestasi,
  listAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
  getPenggunaByEmail,
  updateSiswaPeminatan,
  StatusAlumni,
  TipePrestasi,
  listSemuaKelasRef,
  listKelasByTingkatRef,
  listJurusanRef,
  listMataPelajaranRef,
  getJadwalByKelasRef,
  getJadwalByGuruRef,
  getNilaiBySiswaRef,
  getNilaiByKelasRef,
  listPrestasiRef,
  listAlumniRef,
} from '@uassiakad/connector';
import { executeQuery } from 'firebase/data-connect';

import { dataConnect } from './userService';
import { currentTahunAjaran } from './tahunAjaran';

// Helper: selalu fetch dari server, tidak pakai cache
const NO_CACHE = { fetchPolicy: 'SERVER_ONLY' as const };

// ============================================================
// KELAS
// ============================================================
export async function fetchKelas(tingkat?: number) {
  const ref = tingkat
    ? listKelasByTingkatRef(dataConnect, { tingkat })
    : listSemuaKelasRef(dataConnect);
  const res = await executeQuery(ref, NO_CACHE);
  return res.data.kelass.map((k) => ({
    id: k.id,
    name: k.nama,
    level: k.tingkat.toString(),
    homeroom: k.waliKelas?.pengguna.nama || 'Belum Diatur',
    homeroomId: k.waliKelas?.id || '',
    jurusan: k.jurusan?.nama || '',
    jurusanId: k.jurusan?.id || '',
    students: 0 // Mocking/Aggregations not easily done without a specific query, but good enough for structure
  }));
}

export async function addKelas(data: any) {
  return await createKelas(dataConnect, {
    nama: data.name,
    tingkat: parseInt(data.level),
    tahunAjaran: data.tahunAjaran || currentTahunAjaran(),
    jurusanId: data.jurusanId,
    waliKelasId: data.waliKelasId
  });
}

export async function editKelas(id: string, data: any) {
  return await updateKelas(dataConnect, {
    id,
    nama: data.name,
    tingkat: parseInt(data.level),
    waliKelasId: data.waliKelasId || null,
    jurusanId: data.jurusanId || null
  });
}

// ============================================================
// JURUSAN
// ============================================================
export async function fetchJurusan() {
  const res = await executeQuery(listJurusanRef(dataConnect), NO_CACHE);
  return res.data.jurusans.map((j) => ({
    id: j.id,
    kode: j.kode,
    nama: j.nama
  }));
}

export async function addJurusan(data: any) {
  return await createJurusan(dataConnect, {
    kode: data.kode,
    nama: data.nama
  });
}

export async function editJurusan(id: string, data: any) {
  return await updateJurusan(dataConnect, {
    id,
    kode: data.kode,
    nama: data.nama
  });
}

export async function removeJurusan(id: string) {
  return await deleteJurusan(dataConnect, { id });
}

export async function fetchMataPelajaran() {
  const res = await executeQuery(listMataPelajaranRef(dataConnect), NO_CACHE);
  return res.data.mataPelajarans;
}

export async function addMataPelajaran(data: any) {
  return await createMataPelajaran(dataConnect, {
    kode: data.kode,
    nama: data.nama
  });
}

export async function editMataPelajaran(id: string, data: any) {
  return await updateMataPelajaran(dataConnect, {
    id,
    kode: data.kode,
    nama: data.nama
  });
}

export async function removeMataPelajaran(id: string) {
  return await deleteMataPelajaran(dataConnect, { id });
}

// ============================================================
// JADWAL
// ============================================================
import { createJadwal, deleteJadwal } from '@uassiakad/connector';

export async function fetchJadwalKelas(kelasId: string, tahunAjaran: string = currentTahunAjaran()) {
  const res = await executeQuery(getJadwalByKelasRef(dataConnect, { kelasId, tahunAjaran }), NO_CACHE);
  return res.data.jadwals;
}

export async function fetchJadwalGuru(guruId: string, tahunAjaran: string = currentTahunAjaran()) {
  const res = await executeQuery(getJadwalByGuruRef(dataConnect, { guruId, tahunAjaran }), NO_CACHE);
  return res.data.jadwals;
}

export async function addJadwalData(data: any) {
  return await createJadwal(dataConnect, {
    kelasId: data.kelasId,
    mataPelajaranId: data.mataPelajaranId,
    guruId: data.guruId,
    jamMulai: data.jamMulai,
    jamSelesai: data.jamSelesai,
    hari: data.hari,
    ruangan: data.ruangan,
    tahunAjaran: data.tahunAjaran || currentTahunAjaran(),
    semester: data.semester || 'Ganjil'
  });
}

export async function removeJadwalData(id: string) {
  return await deleteJadwal(dataConnect, { id });
}

// ============================================================
// NILAI
// ============================================================
export async function fetchNilaiSiswa(siswaId: string, semester: string, tahunAjaran: string) {
  const res = await executeQuery(getNilaiBySiswaRef(dataConnect, { siswaId, semester, tahunAjaran }), NO_CACHE);
  return res.data.nilais;
}

// ============================================================
// PRESTASI
// ============================================================
export async function fetchPrestasiSiswa(siswaId?: string) {
  const res = await executeQuery(listPrestasiRef(dataConnect, { siswaId }), NO_CACHE);
  return res.data.prestasis;
}

export async function addPrestasi(data: any) {
  return await createPrestasi(dataConnect, {
    siswaId: data.siswaId,
    nama: data.nama,
    tipe: data.tipe === 'Akademik' ? TipePrestasi.Akademik : TipePrestasi.NonAkademik,
    tingkat: data.tingkat,
    peringkat: data.peringkat,
    tanggal: data.tanggal,
    deskripsi: data.deskripsi
  });
}

// ============================================================
// ALUMNI
// ============================================================

/**
 * Ambil daftar alumni. Jika `tahunLulus` di-set, filter ke tahun tsb.
 * Jika kosong / undefined, ambil semua.
 */
export async function fetchAlumni(tahunLulus?: number) {
  const res = await executeQuery(listAlumniRef(dataConnect, { tahunLulus }), NO_CACHE);
  return res.data.alumnis.map(a => ({
    id: a.id,
    nis: a.nis,
    name: a.nama,
    gradYear: a.tahunLulus,
    status: a.status,
    institution: a.institusi,
    position: a.jabatanAtauJurusan,
    email: a.email,
    phone: a.telepon,
    address: a.alamat,
    achievements: a.prestasi
  }));
}

export async function addAlumniData(data: any) {
  return await createAlumni(dataConnect, {
    nis: data.nis,
    nama: data.name,
    tahunLulus: parseInt(data.gradYear),
    status: data.status as StatusAlumni,
    institusi: data.institution,
    jabatanAtauJurusan: data.position,
    email: data.email,
    telepon: data.phone,
    alamat: data.address,
    prestasi: data.achievements
  });
}

export async function editAlumniData(id: string, data: any) {
  return await updateAlumni(dataConnect, {
    id,
    status: data.status as StatusAlumni,
    institusi: data.institution,
    jabatanAtauJurusan: data.position,
    email: data.email,
    telepon: data.phone,
    alamat: data.address,
    prestasi: data.achievements
  });
}

export async function removeAlumniData(id: string) {
  return await deleteAlumni(dataConnect, { id });
}

// ============================================================
// GRADUATION — pindahkan siswa ke alumni
// ============================================================

/**
 * Meluluskan siswa — pindahkan ke tabel Alumni.
 *
 * Catatan:
 * - Nilai, prestasi, dan histori akademik TETAP tersimpan di database karena
 *   tabel Alumni terpisah dari Siswa. Admin/BK masih bisa melihat nama, NIS,
 *   dan track record lulusan di halaman Alumni.
 * - Setelah diluluskan, akun siswa (Pengguna) TETAP dipertahankan agar siswa
 *   bisa login (jika dibutuhkan) dan agar relasi ke prestasi/nilai lama
 *   tidak broken. Yang berubah hanya status keanggotaan.
 */
export async function graduateSiswa(params: {
  siswaId: string;
  nis: string;
  nama: string;
  tahunLulus: number;
  status: 'Kuliah' | 'Kerja' | 'Lainnya';
  institusi?: string;
  jabatanAtauJurusan?: string;
  email?: string;
  telepon?: string;
  alamat?: string;
  prestasi?: string;
}) {
  return await createAlumni(dataConnect, {
    nis: params.nis,
    nama: params.nama,
    tahunLulus: params.tahunLulus,
    status: params.status as StatusAlumni,
    institusi: params.institusi || null,
    jabatanAtauJurusan: params.jabatanAtauJurusan || null,
    email: params.email || null,
    telepon: params.telepon || null,
    alamat: params.alamat || null,
    prestasi: params.prestasi || null,
  });
}

export async function savePeminatan(siswaId: string, jurusanId: string | null) {
  return await updateSiswaPeminatan(dataConnect, {
    id: siswaId,
    peminatanId: jurusanId || null
  });
}
