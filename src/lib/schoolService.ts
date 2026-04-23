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
  TipePrestasi
} from '@uassiakad/connector';

import { dataConnect } from './userService';

// ============================================================
// KELAS
// ============================================================
export async function fetchKelas(tingkat?: number) {
  const res = tingkat 
    ? await listKelasByTingkat(dataConnect, { tingkat })
    : await listSemuaKelas(dataConnect);
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
    tahunAjaran: '2023/2024',
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
  const res = await listJurusan(dataConnect);
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
  const res = await listMataPelajaran(dataConnect);
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

export async function fetchJadwalKelas(kelasId: string, tahunAjaran: string = '2023/2024') {
  const res = await getJadwalByKelas(dataConnect, { kelasId, tahunAjaran });
  return res.data.jadwals;
}

export async function fetchJadwalGuru(guruId: string, tahunAjaran: string = '2023/2024') {
  const res = await getJadwalByGuru(dataConnect, { guruId, tahunAjaran });
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
    tahunAjaran: data.tahunAjaran || '2023/2024',
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
  const res = await getNilaiBySiswa(dataConnect, { siswaId, semester, tahunAjaran });
  return res.data.nilais;
}

// ============================================================
// PRESTASI
// ============================================================
export async function fetchPrestasiSiswa(siswaId?: string) {
  const res = await listPrestasi(dataConnect, { siswaId });
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
export async function fetchAlumni() {
  const res = await listAlumni(dataConnect);
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

export async function savePeminatan(siswaId: string, jurusanId: string | null) {
  return await updateSiswaPeminatan(dataConnect, {
    id: siswaId,
    peminatanId: jurusanId || null
  });
}
