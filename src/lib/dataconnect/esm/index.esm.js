import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const JabatanGuru = {
  Guru: "Guru",
  WaliKelas: "WaliKelas",
  Kepsek: "Kepsek",
  WakilKepsek: "WakilKepsek",
  BK: "BK",
}

export const JenisKelamin = {
  L: "L",
  P: "P",
}

export const PeranPengguna = {
  admin: "admin",
  guru: "guru",
  siswa: "siswa",
}

export const StatusAlumni = {
  Kuliah: "Kuliah",
  Kerja: "Kerja",
  Lainnya: "Lainnya",
}

export const StatusKehadiran = {
  Hadir: "Hadir",
  Izin: "Izin",
  Sakit: "Sakit",
  Alpa: "Alpa",
}

export const TipePrestasi = {
  Akademik: "Akademik",
  NonAkademik: "NonAkademik",
}

export const connectorConfig = {
  connector: 'uassiakad-connector',
  service: 'uassiakad-service',
  location: 'asia-southeast2'
};

export const createPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePengguna', inputVars);
}
createPenggunaRef.operationName = 'CreatePengguna';

export function createPengguna(dcOrVars, vars) {
  return executeMutation(createPenggunaRef(dcOrVars, vars));
}

export const updatePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePengguna', inputVars);
}
updatePenggunaRef.operationName = 'UpdatePengguna';

export function updatePengguna(dcOrVars, vars) {
  return executeMutation(updatePenggunaRef(dcOrVars, vars));
}

export const deletePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengguna', inputVars);
}
deletePenggunaRef.operationName = 'DeletePengguna';

export function deletePengguna(dcOrVars, vars) {
  return executeMutation(deletePenggunaRef(dcOrVars, vars));
}

export const createGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuru', inputVars);
}
createGuruRef.operationName = 'CreateGuru';

export function createGuru(dcOrVars, vars) {
  return executeMutation(createGuruRef(dcOrVars, vars));
}

export const updateGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuru', inputVars);
}
updateGuruRef.operationName = 'UpdateGuru';

export function updateGuru(dcOrVars, vars) {
  return executeMutation(updateGuruRef(dcOrVars, vars));
}

export const deleteGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteGuru', inputVars);
}
deleteGuruRef.operationName = 'DeleteGuru';

export function deleteGuru(dcOrVars, vars) {
  return executeMutation(deleteGuruRef(dcOrVars, vars));
}

export const createSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSiswa', inputVars);
}
createSiswaRef.operationName = 'CreateSiswa';

export function createSiswa(dcOrVars, vars) {
  return executeMutation(createSiswaRef(dcOrVars, vars));
}

export const updateSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswa', inputVars);
}
updateSiswaRef.operationName = 'UpdateSiswa';

export function updateSiswa(dcOrVars, vars) {
  return executeMutation(updateSiswaRef(dcOrVars, vars));
}

export const updateSiswaPeminatanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswaPeminatan', inputVars);
}
updateSiswaPeminatanRef.operationName = 'UpdateSiswaPeminatan';

export function updateSiswaPeminatan(dcOrVars, vars) {
  return executeMutation(updateSiswaPeminatanRef(dcOrVars, vars));
}

export const deleteSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSiswa', inputVars);
}
deleteSiswaRef.operationName = 'DeleteSiswa';

export function deleteSiswa(dcOrVars, vars) {
  return executeMutation(deleteSiswaRef(dcOrVars, vars));
}

export const createKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateKelas', inputVars);
}
createKelasRef.operationName = 'CreateKelas';

export function createKelas(dcOrVars, vars) {
  return executeMutation(createKelasRef(dcOrVars, vars));
}

export const updateKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateKelas', inputVars);
}
updateKelasRef.operationName = 'UpdateKelas';

export function updateKelas(dcOrVars, vars) {
  return executeMutation(updateKelasRef(dcOrVars, vars));
}

export const deleteKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteKelas', inputVars);
}
deleteKelasRef.operationName = 'DeleteKelas';

export function deleteKelas(dcOrVars, vars) {
  return executeMutation(deleteKelasRef(dcOrVars, vars));
}

export const createJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJurusan', inputVars);
}
createJurusanRef.operationName = 'CreateJurusan';

export function createJurusan(dcOrVars, vars) {
  return executeMutation(createJurusanRef(dcOrVars, vars));
}

export const updateJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateJurusan', inputVars);
}
updateJurusanRef.operationName = 'UpdateJurusan';

export function updateJurusan(dcOrVars, vars) {
  return executeMutation(updateJurusanRef(dcOrVars, vars));
}

export const deleteJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJurusan', inputVars);
}
deleteJurusanRef.operationName = 'DeleteJurusan';

export function deleteJurusan(dcOrVars, vars) {
  return executeMutation(deleteJurusanRef(dcOrVars, vars));
}

export const createMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMataPelajaran', inputVars);
}
createMataPelajaranRef.operationName = 'CreateMataPelajaran';

export function createMataPelajaran(dcOrVars, vars) {
  return executeMutation(createMataPelajaranRef(dcOrVars, vars));
}

export const updateMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMataPelajaran', inputVars);
}
updateMataPelajaranRef.operationName = 'UpdateMataPelajaran';

export function updateMataPelajaran(dcOrVars, vars) {
  return executeMutation(updateMataPelajaranRef(dcOrVars, vars));
}

export const deleteMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMataPelajaran', inputVars);
}
deleteMataPelajaranRef.operationName = 'DeleteMataPelajaran';

export function deleteMataPelajaran(dcOrVars, vars) {
  return executeMutation(deleteMataPelajaranRef(dcOrVars, vars));
}

export const createJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJadwal', inputVars);
}
createJadwalRef.operationName = 'CreateJadwal';

export function createJadwal(dcOrVars, vars) {
  return executeMutation(createJadwalRef(dcOrVars, vars));
}

export const deleteJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJadwal', inputVars);
}
deleteJadwalRef.operationName = 'DeleteJadwal';

export function deleteJadwal(dcOrVars, vars) {
  return executeMutation(deleteJadwalRef(dcOrVars, vars));
}

export const upsertNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNilai', inputVars);
}
upsertNilaiRef.operationName = 'UpsertNilai';

export function upsertNilai(dcOrVars, vars) {
  return executeMutation(upsertNilaiRef(dcOrVars, vars));
}

export const recordKehadiranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordKehadiran', inputVars);
}
recordKehadiranRef.operationName = 'RecordKehadiran';

export function recordKehadiran(dcOrVars, vars) {
  return executeMutation(recordKehadiranRef(dcOrVars, vars));
}

export const createPengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePengumuman', inputVars);
}
createPengumumanRef.operationName = 'CreatePengumuman';

export function createPengumuman(dcOrVars, vars) {
  return executeMutation(createPengumumanRef(dcOrVars, vars));
}

export const deletePengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengumuman', inputVars);
}
deletePengumumanRef.operationName = 'DeletePengumuman';

export function deletePengumuman(dcOrVars, vars) {
  return executeMutation(deletePengumumanRef(dcOrVars, vars));
}

export const createPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePrestasi', inputVars);
}
createPrestasiRef.operationName = 'CreatePrestasi';

export function createPrestasi(dcOrVars, vars) {
  return executeMutation(createPrestasiRef(dcOrVars, vars));
}

export const deletePrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrestasi', inputVars);
}
deletePrestasiRef.operationName = 'DeletePrestasi';

export function deletePrestasi(dcOrVars, vars) {
  return executeMutation(deletePrestasiRef(dcOrVars, vars));
}

export const createAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAlumni', inputVars);
}
createAlumniRef.operationName = 'CreateAlumni';

export function createAlumni(dcOrVars, vars) {
  return executeMutation(createAlumniRef(dcOrVars, vars));
}

export const updateAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAlumni', inputVars);
}
updateAlumniRef.operationName = 'UpdateAlumni';

export function updateAlumni(dcOrVars, vars) {
  return executeMutation(updateAlumniRef(dcOrVars, vars));
}

export const deleteAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAlumni', inputVars);
}
deleteAlumniRef.operationName = 'DeleteAlumni';

export function deleteAlumni(dcOrVars, vars) {
  return executeMutation(deleteAlumniRef(dcOrVars, vars));
}

export const resetDatabaseRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResetDatabase');
}
resetDatabaseRef.operationName = 'ResetDatabase';

export function resetDatabase(dc) {
  return executeMutation(resetDatabaseRef(dc));
}

export const listPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengguna', inputVars);
}
listPenggunaRef.operationName = 'ListPengguna';

export function listPengguna(dcOrVars, vars) {
  return executeQuery(listPenggunaRef(dcOrVars, vars));
}

export const getPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPengguna', inputVars);
}
getPenggunaRef.operationName = 'GetPengguna';

export function getPengguna(dcOrVars, vars) {
  return executeQuery(getPenggunaRef(dcOrVars, vars));
}

export const getPenggunaByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPenggunaByEmail', inputVars);
}
getPenggunaByEmailRef.operationName = 'GetPenggunaByEmail';

export function getPenggunaByEmail(dcOrVars, vars) {
  return executeQuery(getPenggunaByEmailRef(dcOrVars, vars));
}

export const listGuruRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuru');
}
listGuruRef.operationName = 'ListGuru';

export function listGuru(dc) {
  return executeQuery(listGuruRef(dc));
}

export const getGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuru', inputVars);
}
getGuruRef.operationName = 'GetGuru';

export function getGuru(dcOrVars, vars) {
  return executeQuery(getGuruRef(dcOrVars, vars));
}

export const getLastNipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIP');
}
getLastNipRef.operationName = 'GetLastNIP';

export function getLastNip(dc) {
  return executeQuery(getLastNipRef(dc));
}

export const getGuruByPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuruByPengguna', inputVars);
}
getGuruByPenggunaRef.operationName = 'GetGuruByPengguna';

export function getGuruByPengguna(dcOrVars, vars) {
  return executeQuery(getGuruByPenggunaRef(dcOrVars, vars));
}

export const listSemuaSiswaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaSiswa');
}
listSemuaSiswaRef.operationName = 'ListSemuaSiswa';

export function listSemuaSiswa(dc) {
  return executeQuery(listSemuaSiswaRef(dc));
}

export const listSiswaByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSiswaByKelas', inputVars);
}
listSiswaByKelasRef.operationName = 'ListSiswaByKelas';

export function listSiswaByKelas(dcOrVars, vars) {
  return executeQuery(listSiswaByKelasRef(dcOrVars, vars));
}

export const getSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswa', inputVars);
}
getSiswaRef.operationName = 'GetSiswa';

export function getSiswa(dcOrVars, vars) {
  return executeQuery(getSiswaRef(dcOrVars, vars));
}

export const getLastNisRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIS');
}
getLastNisRef.operationName = 'GetLastNIS';

export function getLastNis(dc) {
  return executeQuery(getLastNisRef(dc));
}

export const getSiswaByPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswaByPengguna', inputVars);
}
getSiswaByPenggunaRef.operationName = 'GetSiswaByPengguna';

export function getSiswaByPengguna(dcOrVars, vars) {
  return executeQuery(getSiswaByPenggunaRef(dcOrVars, vars));
}

export const listSemuaKelasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaKelas');
}
listSemuaKelasRef.operationName = 'ListSemuaKelas';

export function listSemuaKelas(dc) {
  return executeQuery(listSemuaKelasRef(dc));
}

export const listKelasByTingkatRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListKelasByTingkat', inputVars);
}
listKelasByTingkatRef.operationName = 'ListKelasByTingkat';

export function listKelasByTingkat(dcOrVars, vars) {
  return executeQuery(listKelasByTingkatRef(dcOrVars, vars));
}

export const listJurusanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListJurusan');
}
listJurusanRef.operationName = 'ListJurusan';

export function listJurusan(dc) {
  return executeQuery(listJurusanRef(dc));
}

export const listMataPelajaranRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMataPelajaran');
}
listMataPelajaranRef.operationName = 'ListMataPelajaran';

export function listMataPelajaran(dc) {
  return executeQuery(listMataPelajaranRef(dc));
}

export const getJadwalByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByKelas', inputVars);
}
getJadwalByKelasRef.operationName = 'GetJadwalByKelas';

export function getJadwalByKelas(dcOrVars, vars) {
  return executeQuery(getJadwalByKelasRef(dcOrVars, vars));
}

export const getJadwalByGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByGuru', inputVars);
}
getJadwalByGuruRef.operationName = 'GetJadwalByGuru';

export function getJadwalByGuru(dcOrVars, vars) {
  return executeQuery(getJadwalByGuruRef(dcOrVars, vars));
}

export const getNilaiBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiBySiswa', inputVars);
}
getNilaiBySiswaRef.operationName = 'GetNilaiBySiswa';

export function getNilaiBySiswa(dcOrVars, vars) {
  return executeQuery(getNilaiBySiswaRef(dcOrVars, vars));
}

export const getNilaiByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiByKelas', inputVars);
}
getNilaiByKelasRef.operationName = 'GetNilaiByKelas';

export function getNilaiByKelas(dcOrVars, vars) {
  return executeQuery(getNilaiByKelasRef(dcOrVars, vars));
}

export const getKehadiranByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranByKelas', inputVars);
}
getKehadiranByKelasRef.operationName = 'GetKehadiranByKelas';

export function getKehadiranByKelas(dcOrVars, vars) {
  return executeQuery(getKehadiranByKelasRef(dcOrVars, vars));
}

export const getKehadiranBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranBySiswa', inputVars);
}
getKehadiranBySiswaRef.operationName = 'GetKehadiranBySiswa';

export function getKehadiranBySiswa(dcOrVars, vars) {
  return executeQuery(getKehadiranBySiswaRef(dcOrVars, vars));
}

export const listPengumumanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengumuman');
}
listPengumumanRef.operationName = 'ListPengumuman';

export function listPengumuman(dc) {
  return executeQuery(listPengumumanRef(dc));
}

export const listPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPrestasi', inputVars);
}
listPrestasiRef.operationName = 'ListPrestasi';

export function listPrestasi(dcOrVars, vars) {
  return executeQuery(listPrestasiRef(dcOrVars, vars));
}

export const listAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAlumni', inputVars);
}
listAlumniRef.operationName = 'ListAlumni';

export function listAlumni(dcOrVars, vars) {
  return executeQuery(listAlumniRef(dcOrVars, vars));
}

