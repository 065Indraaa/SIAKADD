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
  updateNilai,
  listPrestasi,
  createPrestasi,
  listAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
  getPenggunaByEmail,
  updateSiswaPeminatan,
  updateSiswa,
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
  listTugasHarianRef,
  listTugasHarianByKelasRef,
  upsertTugasHarian,
  deleteTugasHarian,
  getBobotNilaiRef,
  listBobotNilaiByKelasRef,
  upsertBobotNilai,
  updateBobotNilai,
  getKehadiranByKelasRef,
  getKehadiranBySiswaRef,
  recordKehadiran,
  deleteKehadiran,
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
// PERHITUNGAN NILAI — util bersama (dipakai guru & siswa)
// ============================================================

/** Poin kehadiran per pertemuan. Hadir penuh, izin/sakit diberi keringanan, alpa nol. */
export const POIN_KEHADIRAN: Record<string, number> = {
  Hadir: 100,
  Izin: 75,
  Sakit: 75,
  Alpa: 0,
};

/**
 * Hitung skor kehadiran (0–100) dari daftar catatan kehadiran.
 * Mengembalikan null jika belum ada catatan sama sekali, agar komponen
 * kehadiran bisa diabaikan (tidak menjatuhkan nilai siswa yang absensinya kosong).
 */
export function hitungSkorKehadiran(
  records: Array<{ status?: string | null }> | null | undefined
): number | null {
  if (!records || records.length === 0) return null;
  const total = records.reduce((sum, r) => sum + (POIN_KEHADIRAN[r.status || 'Alpa'] ?? 0), 0);
  return total / records.length;
}

export interface BobotInput {
  bobotKehadiran?: number | null;
  bobotHarian?: number | null;
  bobotUts?: number | null;
  bobotUas?: number | null;
}

export interface NilaiInput {
  nilaiHarian?: number | null;
  nilaiUts?: number | null;
  nilaiUas?: number | null;
  nilaiRemedialUts?: number | null;
  nilaiRemedialUas?: number | null;
}

/**
 * Hitung nilai akhir satu mapel berdasarkan bobot.
 * - UTS/UAS mengambil nilai tertinggi antara nilai asli dan remedial.
 * - Komponen kehadiran hanya dihitung jika `skorKehadiran` tidak null DAN bobotKehadiran > 0.
 * - Pembagi (total bobot) menyesuaikan komponen yang benar-benar dipakai, sehingga
 *   skala hasil tetap 0–100 meski salah satu komponen kosong.
 * Default bobot mengikuti skema umum: Harian 30, UTS 30, UAS 40, Kehadiran 0.
 */
export function hitungNilaiAkhirBobot(
  nilai: NilaiInput,
  bobot?: BobotInput | null,
  skorKehadiran?: number | null
): number {
  const bHarian = bobot?.bobotHarian ?? 30;
  const bUts = bobot?.bobotUts ?? 30;
  const bUas = bobot?.bobotUas ?? 40;
  const bKehadiran = bobot?.bobotKehadiran ?? 0;

  const nh = nilai.nilaiHarian || 0;
  const uts = Math.max(nilai.nilaiUts || 0, nilai.nilaiRemedialUts || 0);
  const uas = Math.max(nilai.nilaiUas || 0, nilai.nilaiRemedialUas || 0);
  const pakaiKehadiran = skorKehadiran != null && bKehadiran > 0;

  if (!nh && !uts && !uas && !pakaiKehadiran) return 0;

  let totalNilai = nh * bHarian + uts * bUts + uas * bUas;
  let totalBobot = bHarian + bUts + bUas;
  if (pakaiKehadiran) {
    totalNilai += (skorKehadiran as number) * bKehadiran;
    totalBobot += bKehadiran;
  }
  if (totalBobot === 0) return 0;
  return totalNilai / totalBobot;
}

/** Kompat lama: hitung nilai akhir satu record nilai dengan bobot default 30/30/40. */
function hitungNilaiAkhir(n: any): number {
  return hitungNilaiAkhirBobot(n);
}

/**
 * Hitung rata-rata nilai kelas 10 seorang siswa.
 * Mengambil semua nilai semester Ganjil & Genap pada tahun ajaran kelas 10
 * (diturunkan dari tahunMasuk), lalu merata-ratakan nilai akhir tiap mapel.
 * Hasil 0–100, atau null jika belum ada data nilai.
 */
export async function hitungRataRataKelas10(
  siswaId: string,
  tahunMasuk: number | null | undefined
): Promise<number | null> {
  if (!tahunMasuk) {
    console.warn('hitungRataRataKelas10: tahunMasuk kosong');
    return null;
  }
  const ta10 = `${tahunMasuk}/${tahunMasuk + 1}`;
  try {
    const [ganjil, genap] = await Promise.all([
      fetchNilaiSiswa(siswaId, 'Ganjil', ta10),
      fetchNilaiSiswa(siswaId, 'Genap', ta10),
    ]);
    const semuaNilai = [...(ganjil || []), ...(genap || [])];

    // Filter record yang benar-benar punya nilai (abaikan record kosong)
    const nilaiBerisi = semuaNilai.filter((n: any) => {
      const nh = n.nilaiHarian ?? 0;
      const uts = n.nilaiUts ?? 0;
      const uas = n.nilaiUas ?? 0;
      return nh > 0 || uts > 0 || uas > 0;
    });

    if (nilaiBerisi.length === 0) {
      console.log(`hitungRataRataKelas10: tidak ada nilai berisi untuk siswa ${siswaId} pada TA ${ta10}`);
      return null;
    }

    // Agregasi nilai akhir per mapel (jika ada duplikasi, ambil rata-rata entry-nya)
    const perMapel: Record<string, number[]> = {};
    for (const n of nilaiBerisi) {
      const kode = n.mataPelajaran?.kode || n.mataPelajaran?.nama || 'unknown';
      if (!perMapel[kode]) perMapel[kode] = [];
      perMapel[kode].push(hitungNilaiAkhir(n));
    }

    const total = Object.values(perMapel).reduce((sum, arr) => {
      const avgMapel = arr.reduce((a, b) => a + b, 0) / arr.length;
      return sum + avgMapel;
    }, 0);
    return total / Object.keys(perMapel).length;
  } catch (e: any) {
    console.error('hitungRataRataKelas10 error:', e);
    return null;
  }
}

// ============================================================
// PRESTASI
// ============================================================
export async function fetchPrestasiSiswa(siswaId?: string) {
  const res = await executeQuery(listPrestasiRef(dataConnect, { siswaId }), NO_CACHE);
  return (res.data.prestasis || []).map((p: any) => ({
    id: p.id,
    name: p.nama,
    type: p.tipe,
    level: p.tingkat,
    rank: p.peringkat,
    date: p.tanggal,
    desc: p.deskripsi,
  }));
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

/**
 * ACC penjurusan oleh admin — momen "naik ke kelas 11".
 * Mengubah jurusan RESMI siswa dan (jika kelasId diberikan) memindahkan siswa
 * ke kelas 11 sesuai rumpun. Selama masih kelas 10, fungsi ini TIDAK dipanggil,
 * sehingga kelas 10 tetap kelas umum tanpa jurusan — hanya peminatan (pilihan)
 * yang tersimpan lewat savePeminatan().
 *
 * - Set `jurusan` resmi = rumpun yang disetujui.
 * - Set `peminatan` agar sinkron dengan jurusan resmi.
 * - Pindahkan `kelas` ke kelas 11 rumpun terkait bila `kelasId` tersedia.
 *   (kelasId undefined = tidak mengubah kelas.)
 */
export async function approvePenjurusan(params: {
  siswaId: string;
  jurusanId: string;
  kelasId?: string | null;
}) {
  await updateSiswa(dataConnect, {
    id: params.siswaId,
    jurusanId: params.jurusanId,
    kelasId: params.kelasId ?? undefined,
  });
  await updateSiswaPeminatan(dataConnect, {
    id: params.siswaId,
    peminatanId: params.jurusanId,
  });
}

export async function updateNilaiData(id: string, data: any) {
  return await updateNilai(dataConnect, {
    id,
    nilaiHarian: data.nilaiHarian ?? null,
    nilaiUts: data.nilaiUts ?? null,
    nilaiUas: data.nilaiUas ?? null,
    nilaiRemedialUts: data.nilaiRemedialUts ?? null,
    nilaiRemedialUas: data.nilaiRemedialUas ?? null,
    jumlahTugasHarian: data.jumlahTugasHarian ?? null,
  });
}

// ============================================================
// TUGAS HARIAN
// ============================================================
export async function fetchTugasHarian(siswaId: string, kelasId: string, mataPelajaranId: string, semester: string, tahunAjaran: string) {
  const res = await executeQuery(listTugasHarianRef(dataConnect, { siswaId, kelasId, mataPelajaranId, semester, tahunAjaran }), NO_CACHE);
  return res.data.tugasHarians || [];
}

export async function fetchTugasHarianByKelas(kelasId: string, mataPelajaranId: string, semester: string, tahunAjaran: string) {
  const res = await executeQuery(listTugasHarianByKelasRef(dataConnect, { kelasId, mataPelajaranId, semester, tahunAjaran }), NO_CACHE);
  return res.data.tugasHarians || [];
}

export async function addTugasHarian(data: any) {
  return await upsertTugasHarian(dataConnect, {
    siswaId: data.siswaId,
    kelasId: data.kelasId,
    mataPelajaranId: data.mataPelajaranId,
    semester: data.semester,
    tahunAjaran: data.tahunAjaran,
    pertemuanKe: data.pertemuanKe,
    nilai: data.nilai ?? null,
  });
}

export async function removeTugasHarian(id: string) {
  return await deleteTugasHarian(dataConnect, { id });
}

// ============================================================
// BOBOT NILAI
// ============================================================
export async function fetchBobotNilai(kelasId: string, mataPelajaranId: string, semester: string, tahunAjaran: string) {
  const res = await executeQuery(getBobotNilaiRef(dataConnect, { kelasId, mataPelajaranId, semester, tahunAjaran }), NO_CACHE);
  return res.data.bobotNilais?.[0] || null;
}

export async function fetchBobotNilaiByKelas(kelasId: string, semester: string, tahunAjaran: string) {
  const res = await executeQuery(listBobotNilaiByKelasRef(dataConnect, { kelasId, semester, tahunAjaran }), NO_CACHE);
  return res.data.bobotNilais || [];
}

export async function setBobotNilai(data: any) {
  return await upsertBobotNilai(dataConnect, {
    kelasId: data.kelasId,
    mataPelajaranId: data.mataPelajaranId,
    semester: data.semester,
    tahunAjaran: data.tahunAjaran,
    bobotKehadiran: data.bobotKehadiran ?? 0,
    bobotHarian: data.bobotHarian ?? 30,
    bobotUts: data.bobotUts ?? 30,
    bobotUas: data.bobotUas ?? 40,
    kkm: data.kkm ?? 75,
  });
}

export async function editBobotNilai(id: string, data: any) {
  return await updateBobotNilai(dataConnect, {
    id,
    bobotKehadiran: data.bobotKehadiran,
    bobotHarian: data.bobotHarian,
    bobotUts: data.bobotUts,
    bobotUas: data.bobotUas,
    kkm: data.kkm,
  });
}

// ============================================================
// KEHADIRAN
// ============================================================
export async function fetchKehadiranByKelas(kelasId: string, tanggal: string) {
  const res = await executeQuery(getKehadiranByKelasRef(dataConnect, { kelasId, tanggal }), NO_CACHE);
  return res.data.kehadirans || [];
}

export async function fetchKehadiranBySiswa(siswaId: string) {
  const res = await executeQuery(getKehadiranBySiswaRef(dataConnect, { siswaId }), NO_CACHE);
  return res.data.kehadirans || [];
}

export async function saveKehadiran(data: any) {
  return await recordKehadiran(dataConnect, {
    siswaId: data.siswaId,
    kelasId: data.kelasId,
    tanggal: data.tanggal,
    status: data.status,
    catatan: data.catatan || null,
  });
}

export async function removeKehadiran(id: string) {
  return await deleteKehadiran(dataConnect, { id });
}
