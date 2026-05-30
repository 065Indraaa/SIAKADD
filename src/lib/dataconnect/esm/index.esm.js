import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

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
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPenggunaRef(dcInstance, inputVars));
}

export const updatePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePengguna', inputVars);
}
updatePenggunaRef.operationName = 'UpdatePengguna';

export function updatePengguna(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updatePenggunaRef(dcInstance, inputVars));
}

export const deletePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengguna', inputVars);
}
deletePenggunaRef.operationName = 'DeletePengguna';

export function deletePengguna(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePenggunaRef(dcInstance, inputVars));
}

export const createGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuru', inputVars);
}
createGuruRef.operationName = 'CreateGuru';

export function createGuru(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createGuruRef(dcInstance, inputVars));
}

export const updateGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuru', inputVars);
}
updateGuruRef.operationName = 'UpdateGuru';

export function updateGuru(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateGuruRef(dcInstance, inputVars));
}

export const deleteGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteGuru', inputVars);
}
deleteGuruRef.operationName = 'DeleteGuru';

export function deleteGuru(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteGuruRef(dcInstance, inputVars));
}

export const createSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSiswa', inputVars);
}
createSiswaRef.operationName = 'CreateSiswa';

export function createSiswa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSiswaRef(dcInstance, inputVars));
}

export const updateSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswa', inputVars);
}
updateSiswaRef.operationName = 'UpdateSiswa';

export function updateSiswa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateSiswaRef(dcInstance, inputVars));
}

export const updateSiswaPeminatanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswaPeminatan', inputVars);
}
updateSiswaPeminatanRef.operationName = 'UpdateSiswaPeminatan';

export function updateSiswaPeminatan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateSiswaPeminatanRef(dcInstance, inputVars));
}

export const deleteSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSiswa', inputVars);
}
deleteSiswaRef.operationName = 'DeleteSiswa';

export function deleteSiswa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSiswaRef(dcInstance, inputVars));
}

export const createKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateKelas', inputVars);
}
createKelasRef.operationName = 'CreateKelas';

export function createKelas(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createKelasRef(dcInstance, inputVars));
}

export const updateKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateKelas', inputVars);
}
updateKelasRef.operationName = 'UpdateKelas';

export function updateKelas(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateKelasRef(dcInstance, inputVars));
}

export const deleteKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteKelas', inputVars);
}
deleteKelasRef.operationName = 'DeleteKelas';

export function deleteKelas(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteKelasRef(dcInstance, inputVars));
}

export const createJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJurusan', inputVars);
}
createJurusanRef.operationName = 'CreateJurusan';

export function createJurusan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createJurusanRef(dcInstance, inputVars));
}

export const updateJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateJurusan', inputVars);
}
updateJurusanRef.operationName = 'UpdateJurusan';

export function updateJurusan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateJurusanRef(dcInstance, inputVars));
}

export const deleteJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJurusan', inputVars);
}
deleteJurusanRef.operationName = 'DeleteJurusan';

export function deleteJurusan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteJurusanRef(dcInstance, inputVars));
}

export const createMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMataPelajaran', inputVars);
}
createMataPelajaranRef.operationName = 'CreateMataPelajaran';

export function createMataPelajaran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMataPelajaranRef(dcInstance, inputVars));
}

export const updateMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMataPelajaran', inputVars);
}
updateMataPelajaranRef.operationName = 'UpdateMataPelajaran';

export function updateMataPelajaran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMataPelajaranRef(dcInstance, inputVars));
}

export const deleteMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMataPelajaran', inputVars);
}
deleteMataPelajaranRef.operationName = 'DeleteMataPelajaran';

export function deleteMataPelajaran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMataPelajaranRef(dcInstance, inputVars));
}

export const createJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJadwal', inputVars);
}
createJadwalRef.operationName = 'CreateJadwal';

export function createJadwal(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createJadwalRef(dcInstance, inputVars));
}

export const deleteJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJadwal', inputVars);
}
deleteJadwalRef.operationName = 'DeleteJadwal';

export function deleteJadwal(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteJadwalRef(dcInstance, inputVars));
}

export const upsertNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNilai', inputVars);
}
upsertNilaiRef.operationName = 'UpsertNilai';

export function upsertNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertNilaiRef(dcInstance, inputVars));
}

export const updateNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateNilai', inputVars);
}
updateNilaiRef.operationName = 'UpdateNilai';

export function updateNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateNilaiRef(dcInstance, inputVars));
}

export const upsertTugasHarianRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertTugasHarian', inputVars);
}
upsertTugasHarianRef.operationName = 'UpsertTugasHarian';

export function upsertTugasHarian(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertTugasHarianRef(dcInstance, inputVars));
}

export const deleteTugasHarianRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTugasHarian', inputVars);
}
deleteTugasHarianRef.operationName = 'DeleteTugasHarian';

export function deleteTugasHarian(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteTugasHarianRef(dcInstance, inputVars));
}

export const upsertBobotNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertBobotNilai', inputVars);
}
upsertBobotNilaiRef.operationName = 'UpsertBobotNilai';

export function upsertBobotNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertBobotNilaiRef(dcInstance, inputVars));
}

export const updateBobotNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBobotNilai', inputVars);
}
updateBobotNilaiRef.operationName = 'UpdateBobotNilai';

export function updateBobotNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateBobotNilaiRef(dcInstance, inputVars));
}

export const recordKehadiranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordKehadiran', inputVars);
}
recordKehadiranRef.operationName = 'RecordKehadiran';

export function recordKehadiran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordKehadiranRef(dcInstance, inputVars));
}

export const deleteKehadiranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteKehadiran', inputVars);
}
deleteKehadiranRef.operationName = 'DeleteKehadiran';

export function deleteKehadiran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteKehadiranRef(dcInstance, inputVars));
}

export const createPengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePengumuman', inputVars);
}
createPengumumanRef.operationName = 'CreatePengumuman';

export function createPengumuman(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPengumumanRef(dcInstance, inputVars));
}

export const deletePengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengumuman', inputVars);
}
deletePengumumanRef.operationName = 'DeletePengumuman';

export function deletePengumuman(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePengumumanRef(dcInstance, inputVars));
}

export const createPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePrestasi', inputVars);
}
createPrestasiRef.operationName = 'CreatePrestasi';

export function createPrestasi(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPrestasiRef(dcInstance, inputVars));
}

export const deletePrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrestasi', inputVars);
}
deletePrestasiRef.operationName = 'DeletePrestasi';

export function deletePrestasi(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePrestasiRef(dcInstance, inputVars));
}

export const createAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAlumni', inputVars);
}
createAlumniRef.operationName = 'CreateAlumni';

export function createAlumni(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAlumniRef(dcInstance, inputVars));
}

export const updateAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAlumni', inputVars);
}
updateAlumniRef.operationName = 'UpdateAlumni';

export function updateAlumni(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAlumniRef(dcInstance, inputVars));
}

export const deleteAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAlumni', inputVars);
}
deleteAlumniRef.operationName = 'DeleteAlumni';

export function deleteAlumni(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAlumniRef(dcInstance, inputVars));
}

export const deleteNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteNilai', inputVars);
}
deleteNilaiRef.operationName = 'DeleteNilai';

export function deleteNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteNilaiRef(dcInstance, inputVars));
}

export const resetDatabaseRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResetDatabase');
}
resetDatabaseRef.operationName = 'ResetDatabase';

export function resetDatabase(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(resetDatabaseRef(dcInstance, inputVars));
}

export const listPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengguna', inputVars);
}
listPenggunaRef.operationName = 'ListPengguna';

export function listPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPengguna', inputVars);
}
getPenggunaRef.operationName = 'GetPengguna';

export function getPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getPenggunaByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPenggunaByEmail', inputVars);
}
getPenggunaByEmailRef.operationName = 'GetPenggunaByEmail';

export function getPenggunaByEmail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPenggunaByEmailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listGuruRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuru');
}
listGuruRef.operationName = 'ListGuru';

export function listGuru(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listGuruRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuru', inputVars);
}
getGuruRef.operationName = 'GetGuru';

export function getGuru(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGuruRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getLastNipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIP');
}
getLastNipRef.operationName = 'GetLastNIP';

export function getLastNip(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getLastNipRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getGuruByPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuruByPengguna', inputVars);
}
getGuruByPenggunaRef.operationName = 'GetGuruByPengguna';

export function getGuruByPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGuruByPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listSemuaSiswaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaSiswa');
}
listSemuaSiswaRef.operationName = 'ListSemuaSiswa';

export function listSemuaSiswa(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSemuaSiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listSiswaByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSiswaByKelas', inputVars);
}
listSiswaByKelasRef.operationName = 'ListSiswaByKelas';

export function listSiswaByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listSiswaByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswa', inputVars);
}
getSiswaRef.operationName = 'GetSiswa';

export function getSiswa(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getLastNisRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIS');
}
getLastNisRef.operationName = 'GetLastNIS';

export function getLastNis(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getLastNisRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getSiswaByPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswaByPengguna', inputVars);
}
getSiswaByPenggunaRef.operationName = 'GetSiswaByPengguna';

export function getSiswaByPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSiswaByPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listSemuaKelasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaKelas');
}
listSemuaKelasRef.operationName = 'ListSemuaKelas';

export function listSemuaKelas(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSemuaKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listKelasByTingkatRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListKelasByTingkat', inputVars);
}
listKelasByTingkatRef.operationName = 'ListKelasByTingkat';

export function listKelasByTingkat(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listKelasByTingkatRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listJurusanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListJurusan');
}
listJurusanRef.operationName = 'ListJurusan';

export function listJurusan(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listJurusanRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listMataPelajaranRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMataPelajaran');
}
listMataPelajaranRef.operationName = 'ListMataPelajaran';

export function listMataPelajaran(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMataPelajaranRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getJadwalByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByKelas', inputVars);
}
getJadwalByKelasRef.operationName = 'GetJadwalByKelas';

export function getJadwalByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getJadwalByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getJadwalByGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByGuru', inputVars);
}
getJadwalByGuruRef.operationName = 'GetJadwalByGuru';

export function getJadwalByGuru(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getJadwalByGuruRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getNilaiBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiBySiswa', inputVars);
}
getNilaiBySiswaRef.operationName = 'GetNilaiBySiswa';

export function getNilaiBySiswa(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNilaiBySiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getNilaiByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiByKelas', inputVars);
}
getNilaiByKelasRef.operationName = 'GetNilaiByKelas';

export function getNilaiByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNilaiByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listTugasHarianRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTugasHarian', inputVars);
}
listTugasHarianRef.operationName = 'ListTugasHarian';

export function listTugasHarian(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTugasHarianRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listTugasHarianByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTugasHarianByKelas', inputVars);
}
listTugasHarianByKelasRef.operationName = 'ListTugasHarianByKelas';

export function listTugasHarianByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTugasHarianByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getBobotNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBobotNilai', inputVars);
}
getBobotNilaiRef.operationName = 'GetBobotNilai';

export function getBobotNilai(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getBobotNilaiRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listBobotNilaiByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBobotNilaiByKelas', inputVars);
}
listBobotNilaiByKelasRef.operationName = 'ListBobotNilaiByKelas';

export function listBobotNilaiByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listBobotNilaiByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getKehadiranByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranByKelas', inputVars);
}
getKehadiranByKelasRef.operationName = 'GetKehadiranByKelas';

export function getKehadiranByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getKehadiranByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getKehadiranBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranBySiswa', inputVars);
}
getKehadiranBySiswaRef.operationName = 'GetKehadiranBySiswa';

export function getKehadiranBySiswa(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getKehadiranBySiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listPengumumanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengumuman');
}
listPengumumanRef.operationName = 'ListPengumuman';

export function listPengumuman(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listPengumumanRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPrestasi', inputVars);
}
listPrestasiRef.operationName = 'ListPrestasi';

export function listPrestasi(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listPrestasiRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const listAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAlumni', inputVars);
}
listAlumniRef.operationName = 'ListAlumni';

export function listAlumni(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listAlumniRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

