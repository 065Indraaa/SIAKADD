import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum JabatanGuru {
  Guru = "Guru",
  WaliKelas = "WaliKelas",
  Kepsek = "Kepsek",
  WakilKepsek = "WakilKepsek",
  BK = "BK",
};

export enum JenisKelamin {
  L = "L",
  P = "P",
};

export enum PeranPengguna {
  admin = "admin",
  guru = "guru",
  siswa = "siswa",
};

export enum StatusAlumni {
  Kuliah = "Kuliah",
  Kerja = "Kerja",
  Lainnya = "Lainnya",
};

export enum StatusKehadiran {
  Hadir = "Hadir",
  Izin = "Izin",
  Sakit = "Sakit",
  Alpa = "Alpa",
};

export enum TipePrestasi {
  Akademik = "Akademik",
  NonAkademik = "NonAkademik",
};



export interface Alumni_Key {
  id: UUIDString;
  __typename?: 'Alumni_Key';
}

export interface CreateAlumniData {
  alumni_insert: Alumni_Key;
}

export interface CreateAlumniVariables {
  nis: string;
  nama: string;
  tahunLulus: number;
  status: StatusAlumni;
  institusi?: string | null;
  jabatanAtauJurusan?: string | null;
  email?: string | null;
  telepon?: string | null;
  alamat?: string | null;
  prestasi?: string | null;
}

export interface CreateGuruData {
  guru_insert: Guru_Key;
}

export interface CreateGuruVariables {
  penggunaId: UUIDString;
  nip: string;
  jenisKelamin: JenisKelamin;
  tempatLahir?: string | null;
  tanggalLahir?: DateString | null;
  jabatan?: JabatanGuru | null;
  spesialisasi?: string | null;
}

export interface CreateJadwalData {
  jadwal_insert: Jadwal_Key;
}

export interface CreateJadwalVariables {
  kelasId: UUIDString;
  mataPelajaranId: UUIDString;
  guruId: UUIDString;
  jamMulai: string;
  jamSelesai: string;
  hari: string;
  ruangan?: string | null;
  tahunAjaran: string;
  semester: string;
}

export interface CreateJurusanData {
  jurusan_insert: Jurusan_Key;
}

export interface CreateJurusanVariables {
  kode: string;
  nama: string;
}

export interface CreateKelasData {
  kelas_insert: Kelas_Key;
}

export interface CreateKelasVariables {
  nama: string;
  tingkat: number;
  tahunAjaran: string;
  jurusanId?: UUIDString | null;
  waliKelasId?: UUIDString | null;
}

export interface CreateMataPelajaranData {
  mataPelajaran_insert: MataPelajaran_Key;
}

export interface CreateMataPelajaranVariables {
  kode: string;
  nama: string;
}

export interface CreatePenggunaData {
  pengguna_insert: Pengguna_Key;
}

export interface CreatePenggunaVariables {
  email: string;
  password?: string | null;
  nama: string;
  peran: PeranPengguna;
  telepon?: string | null;
  alamat?: string | null;
  fotoUrl?: string | null;
}

export interface CreatePengumumanData {
  pengumuman_insert: Pengumuman_Key;
}

export interface CreatePengumumanVariables {
  judul: string;
  konten: string;
  penulisId: UUIDString;
  isPenting?: boolean | null;
}

export interface CreatePrestasiData {
  prestasi_insert: Prestasi_Key;
}

export interface CreatePrestasiVariables {
  siswaId: UUIDString;
  nama: string;
  tipe: TipePrestasi;
  tingkat: string;
  peringkat: string;
  tanggal: DateString;
  deskripsi?: string | null;
}

export interface CreateSiswaData {
  siswa_insert: Siswa_Key;
}

export interface CreateSiswaVariables {
  penggunaId: UUIDString;
  nis: string;
  jenisKelamin: JenisKelamin;
  tempatLahir?: string | null;
  tanggalLahir?: DateString | null;
  alamat?: string | null;
  jurusanId?: UUIDString | null;
  kelasId?: UUIDString | null;
  tahunMasuk?: number | null;
}

export interface DeleteAlumniData {
  alumni_delete?: Alumni_Key | null;
}

export interface DeleteAlumniVariables {
  id: UUIDString;
}

export interface DeleteGuruData {
  guru_delete?: Guru_Key | null;
}

export interface DeleteGuruVariables {
  id: UUIDString;
}

export interface DeleteJadwalData {
  jadwal_delete?: Jadwal_Key | null;
}

export interface DeleteJadwalVariables {
  id: UUIDString;
}

export interface DeleteJurusanData {
  jurusan_delete?: Jurusan_Key | null;
}

export interface DeleteJurusanVariables {
  id: UUIDString;
}

export interface DeleteKelasData {
  kelas_delete?: Kelas_Key | null;
}

export interface DeleteKelasVariables {
  id: UUIDString;
}

export interface DeleteMataPelajaranData {
  mataPelajaran_delete?: MataPelajaran_Key | null;
}

export interface DeleteMataPelajaranVariables {
  id: UUIDString;
}

export interface DeletePenggunaData {
  pengguna_delete?: Pengguna_Key | null;
}

export interface DeletePenggunaVariables {
  id: UUIDString;
}

export interface DeletePengumumanData {
  pengumuman_delete?: Pengumuman_Key | null;
}

export interface DeletePengumumanVariables {
  id: UUIDString;
}

export interface DeletePrestasiData {
  prestasi_delete?: Prestasi_Key | null;
}

export interface DeletePrestasiVariables {
  id: UUIDString;
}

export interface DeleteSiswaData {
  siswa_delete?: Siswa_Key | null;
}

export interface DeleteSiswaVariables {
  id: UUIDString;
}

export interface GetGuruByPenggunaData {
  gurus: ({
    id: UUIDString;
  } & Guru_Key)[];
}

export interface GetGuruByPenggunaVariables {
  penggunaId: UUIDString;
}

export interface GetGuruData {
  guru?: {
    id: UUIDString;
    nip: string;
    jenisKelamin: JenisKelamin;
    jabatan: JabatanGuru;
    spesialisasi?: string | null;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      telepon?: string | null;
      alamat?: string | null;
      fotoUrl?: string | null;
    } & Pengguna_Key;
  } & Guru_Key;
}

export interface GetGuruVariables {
  id: UUIDString;
}

export interface GetJadwalByGuruData {
  jadwals: ({
    id: UUIDString;
    jamMulai: string;
    jamSelesai: string;
    hari: string;
    ruangan?: string | null;
    semester: string;
    mataPelajaran: {
      nama: string;
    };
      kelas: {
        nama: string;
        tingkat: number;
      };
  } & Jadwal_Key)[];
}

export interface GetJadwalByGuruVariables {
  guruId: UUIDString;
  tahunAjaran?: string | null;
}

export interface GetJadwalByKelasData {
  jadwals: ({
    id: UUIDString;
    jamMulai: string;
    jamSelesai: string;
    hari: string;
    ruangan?: string | null;
    semester: string;
    mataPelajaran: {
      nama: string;
    };
      guru: {
        nip: string;
        pengguna: {
          nama: string;
        };
      };
  } & Jadwal_Key)[];
}

export interface GetJadwalByKelasVariables {
  kelasId: UUIDString;
  tahunAjaran?: string | null;
}

export interface GetKehadiranByKelasData {
  kehadirans: ({
    id: UUIDString;
    status: StatusKehadiran;
    catatan?: string | null;
    siswa: {
      nis: string;
      pengguna: {
        nama: string;
      };
    };
  } & Kehadiran_Key)[];
}

export interface GetKehadiranByKelasVariables {
  kelasId: UUIDString;
  tanggal: DateString;
}

export interface GetKehadiranBySiswaData {
  kehadirans: ({
    id: UUIDString;
    tanggal: DateString;
    status: StatusKehadiran;
    catatan?: string | null;
  } & Kehadiran_Key)[];
}

export interface GetKehadiranBySiswaVariables {
  siswaId: UUIDString;
}

export interface GetLastNipData {
  gurus: ({
    nip: string;
  })[];
}

export interface GetLastNisData {
  siswas: ({
    nis: string;
  })[];
}

export interface GetNilaiByKelasData {
  nilais: ({
    id: UUIDString;
    nilaiHarian?: number | null;
    nilaiUts?: number | null;
    nilaiUas?: number | null;
    siswa: {
      nis: string;
      pengguna: {
        nama: string;
      };
    };
  } & Nilai_Key)[];
}

export interface GetNilaiByKelasVariables {
  kelasId: UUIDString;
  mataPelajaranId: UUIDString;
}

export interface GetNilaiBySiswaData {
  nilais: ({
    id: UUIDString;
    nilaiHarian?: number | null;
    nilaiUts?: number | null;
    nilaiUas?: number | null;
    semester: string;
    tahunAjaran: string;
    mataPelajaran: {
      nama: string;
      kode: string;
    };
  } & Nilai_Key)[];
}

export interface GetNilaiBySiswaVariables {
  siswaId: UUIDString;
  semester?: string | null;
  tahunAjaran?: string | null;
}

export interface GetPenggunaByEmailData {
  penggunas: ({
    id: UUIDString;
    email: string;
    nama: string;
    peran: PeranPengguna;
  } & Pengguna_Key)[];
}

export interface GetPenggunaByEmailVariables {
  email: string;
}

export interface GetPenggunaData {
  pengguna?: {
    id: UUIDString;
    email: string;
    nama: string;
    peran: PeranPengguna;
    telepon?: string | null;
    alamat?: string | null;
    fotoUrl?: string | null;
  } & Pengguna_Key;
}

export interface GetPenggunaVariables {
  id: UUIDString;
}

export interface GetSiswaByPenggunaData {
  siswas: ({
    id: UUIDString;
  } & Siswa_Key)[];
}

export interface GetSiswaByPenggunaVariables {
  penggunaId: UUIDString;
}

export interface GetSiswaData {
  siswa?: {
    id: UUIDString;
    nis: string;
    jenisKelamin: JenisKelamin;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    alamat?: string | null;
    tahunMasuk?: number | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      telepon?: string | null;
      alamat?: string | null;
      fotoUrl?: string | null;
    } & Pengguna_Key;
      kelas?: {
        id: UUIDString;
        nama: string;
        tingkat: number;
      } & Kelas_Key;
        jurusan?: {
          id: UUIDString;
          nama: string;
        } & Jurusan_Key;
          peminatan?: {
            id: UUIDString;
            nama: string;
          } & Jurusan_Key;
  } & Siswa_Key;
}

export interface GetSiswaVariables {
  id: UUIDString;
}

export interface Guru_Key {
  id: UUIDString;
  __typename?: 'Guru_Key';
}

export interface Jadwal_Key {
  id: UUIDString;
  __typename?: 'Jadwal_Key';
}

export interface Jurusan_Key {
  id: UUIDString;
  __typename?: 'Jurusan_Key';
}

export interface Kehadiran_Key {
  id: UUIDString;
  __typename?: 'Kehadiran_Key';
}

export interface Kelas_Key {
  id: UUIDString;
  __typename?: 'Kelas_Key';
}

export interface ListAlumniData {
  alumnis: ({
    id: UUIDString;
    nis: string;
    nama: string;
    tahunLulus: number;
    status: StatusAlumni;
    institusi?: string | null;
    jabatanAtauJurusan?: string | null;
    email?: string | null;
    telepon?: string | null;
    alamat?: string | null;
    prestasi?: string | null;
  } & Alumni_Key)[];
}

export interface ListAlumniVariables {
  tahunLulus?: number | null;
}

export interface ListGuruData {
  gurus: ({
    id: UUIDString;
    nip: string;
    jenisKelamin: JenisKelamin;
    jabatan: JabatanGuru;
    spesialisasi?: string | null;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      password?: string | null;
      telepon?: string | null;
      alamat?: string | null;
    } & Pengguna_Key;
  } & Guru_Key)[];
}

export interface ListJurusanData {
  jurusans: ({
    id: UUIDString;
    kode: string;
    nama: string;
  } & Jurusan_Key)[];
}

export interface ListKelasByTingkatData {
  kelass: ({
    id: UUIDString;
    nama: string;
    tingkat: number;
    tahunAjaran: string;
    waliKelas?: {
      id: UUIDString;
      nip: string;
      pengguna: {
        nama: string;
      };
    } & Guru_Key;
      jurusan?: {
        id: UUIDString;
        nama: string;
      } & Jurusan_Key;
  } & Kelas_Key)[];
}

export interface ListKelasByTingkatVariables {
  tingkat: number;
}

export interface ListMataPelajaranData {
  mataPelajarans: ({
    id: UUIDString;
    kode: string;
    nama: string;
  } & MataPelajaran_Key)[];
}

export interface ListPenggunaData {
  penggunas: ({
    id: UUIDString;
    email: string;
    password?: string | null;
    nama: string;
    peran: PeranPengguna;
    telepon?: string | null;
    alamat?: string | null;
    fotoUrl?: string | null;
    dibuatPada: TimestampString;
  } & Pengguna_Key)[];
}

export interface ListPenggunaVariables {
  peran?: PeranPengguna | null;
}

export interface ListPengumumanData {
  pengumumen: ({
    id: UUIDString;
    judul: string;
    konten: string;
    isPenting: boolean;
    dibuatPada: TimestampString;
    penulis?: {
      nama: string;
    };
  } & Pengumuman_Key)[];
}

export interface ListPrestasiData {
  prestasis: ({
    id: UUIDString;
    nama: string;
    tipe: TipePrestasi;
    tingkat: string;
    peringkat: string;
    tanggal: DateString;
    deskripsi?: string | null;
  } & Prestasi_Key)[];
}

export interface ListPrestasiVariables {
  siswaId?: UUIDString | null;
}

export interface ListSemuaKelasData {
  kelass: ({
    id: UUIDString;
    nama: string;
    tingkat: number;
    tahunAjaran: string;
    waliKelas?: {
      id: UUIDString;
      nip: string;
      pengguna: {
        nama: string;
      };
    } & Guru_Key;
      jurusan?: {
        id: UUIDString;
        nama: string;
      } & Jurusan_Key;
  } & Kelas_Key)[];
}

export interface ListSemuaSiswaData {
  siswas: ({
    id: UUIDString;
    nis: string;
    jenisKelamin: JenisKelamin;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    alamat?: string | null;
    tahunMasuk?: number | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      password?: string | null;
      telepon?: string | null;
      alamat?: string | null;
    } & Pengguna_Key;
      kelas?: {
        id: UUIDString;
        nama: string;
        tingkat: number;
      } & Kelas_Key;
        jurusan?: {
          id: UUIDString;
          nama: string;
        } & Jurusan_Key;
          peminatan?: {
            id: UUIDString;
            nama: string;
          } & Jurusan_Key;
  } & Siswa_Key)[];
}

export interface ListSiswaByKelasData {
  siswas: ({
    id: UUIDString;
    nis: string;
    jenisKelamin: JenisKelamin;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    alamat?: string | null;
    tahunMasuk?: number | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      password?: string | null;
      telepon?: string | null;
      alamat?: string | null;
    } & Pengguna_Key;
      kelas?: {
        id: UUIDString;
        nama: string;
        tingkat: number;
      } & Kelas_Key;
        jurusan?: {
          id: UUIDString;
          nama: string;
        } & Jurusan_Key;
          peminatan?: {
            id: UUIDString;
            nama: string;
          } & Jurusan_Key;
  } & Siswa_Key)[];
}

export interface ListSiswaByKelasVariables {
  kelasId: UUIDString;
}

export interface MataPelajaran_Key {
  id: UUIDString;
  __typename?: 'MataPelajaran_Key';
}

export interface Nilai_Key {
  id: UUIDString;
  __typename?: 'Nilai_Key';
}

export interface Pengguna_Key {
  id: UUIDString;
  __typename?: 'Pengguna_Key';
}

export interface Pengumuman_Key {
  id: UUIDString;
  __typename?: 'Pengumuman_Key';
}

export interface Prestasi_Key {
  id: UUIDString;
  __typename?: 'Prestasi_Key';
}

export interface RecordKehadiranData {
  kehadiran_insert: Kehadiran_Key;
}

export interface RecordKehadiranVariables {
  siswaId: UUIDString;
  kelasId: UUIDString;
  tanggal: DateString;
  status: StatusKehadiran;
  catatan?: string | null;
}

export interface ResetDatabaseData {
  nilai_deleteMany: number;
  jadwal_deleteMany: number;
  prestasi_deleteMany: number;
  kehadiran_deleteMany: number;
  pengumuman_deleteMany: number;
  alumni_deleteMany: number;
  siswa_deleteMany: number;
  guru_deleteMany: number;
  kelas_deleteMany: number;
  jurusan_deleteMany: number;
  mataPelajaran_deleteMany: number;
  pengguna_deleteMany: number;
}

export interface Siswa_Key {
  id: UUIDString;
  __typename?: 'Siswa_Key';
}

export interface UpdateAlumniData {
  alumni_update?: Alumni_Key | null;
}

export interface UpdateAlumniVariables {
  id: UUIDString;
  status?: StatusAlumni | null;
  institusi?: string | null;
  jabatanAtauJurusan?: string | null;
  email?: string | null;
  telepon?: string | null;
  alamat?: string | null;
  prestasi?: string | null;
}

export interface UpdateGuruData {
  guru_update?: Guru_Key | null;
}

export interface UpdateGuruVariables {
  id: UUIDString;
  jabatan?: JabatanGuru | null;
  spesialisasi?: string | null;
  tempatLahir?: string | null;
  tanggalLahir?: DateString | null;
}

export interface UpdateJurusanData {
  jurusan_update?: Jurusan_Key | null;
}

export interface UpdateJurusanVariables {
  id: UUIDString;
  kode?: string | null;
  nama?: string | null;
}

export interface UpdateKelasData {
  kelas_update?: Kelas_Key | null;
}

export interface UpdateKelasVariables {
  id: UUIDString;
  nama?: string | null;
  tingkat?: number | null;
  waliKelasId?: UUIDString | null;
  jurusanId?: UUIDString | null;
}

export interface UpdateMataPelajaranData {
  mataPelajaran_update?: MataPelajaran_Key | null;
}

export interface UpdateMataPelajaranVariables {
  id: UUIDString;
  kode?: string | null;
  nama?: string | null;
}

export interface UpdatePenggunaData {
  pengguna_update?: Pengguna_Key | null;
}

export interface UpdatePenggunaVariables {
  id: UUIDString;
  password?: string | null;
  nama?: string | null;
  telepon?: string | null;
  alamat?: string | null;
  fotoUrl?: string | null;
}

export interface UpdateSiswaData {
  siswa_update?: Siswa_Key | null;
}

export interface UpdateSiswaPeminatanData {
  siswa_update?: Siswa_Key | null;
}

export interface UpdateSiswaPeminatanVariables {
  id: UUIDString;
  peminatanId?: UUIDString | null;
}

export interface UpdateSiswaVariables {
  id: UUIDString;
  jurusanId?: UUIDString | null;
  kelasId?: UUIDString | null;
  tanggalLahir?: DateString | null;
  tempatLahir?: string | null;
  alamat?: string | null;
}

export interface UpsertNilaiData {
  nilai_insert: Nilai_Key;
}

export interface UpsertNilaiVariables {
  siswaId: UUIDString;
  kelasId: UUIDString;
  mataPelajaranId: UUIDString;
  semester: string;
  tahunAjaran: string;
  nilaiHarian?: number | null;
  nilaiUts?: number | null;
  nilaiUas?: number | null;
}

interface CreatePenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePenggunaVariables): MutationRef<CreatePenggunaData, CreatePenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePenggunaVariables): MutationRef<CreatePenggunaData, CreatePenggunaVariables>;
  operationName: string;
}
export const createPenggunaRef: CreatePenggunaRef;

export function createPengguna(vars: CreatePenggunaVariables): MutationPromise<CreatePenggunaData, CreatePenggunaVariables>;
export function createPengguna(dc: DataConnect, vars: CreatePenggunaVariables): MutationPromise<CreatePenggunaData, CreatePenggunaVariables>;

interface UpdatePenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePenggunaVariables): MutationRef<UpdatePenggunaData, UpdatePenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePenggunaVariables): MutationRef<UpdatePenggunaData, UpdatePenggunaVariables>;
  operationName: string;
}
export const updatePenggunaRef: UpdatePenggunaRef;

export function updatePengguna(vars: UpdatePenggunaVariables): MutationPromise<UpdatePenggunaData, UpdatePenggunaVariables>;
export function updatePengguna(dc: DataConnect, vars: UpdatePenggunaVariables): MutationPromise<UpdatePenggunaData, UpdatePenggunaVariables>;

interface DeletePenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePenggunaVariables): MutationRef<DeletePenggunaData, DeletePenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePenggunaVariables): MutationRef<DeletePenggunaData, DeletePenggunaVariables>;
  operationName: string;
}
export const deletePenggunaRef: DeletePenggunaRef;

export function deletePengguna(vars: DeletePenggunaVariables): MutationPromise<DeletePenggunaData, DeletePenggunaVariables>;
export function deletePengguna(dc: DataConnect, vars: DeletePenggunaVariables): MutationPromise<DeletePenggunaData, DeletePenggunaVariables>;

interface CreateGuruRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuruVariables): MutationRef<CreateGuruData, CreateGuruVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGuruVariables): MutationRef<CreateGuruData, CreateGuruVariables>;
  operationName: string;
}
export const createGuruRef: CreateGuruRef;

export function createGuru(vars: CreateGuruVariables): MutationPromise<CreateGuruData, CreateGuruVariables>;
export function createGuru(dc: DataConnect, vars: CreateGuruVariables): MutationPromise<CreateGuruData, CreateGuruVariables>;

interface UpdateGuruRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGuruVariables): MutationRef<UpdateGuruData, UpdateGuruVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGuruVariables): MutationRef<UpdateGuruData, UpdateGuruVariables>;
  operationName: string;
}
export const updateGuruRef: UpdateGuruRef;

export function updateGuru(vars: UpdateGuruVariables): MutationPromise<UpdateGuruData, UpdateGuruVariables>;
export function updateGuru(dc: DataConnect, vars: UpdateGuruVariables): MutationPromise<UpdateGuruData, UpdateGuruVariables>;

interface DeleteGuruRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGuruVariables): MutationRef<DeleteGuruData, DeleteGuruVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteGuruVariables): MutationRef<DeleteGuruData, DeleteGuruVariables>;
  operationName: string;
}
export const deleteGuruRef: DeleteGuruRef;

export function deleteGuru(vars: DeleteGuruVariables): MutationPromise<DeleteGuruData, DeleteGuruVariables>;
export function deleteGuru(dc: DataConnect, vars: DeleteGuruVariables): MutationPromise<DeleteGuruData, DeleteGuruVariables>;

interface CreateSiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSiswaVariables): MutationRef<CreateSiswaData, CreateSiswaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSiswaVariables): MutationRef<CreateSiswaData, CreateSiswaVariables>;
  operationName: string;
}
export const createSiswaRef: CreateSiswaRef;

export function createSiswa(vars: CreateSiswaVariables): MutationPromise<CreateSiswaData, CreateSiswaVariables>;
export function createSiswa(dc: DataConnect, vars: CreateSiswaVariables): MutationPromise<CreateSiswaData, CreateSiswaVariables>;

interface UpdateSiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSiswaVariables): MutationRef<UpdateSiswaData, UpdateSiswaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSiswaVariables): MutationRef<UpdateSiswaData, UpdateSiswaVariables>;
  operationName: string;
}
export const updateSiswaRef: UpdateSiswaRef;

export function updateSiswa(vars: UpdateSiswaVariables): MutationPromise<UpdateSiswaData, UpdateSiswaVariables>;
export function updateSiswa(dc: DataConnect, vars: UpdateSiswaVariables): MutationPromise<UpdateSiswaData, UpdateSiswaVariables>;

interface UpdateSiswaPeminatanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSiswaPeminatanVariables): MutationRef<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSiswaPeminatanVariables): MutationRef<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;
  operationName: string;
}
export const updateSiswaPeminatanRef: UpdateSiswaPeminatanRef;

export function updateSiswaPeminatan(vars: UpdateSiswaPeminatanVariables): MutationPromise<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;
export function updateSiswaPeminatan(dc: DataConnect, vars: UpdateSiswaPeminatanVariables): MutationPromise<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;

interface DeleteSiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSiswaVariables): MutationRef<DeleteSiswaData, DeleteSiswaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSiswaVariables): MutationRef<DeleteSiswaData, DeleteSiswaVariables>;
  operationName: string;
}
export const deleteSiswaRef: DeleteSiswaRef;

export function deleteSiswa(vars: DeleteSiswaVariables): MutationPromise<DeleteSiswaData, DeleteSiswaVariables>;
export function deleteSiswa(dc: DataConnect, vars: DeleteSiswaVariables): MutationPromise<DeleteSiswaData, DeleteSiswaVariables>;

interface CreateKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateKelasVariables): MutationRef<CreateKelasData, CreateKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateKelasVariables): MutationRef<CreateKelasData, CreateKelasVariables>;
  operationName: string;
}
export const createKelasRef: CreateKelasRef;

export function createKelas(vars: CreateKelasVariables): MutationPromise<CreateKelasData, CreateKelasVariables>;
export function createKelas(dc: DataConnect, vars: CreateKelasVariables): MutationPromise<CreateKelasData, CreateKelasVariables>;

interface UpdateKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateKelasVariables): MutationRef<UpdateKelasData, UpdateKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateKelasVariables): MutationRef<UpdateKelasData, UpdateKelasVariables>;
  operationName: string;
}
export const updateKelasRef: UpdateKelasRef;

export function updateKelas(vars: UpdateKelasVariables): MutationPromise<UpdateKelasData, UpdateKelasVariables>;
export function updateKelas(dc: DataConnect, vars: UpdateKelasVariables): MutationPromise<UpdateKelasData, UpdateKelasVariables>;

interface DeleteKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteKelasVariables): MutationRef<DeleteKelasData, DeleteKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteKelasVariables): MutationRef<DeleteKelasData, DeleteKelasVariables>;
  operationName: string;
}
export const deleteKelasRef: DeleteKelasRef;

export function deleteKelas(vars: DeleteKelasVariables): MutationPromise<DeleteKelasData, DeleteKelasVariables>;
export function deleteKelas(dc: DataConnect, vars: DeleteKelasVariables): MutationPromise<DeleteKelasData, DeleteKelasVariables>;

interface CreateJurusanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJurusanVariables): MutationRef<CreateJurusanData, CreateJurusanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateJurusanVariables): MutationRef<CreateJurusanData, CreateJurusanVariables>;
  operationName: string;
}
export const createJurusanRef: CreateJurusanRef;

export function createJurusan(vars: CreateJurusanVariables): MutationPromise<CreateJurusanData, CreateJurusanVariables>;
export function createJurusan(dc: DataConnect, vars: CreateJurusanVariables): MutationPromise<CreateJurusanData, CreateJurusanVariables>;

interface UpdateJurusanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateJurusanVariables): MutationRef<UpdateJurusanData, UpdateJurusanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateJurusanVariables): MutationRef<UpdateJurusanData, UpdateJurusanVariables>;
  operationName: string;
}
export const updateJurusanRef: UpdateJurusanRef;

export function updateJurusan(vars: UpdateJurusanVariables): MutationPromise<UpdateJurusanData, UpdateJurusanVariables>;
export function updateJurusan(dc: DataConnect, vars: UpdateJurusanVariables): MutationPromise<UpdateJurusanData, UpdateJurusanVariables>;

interface DeleteJurusanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteJurusanVariables): MutationRef<DeleteJurusanData, DeleteJurusanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteJurusanVariables): MutationRef<DeleteJurusanData, DeleteJurusanVariables>;
  operationName: string;
}
export const deleteJurusanRef: DeleteJurusanRef;

export function deleteJurusan(vars: DeleteJurusanVariables): MutationPromise<DeleteJurusanData, DeleteJurusanVariables>;
export function deleteJurusan(dc: DataConnect, vars: DeleteJurusanVariables): MutationPromise<DeleteJurusanData, DeleteJurusanVariables>;

interface CreateMataPelajaranRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMataPelajaranVariables): MutationRef<CreateMataPelajaranData, CreateMataPelajaranVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMataPelajaranVariables): MutationRef<CreateMataPelajaranData, CreateMataPelajaranVariables>;
  operationName: string;
}
export const createMataPelajaranRef: CreateMataPelajaranRef;

export function createMataPelajaran(vars: CreateMataPelajaranVariables): MutationPromise<CreateMataPelajaranData, CreateMataPelajaranVariables>;
export function createMataPelajaran(dc: DataConnect, vars: CreateMataPelajaranVariables): MutationPromise<CreateMataPelajaranData, CreateMataPelajaranVariables>;

interface UpdateMataPelajaranRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMataPelajaranVariables): MutationRef<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMataPelajaranVariables): MutationRef<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;
  operationName: string;
}
export const updateMataPelajaranRef: UpdateMataPelajaranRef;

export function updateMataPelajaran(vars: UpdateMataPelajaranVariables): MutationPromise<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;
export function updateMataPelajaran(dc: DataConnect, vars: UpdateMataPelajaranVariables): MutationPromise<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;

interface DeleteMataPelajaranRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMataPelajaranVariables): MutationRef<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMataPelajaranVariables): MutationRef<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;
  operationName: string;
}
export const deleteMataPelajaranRef: DeleteMataPelajaranRef;

export function deleteMataPelajaran(vars: DeleteMataPelajaranVariables): MutationPromise<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;
export function deleteMataPelajaran(dc: DataConnect, vars: DeleteMataPelajaranVariables): MutationPromise<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;

interface CreateJadwalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJadwalVariables): MutationRef<CreateJadwalData, CreateJadwalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateJadwalVariables): MutationRef<CreateJadwalData, CreateJadwalVariables>;
  operationName: string;
}
export const createJadwalRef: CreateJadwalRef;

export function createJadwal(vars: CreateJadwalVariables): MutationPromise<CreateJadwalData, CreateJadwalVariables>;
export function createJadwal(dc: DataConnect, vars: CreateJadwalVariables): MutationPromise<CreateJadwalData, CreateJadwalVariables>;

interface DeleteJadwalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteJadwalVariables): MutationRef<DeleteJadwalData, DeleteJadwalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteJadwalVariables): MutationRef<DeleteJadwalData, DeleteJadwalVariables>;
  operationName: string;
}
export const deleteJadwalRef: DeleteJadwalRef;

export function deleteJadwal(vars: DeleteJadwalVariables): MutationPromise<DeleteJadwalData, DeleteJadwalVariables>;
export function deleteJadwal(dc: DataConnect, vars: DeleteJadwalVariables): MutationPromise<DeleteJadwalData, DeleteJadwalVariables>;

interface UpsertNilaiRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertNilaiVariables): MutationRef<UpsertNilaiData, UpsertNilaiVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertNilaiVariables): MutationRef<UpsertNilaiData, UpsertNilaiVariables>;
  operationName: string;
}
export const upsertNilaiRef: UpsertNilaiRef;

export function upsertNilai(vars: UpsertNilaiVariables): MutationPromise<UpsertNilaiData, UpsertNilaiVariables>;
export function upsertNilai(dc: DataConnect, vars: UpsertNilaiVariables): MutationPromise<UpsertNilaiData, UpsertNilaiVariables>;

interface RecordKehadiranRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordKehadiranVariables): MutationRef<RecordKehadiranData, RecordKehadiranVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordKehadiranVariables): MutationRef<RecordKehadiranData, RecordKehadiranVariables>;
  operationName: string;
}
export const recordKehadiranRef: RecordKehadiranRef;

export function recordKehadiran(vars: RecordKehadiranVariables): MutationPromise<RecordKehadiranData, RecordKehadiranVariables>;
export function recordKehadiran(dc: DataConnect, vars: RecordKehadiranVariables): MutationPromise<RecordKehadiranData, RecordKehadiranVariables>;

interface CreatePengumumanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePengumumanVariables): MutationRef<CreatePengumumanData, CreatePengumumanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePengumumanVariables): MutationRef<CreatePengumumanData, CreatePengumumanVariables>;
  operationName: string;
}
export const createPengumumanRef: CreatePengumumanRef;

export function createPengumuman(vars: CreatePengumumanVariables): MutationPromise<CreatePengumumanData, CreatePengumumanVariables>;
export function createPengumuman(dc: DataConnect, vars: CreatePengumumanVariables): MutationPromise<CreatePengumumanData, CreatePengumumanVariables>;

interface DeletePengumumanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePengumumanVariables): MutationRef<DeletePengumumanData, DeletePengumumanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePengumumanVariables): MutationRef<DeletePengumumanData, DeletePengumumanVariables>;
  operationName: string;
}
export const deletePengumumanRef: DeletePengumumanRef;

export function deletePengumuman(vars: DeletePengumumanVariables): MutationPromise<DeletePengumumanData, DeletePengumumanVariables>;
export function deletePengumuman(dc: DataConnect, vars: DeletePengumumanVariables): MutationPromise<DeletePengumumanData, DeletePengumumanVariables>;

interface CreatePrestasiRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrestasiVariables): MutationRef<CreatePrestasiData, CreatePrestasiVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePrestasiVariables): MutationRef<CreatePrestasiData, CreatePrestasiVariables>;
  operationName: string;
}
export const createPrestasiRef: CreatePrestasiRef;

export function createPrestasi(vars: CreatePrestasiVariables): MutationPromise<CreatePrestasiData, CreatePrestasiVariables>;
export function createPrestasi(dc: DataConnect, vars: CreatePrestasiVariables): MutationPromise<CreatePrestasiData, CreatePrestasiVariables>;

interface DeletePrestasiRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrestasiVariables): MutationRef<DeletePrestasiData, DeletePrestasiVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePrestasiVariables): MutationRef<DeletePrestasiData, DeletePrestasiVariables>;
  operationName: string;
}
export const deletePrestasiRef: DeletePrestasiRef;

export function deletePrestasi(vars: DeletePrestasiVariables): MutationPromise<DeletePrestasiData, DeletePrestasiVariables>;
export function deletePrestasi(dc: DataConnect, vars: DeletePrestasiVariables): MutationPromise<DeletePrestasiData, DeletePrestasiVariables>;

interface CreateAlumniRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAlumniVariables): MutationRef<CreateAlumniData, CreateAlumniVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAlumniVariables): MutationRef<CreateAlumniData, CreateAlumniVariables>;
  operationName: string;
}
export const createAlumniRef: CreateAlumniRef;

export function createAlumni(vars: CreateAlumniVariables): MutationPromise<CreateAlumniData, CreateAlumniVariables>;
export function createAlumni(dc: DataConnect, vars: CreateAlumniVariables): MutationPromise<CreateAlumniData, CreateAlumniVariables>;

interface UpdateAlumniRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAlumniVariables): MutationRef<UpdateAlumniData, UpdateAlumniVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAlumniVariables): MutationRef<UpdateAlumniData, UpdateAlumniVariables>;
  operationName: string;
}
export const updateAlumniRef: UpdateAlumniRef;

export function updateAlumni(vars: UpdateAlumniVariables): MutationPromise<UpdateAlumniData, UpdateAlumniVariables>;
export function updateAlumni(dc: DataConnect, vars: UpdateAlumniVariables): MutationPromise<UpdateAlumniData, UpdateAlumniVariables>;

interface DeleteAlumniRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAlumniVariables): MutationRef<DeleteAlumniData, DeleteAlumniVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAlumniVariables): MutationRef<DeleteAlumniData, DeleteAlumniVariables>;
  operationName: string;
}
export const deleteAlumniRef: DeleteAlumniRef;

export function deleteAlumni(vars: DeleteAlumniVariables): MutationPromise<DeleteAlumniData, DeleteAlumniVariables>;
export function deleteAlumni(dc: DataConnect, vars: DeleteAlumniVariables): MutationPromise<DeleteAlumniData, DeleteAlumniVariables>;

interface ResetDatabaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<ResetDatabaseData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<ResetDatabaseData, undefined>;
  operationName: string;
}
export const resetDatabaseRef: ResetDatabaseRef;

export function resetDatabase(): MutationPromise<ResetDatabaseData, undefined>;
export function resetDatabase(dc: DataConnect): MutationPromise<ResetDatabaseData, undefined>;

interface ListPenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListPenggunaVariables): QueryRef<ListPenggunaData, ListPenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListPenggunaVariables): QueryRef<ListPenggunaData, ListPenggunaVariables>;
  operationName: string;
}
export const listPenggunaRef: ListPenggunaRef;

export function listPengguna(vars?: ListPenggunaVariables): QueryPromise<ListPenggunaData, ListPenggunaVariables>;
export function listPengguna(dc: DataConnect, vars?: ListPenggunaVariables): QueryPromise<ListPenggunaData, ListPenggunaVariables>;

interface GetPenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPenggunaVariables): QueryRef<GetPenggunaData, GetPenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPenggunaVariables): QueryRef<GetPenggunaData, GetPenggunaVariables>;
  operationName: string;
}
export const getPenggunaRef: GetPenggunaRef;

export function getPengguna(vars: GetPenggunaVariables): QueryPromise<GetPenggunaData, GetPenggunaVariables>;
export function getPengguna(dc: DataConnect, vars: GetPenggunaVariables): QueryPromise<GetPenggunaData, GetPenggunaVariables>;

interface GetPenggunaByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPenggunaByEmailVariables): QueryRef<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPenggunaByEmailVariables): QueryRef<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;
  operationName: string;
}
export const getPenggunaByEmailRef: GetPenggunaByEmailRef;

export function getPenggunaByEmail(vars: GetPenggunaByEmailVariables): QueryPromise<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;
export function getPenggunaByEmail(dc: DataConnect, vars: GetPenggunaByEmailVariables): QueryPromise<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;

interface ListGuruRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGuruData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGuruData, undefined>;
  operationName: string;
}
export const listGuruRef: ListGuruRef;

export function listGuru(): QueryPromise<ListGuruData, undefined>;
export function listGuru(dc: DataConnect): QueryPromise<ListGuruData, undefined>;

interface GetGuruRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGuruVariables): QueryRef<GetGuruData, GetGuruVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGuruVariables): QueryRef<GetGuruData, GetGuruVariables>;
  operationName: string;
}
export const getGuruRef: GetGuruRef;

export function getGuru(vars: GetGuruVariables): QueryPromise<GetGuruData, GetGuruVariables>;
export function getGuru(dc: DataConnect, vars: GetGuruVariables): QueryPromise<GetGuruData, GetGuruVariables>;

interface GetLastNipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLastNipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLastNipData, undefined>;
  operationName: string;
}
export const getLastNipRef: GetLastNipRef;

export function getLastNip(): QueryPromise<GetLastNipData, undefined>;
export function getLastNip(dc: DataConnect): QueryPromise<GetLastNipData, undefined>;

interface GetGuruByPenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGuruByPenggunaVariables): QueryRef<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGuruByPenggunaVariables): QueryRef<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;
  operationName: string;
}
export const getGuruByPenggunaRef: GetGuruByPenggunaRef;

export function getGuruByPengguna(vars: GetGuruByPenggunaVariables): QueryPromise<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;
export function getGuruByPengguna(dc: DataConnect, vars: GetGuruByPenggunaVariables): QueryPromise<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;

interface ListSemuaSiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSemuaSiswaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSemuaSiswaData, undefined>;
  operationName: string;
}
export const listSemuaSiswaRef: ListSemuaSiswaRef;

export function listSemuaSiswa(): QueryPromise<ListSemuaSiswaData, undefined>;
export function listSemuaSiswa(dc: DataConnect): QueryPromise<ListSemuaSiswaData, undefined>;

interface ListSiswaByKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSiswaByKelasVariables): QueryRef<ListSiswaByKelasData, ListSiswaByKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListSiswaByKelasVariables): QueryRef<ListSiswaByKelasData, ListSiswaByKelasVariables>;
  operationName: string;
}
export const listSiswaByKelasRef: ListSiswaByKelasRef;

export function listSiswaByKelas(vars: ListSiswaByKelasVariables): QueryPromise<ListSiswaByKelasData, ListSiswaByKelasVariables>;
export function listSiswaByKelas(dc: DataConnect, vars: ListSiswaByKelasVariables): QueryPromise<ListSiswaByKelasData, ListSiswaByKelasVariables>;

interface GetSiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSiswaVariables): QueryRef<GetSiswaData, GetSiswaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSiswaVariables): QueryRef<GetSiswaData, GetSiswaVariables>;
  operationName: string;
}
export const getSiswaRef: GetSiswaRef;

export function getSiswa(vars: GetSiswaVariables): QueryPromise<GetSiswaData, GetSiswaVariables>;
export function getSiswa(dc: DataConnect, vars: GetSiswaVariables): QueryPromise<GetSiswaData, GetSiswaVariables>;

interface GetLastNisRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLastNisData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLastNisData, undefined>;
  operationName: string;
}
export const getLastNisRef: GetLastNisRef;

export function getLastNis(): QueryPromise<GetLastNisData, undefined>;
export function getLastNis(dc: DataConnect): QueryPromise<GetLastNisData, undefined>;

interface GetSiswaByPenggunaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSiswaByPenggunaVariables): QueryRef<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSiswaByPenggunaVariables): QueryRef<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;
  operationName: string;
}
export const getSiswaByPenggunaRef: GetSiswaByPenggunaRef;

export function getSiswaByPengguna(vars: GetSiswaByPenggunaVariables): QueryPromise<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;
export function getSiswaByPengguna(dc: DataConnect, vars: GetSiswaByPenggunaVariables): QueryPromise<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;

interface ListSemuaKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSemuaKelasData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSemuaKelasData, undefined>;
  operationName: string;
}
export const listSemuaKelasRef: ListSemuaKelasRef;

export function listSemuaKelas(): QueryPromise<ListSemuaKelasData, undefined>;
export function listSemuaKelas(dc: DataConnect): QueryPromise<ListSemuaKelasData, undefined>;

interface ListKelasByTingkatRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListKelasByTingkatVariables): QueryRef<ListKelasByTingkatData, ListKelasByTingkatVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListKelasByTingkatVariables): QueryRef<ListKelasByTingkatData, ListKelasByTingkatVariables>;
  operationName: string;
}
export const listKelasByTingkatRef: ListKelasByTingkatRef;

export function listKelasByTingkat(vars: ListKelasByTingkatVariables): QueryPromise<ListKelasByTingkatData, ListKelasByTingkatVariables>;
export function listKelasByTingkat(dc: DataConnect, vars: ListKelasByTingkatVariables): QueryPromise<ListKelasByTingkatData, ListKelasByTingkatVariables>;

interface ListJurusanRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListJurusanData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListJurusanData, undefined>;
  operationName: string;
}
export const listJurusanRef: ListJurusanRef;

export function listJurusan(): QueryPromise<ListJurusanData, undefined>;
export function listJurusan(dc: DataConnect): QueryPromise<ListJurusanData, undefined>;

interface ListMataPelajaranRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMataPelajaranData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMataPelajaranData, undefined>;
  operationName: string;
}
export const listMataPelajaranRef: ListMataPelajaranRef;

export function listMataPelajaran(): QueryPromise<ListMataPelajaranData, undefined>;
export function listMataPelajaran(dc: DataConnect): QueryPromise<ListMataPelajaranData, undefined>;

interface GetJadwalByKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJadwalByKelasVariables): QueryRef<GetJadwalByKelasData, GetJadwalByKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetJadwalByKelasVariables): QueryRef<GetJadwalByKelasData, GetJadwalByKelasVariables>;
  operationName: string;
}
export const getJadwalByKelasRef: GetJadwalByKelasRef;

export function getJadwalByKelas(vars: GetJadwalByKelasVariables): QueryPromise<GetJadwalByKelasData, GetJadwalByKelasVariables>;
export function getJadwalByKelas(dc: DataConnect, vars: GetJadwalByKelasVariables): QueryPromise<GetJadwalByKelasData, GetJadwalByKelasVariables>;

interface GetJadwalByGuruRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJadwalByGuruVariables): QueryRef<GetJadwalByGuruData, GetJadwalByGuruVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetJadwalByGuruVariables): QueryRef<GetJadwalByGuruData, GetJadwalByGuruVariables>;
  operationName: string;
}
export const getJadwalByGuruRef: GetJadwalByGuruRef;

export function getJadwalByGuru(vars: GetJadwalByGuruVariables): QueryPromise<GetJadwalByGuruData, GetJadwalByGuruVariables>;
export function getJadwalByGuru(dc: DataConnect, vars: GetJadwalByGuruVariables): QueryPromise<GetJadwalByGuruData, GetJadwalByGuruVariables>;

interface GetNilaiBySiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNilaiBySiswaVariables): QueryRef<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetNilaiBySiswaVariables): QueryRef<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;
  operationName: string;
}
export const getNilaiBySiswaRef: GetNilaiBySiswaRef;

export function getNilaiBySiswa(vars: GetNilaiBySiswaVariables): QueryPromise<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;
export function getNilaiBySiswa(dc: DataConnect, vars: GetNilaiBySiswaVariables): QueryPromise<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;

interface GetNilaiByKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNilaiByKelasVariables): QueryRef<GetNilaiByKelasData, GetNilaiByKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetNilaiByKelasVariables): QueryRef<GetNilaiByKelasData, GetNilaiByKelasVariables>;
  operationName: string;
}
export const getNilaiByKelasRef: GetNilaiByKelasRef;

export function getNilaiByKelas(vars: GetNilaiByKelasVariables): QueryPromise<GetNilaiByKelasData, GetNilaiByKelasVariables>;
export function getNilaiByKelas(dc: DataConnect, vars: GetNilaiByKelasVariables): QueryPromise<GetNilaiByKelasData, GetNilaiByKelasVariables>;

interface GetKehadiranByKelasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetKehadiranByKelasVariables): QueryRef<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetKehadiranByKelasVariables): QueryRef<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;
  operationName: string;
}
export const getKehadiranByKelasRef: GetKehadiranByKelasRef;

export function getKehadiranByKelas(vars: GetKehadiranByKelasVariables): QueryPromise<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;
export function getKehadiranByKelas(dc: DataConnect, vars: GetKehadiranByKelasVariables): QueryPromise<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;

interface GetKehadiranBySiswaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetKehadiranBySiswaVariables): QueryRef<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetKehadiranBySiswaVariables): QueryRef<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;
  operationName: string;
}
export const getKehadiranBySiswaRef: GetKehadiranBySiswaRef;

export function getKehadiranBySiswa(vars: GetKehadiranBySiswaVariables): QueryPromise<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;
export function getKehadiranBySiswa(dc: DataConnect, vars: GetKehadiranBySiswaVariables): QueryPromise<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;

interface ListPengumumanRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPengumumanData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPengumumanData, undefined>;
  operationName: string;
}
export const listPengumumanRef: ListPengumumanRef;

export function listPengumuman(): QueryPromise<ListPengumumanData, undefined>;
export function listPengumuman(dc: DataConnect): QueryPromise<ListPengumumanData, undefined>;

interface ListPrestasiRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListPrestasiVariables): QueryRef<ListPrestasiData, ListPrestasiVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListPrestasiVariables): QueryRef<ListPrestasiData, ListPrestasiVariables>;
  operationName: string;
}
export const listPrestasiRef: ListPrestasiRef;

export function listPrestasi(vars?: ListPrestasiVariables): QueryPromise<ListPrestasiData, ListPrestasiVariables>;
export function listPrestasi(dc: DataConnect, vars?: ListPrestasiVariables): QueryPromise<ListPrestasiData, ListPrestasiVariables>;

interface ListAlumniRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAlumniVariables): QueryRef<ListAlumniData, ListAlumniVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListAlumniVariables): QueryRef<ListAlumniData, ListAlumniVariables>;
  operationName: string;
}
export const listAlumniRef: ListAlumniRef;

export function listAlumni(vars?: ListAlumniVariables): QueryPromise<ListAlumniData, ListAlumniVariables>;
export function listAlumni(dc: DataConnect, vars?: ListAlumniVariables): QueryPromise<ListAlumniData, ListAlumniVariables>;

