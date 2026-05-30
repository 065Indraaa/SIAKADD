const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const JabatanGuru = {
  Guru: "Guru",
  WaliKelas: "WaliKelas",
  Kepsek: "Kepsek",
  WakilKepsek: "WakilKepsek",
  BK: "BK",
}
exports.JabatanGuru = JabatanGuru;

const JenisKelamin = {
  L: "L",
  P: "P",
}
exports.JenisKelamin = JenisKelamin;

const PeranPengguna = {
  admin: "admin",
  guru: "guru",
  siswa: "siswa",
}
exports.PeranPengguna = PeranPengguna;

const StatusAlumni = {
  Kuliah: "Kuliah",
  Kerja: "Kerja",
  Lainnya: "Lainnya",
}
exports.StatusAlumni = StatusAlumni;

const StatusKehadiran = {
  Hadir: "Hadir",
  Izin: "Izin",
  Sakit: "Sakit",
  Alpa: "Alpa",
}
exports.StatusKehadiran = StatusKehadiran;

const TipePrestasi = {
  Akademik: "Akademik",
  NonAkademik: "NonAkademik",
}
exports.TipePrestasi = TipePrestasi;

const connectorConfig = {
  connector: 'uassiakad-connector',
  service: 'uassiakad-service',
  location: 'asia-southeast2'
};
exports.connectorConfig = connectorConfig;

const createPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePengguna', inputVars);
}
createPenggunaRef.operationName = 'CreatePengguna';
exports.createPenggunaRef = createPenggunaRef;

exports.createPengguna = function createPengguna(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPenggunaRef(dcInstance, inputVars));
}
;

const updatePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePengguna', inputVars);
}
updatePenggunaRef.operationName = 'UpdatePengguna';
exports.updatePenggunaRef = updatePenggunaRef;

exports.updatePengguna = function updatePengguna(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updatePenggunaRef(dcInstance, inputVars));
}
;

const deletePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengguna', inputVars);
}
deletePenggunaRef.operationName = 'DeletePengguna';
exports.deletePenggunaRef = deletePenggunaRef;

exports.deletePengguna = function deletePengguna(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePenggunaRef(dcInstance, inputVars));
}
;

const createGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuru', inputVars);
}
createGuruRef.operationName = 'CreateGuru';
exports.createGuruRef = createGuruRef;

exports.createGuru = function createGuru(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createGuruRef(dcInstance, inputVars));
}
;

const updateGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuru', inputVars);
}
updateGuruRef.operationName = 'UpdateGuru';
exports.updateGuruRef = updateGuruRef;

exports.updateGuru = function updateGuru(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateGuruRef(dcInstance, inputVars));
}
;

const deleteGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteGuru', inputVars);
}
deleteGuruRef.operationName = 'DeleteGuru';
exports.deleteGuruRef = deleteGuruRef;

exports.deleteGuru = function deleteGuru(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteGuruRef(dcInstance, inputVars));
}
;

const createSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSiswa', inputVars);
}
createSiswaRef.operationName = 'CreateSiswa';
exports.createSiswaRef = createSiswaRef;

exports.createSiswa = function createSiswa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSiswaRef(dcInstance, inputVars));
}
;

const updateSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswa', inputVars);
}
updateSiswaRef.operationName = 'UpdateSiswa';
exports.updateSiswaRef = updateSiswaRef;

exports.updateSiswa = function updateSiswa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateSiswaRef(dcInstance, inputVars));
}
;

const updateSiswaPeminatanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswaPeminatan', inputVars);
}
updateSiswaPeminatanRef.operationName = 'UpdateSiswaPeminatan';
exports.updateSiswaPeminatanRef = updateSiswaPeminatanRef;

exports.updateSiswaPeminatan = function updateSiswaPeminatan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateSiswaPeminatanRef(dcInstance, inputVars));
}
;

const deleteSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSiswa', inputVars);
}
deleteSiswaRef.operationName = 'DeleteSiswa';
exports.deleteSiswaRef = deleteSiswaRef;

exports.deleteSiswa = function deleteSiswa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSiswaRef(dcInstance, inputVars));
}
;

const createKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateKelas', inputVars);
}
createKelasRef.operationName = 'CreateKelas';
exports.createKelasRef = createKelasRef;

exports.createKelas = function createKelas(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createKelasRef(dcInstance, inputVars));
}
;

const updateKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateKelas', inputVars);
}
updateKelasRef.operationName = 'UpdateKelas';
exports.updateKelasRef = updateKelasRef;

exports.updateKelas = function updateKelas(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateKelasRef(dcInstance, inputVars));
}
;

const deleteKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteKelas', inputVars);
}
deleteKelasRef.operationName = 'DeleteKelas';
exports.deleteKelasRef = deleteKelasRef;

exports.deleteKelas = function deleteKelas(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteKelasRef(dcInstance, inputVars));
}
;

const createJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJurusan', inputVars);
}
createJurusanRef.operationName = 'CreateJurusan';
exports.createJurusanRef = createJurusanRef;

exports.createJurusan = function createJurusan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createJurusanRef(dcInstance, inputVars));
}
;

const updateJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateJurusan', inputVars);
}
updateJurusanRef.operationName = 'UpdateJurusan';
exports.updateJurusanRef = updateJurusanRef;

exports.updateJurusan = function updateJurusan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateJurusanRef(dcInstance, inputVars));
}
;

const deleteJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJurusan', inputVars);
}
deleteJurusanRef.operationName = 'DeleteJurusan';
exports.deleteJurusanRef = deleteJurusanRef;

exports.deleteJurusan = function deleteJurusan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteJurusanRef(dcInstance, inputVars));
}
;

const createMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMataPelajaran', inputVars);
}
createMataPelajaranRef.operationName = 'CreateMataPelajaran';
exports.createMataPelajaranRef = createMataPelajaranRef;

exports.createMataPelajaran = function createMataPelajaran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMataPelajaranRef(dcInstance, inputVars));
}
;

const updateMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMataPelajaran', inputVars);
}
updateMataPelajaranRef.operationName = 'UpdateMataPelajaran';
exports.updateMataPelajaranRef = updateMataPelajaranRef;

exports.updateMataPelajaran = function updateMataPelajaran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMataPelajaranRef(dcInstance, inputVars));
}
;

const deleteMataPelajaranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMataPelajaran', inputVars);
}
deleteMataPelajaranRef.operationName = 'DeleteMataPelajaran';
exports.deleteMataPelajaranRef = deleteMataPelajaranRef;

exports.deleteMataPelajaran = function deleteMataPelajaran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMataPelajaranRef(dcInstance, inputVars));
}
;

const createJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJadwal', inputVars);
}
createJadwalRef.operationName = 'CreateJadwal';
exports.createJadwalRef = createJadwalRef;

exports.createJadwal = function createJadwal(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createJadwalRef(dcInstance, inputVars));
}
;

const deleteJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJadwal', inputVars);
}
deleteJadwalRef.operationName = 'DeleteJadwal';
exports.deleteJadwalRef = deleteJadwalRef;

exports.deleteJadwal = function deleteJadwal(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteJadwalRef(dcInstance, inputVars));
}
;

const upsertNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNilai', inputVars);
}
upsertNilaiRef.operationName = 'UpsertNilai';
exports.upsertNilaiRef = upsertNilaiRef;

exports.upsertNilai = function upsertNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertNilaiRef(dcInstance, inputVars));
}
;

const updateNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateNilai', inputVars);
}
updateNilaiRef.operationName = 'UpdateNilai';
exports.updateNilaiRef = updateNilaiRef;

exports.updateNilai = function updateNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateNilaiRef(dcInstance, inputVars));
}
;

const upsertTugasHarianRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertTugasHarian', inputVars);
}
upsertTugasHarianRef.operationName = 'UpsertTugasHarian';
exports.upsertTugasHarianRef = upsertTugasHarianRef;

exports.upsertTugasHarian = function upsertTugasHarian(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertTugasHarianRef(dcInstance, inputVars));
}
;

const deleteTugasHarianRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTugasHarian', inputVars);
}
deleteTugasHarianRef.operationName = 'DeleteTugasHarian';
exports.deleteTugasHarianRef = deleteTugasHarianRef;

exports.deleteTugasHarian = function deleteTugasHarian(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteTugasHarianRef(dcInstance, inputVars));
}
;

const upsertBobotNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertBobotNilai', inputVars);
}
upsertBobotNilaiRef.operationName = 'UpsertBobotNilai';
exports.upsertBobotNilaiRef = upsertBobotNilaiRef;

exports.upsertBobotNilai = function upsertBobotNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertBobotNilaiRef(dcInstance, inputVars));
}
;

const updateBobotNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBobotNilai', inputVars);
}
updateBobotNilaiRef.operationName = 'UpdateBobotNilai';
exports.updateBobotNilaiRef = updateBobotNilaiRef;

exports.updateBobotNilai = function updateBobotNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateBobotNilaiRef(dcInstance, inputVars));
}
;

const recordKehadiranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordKehadiran', inputVars);
}
recordKehadiranRef.operationName = 'RecordKehadiran';
exports.recordKehadiranRef = recordKehadiranRef;

exports.recordKehadiran = function recordKehadiran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordKehadiranRef(dcInstance, inputVars));
}
;

const deleteKehadiranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteKehadiran', inputVars);
}
deleteKehadiranRef.operationName = 'DeleteKehadiran';
exports.deleteKehadiranRef = deleteKehadiranRef;

exports.deleteKehadiran = function deleteKehadiran(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteKehadiranRef(dcInstance, inputVars));
}
;

const createPengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePengumuman', inputVars);
}
createPengumumanRef.operationName = 'CreatePengumuman';
exports.createPengumumanRef = createPengumumanRef;

exports.createPengumuman = function createPengumuman(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPengumumanRef(dcInstance, inputVars));
}
;

const deletePengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengumuman', inputVars);
}
deletePengumumanRef.operationName = 'DeletePengumuman';
exports.deletePengumumanRef = deletePengumumanRef;

exports.deletePengumuman = function deletePengumuman(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePengumumanRef(dcInstance, inputVars));
}
;

const createPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePrestasi', inputVars);
}
createPrestasiRef.operationName = 'CreatePrestasi';
exports.createPrestasiRef = createPrestasiRef;

exports.createPrestasi = function createPrestasi(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPrestasiRef(dcInstance, inputVars));
}
;

const deletePrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrestasi', inputVars);
}
deletePrestasiRef.operationName = 'DeletePrestasi';
exports.deletePrestasiRef = deletePrestasiRef;

exports.deletePrestasi = function deletePrestasi(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePrestasiRef(dcInstance, inputVars));
}
;

const createAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAlumni', inputVars);
}
createAlumniRef.operationName = 'CreateAlumni';
exports.createAlumniRef = createAlumniRef;

exports.createAlumni = function createAlumni(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAlumniRef(dcInstance, inputVars));
}
;

const updateAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAlumni', inputVars);
}
updateAlumniRef.operationName = 'UpdateAlumni';
exports.updateAlumniRef = updateAlumniRef;

exports.updateAlumni = function updateAlumni(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAlumniRef(dcInstance, inputVars));
}
;

const deleteAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAlumni', inputVars);
}
deleteAlumniRef.operationName = 'DeleteAlumni';
exports.deleteAlumniRef = deleteAlumniRef;

exports.deleteAlumni = function deleteAlumni(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAlumniRef(dcInstance, inputVars));
}
;

const deleteNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteNilai', inputVars);
}
deleteNilaiRef.operationName = 'DeleteNilai';
exports.deleteNilaiRef = deleteNilaiRef;

exports.deleteNilai = function deleteNilai(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteNilaiRef(dcInstance, inputVars));
}
;

const resetDatabaseRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResetDatabase');
}
resetDatabaseRef.operationName = 'ResetDatabase';
exports.resetDatabaseRef = resetDatabaseRef;

exports.resetDatabase = function resetDatabase(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(resetDatabaseRef(dcInstance, inputVars));
}
;

const listPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengguna', inputVars);
}
listPenggunaRef.operationName = 'ListPengguna';
exports.listPenggunaRef = listPenggunaRef;

exports.listPengguna = function listPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPengguna', inputVars);
}
getPenggunaRef.operationName = 'GetPengguna';
exports.getPenggunaRef = getPenggunaRef;

exports.getPengguna = function getPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPenggunaByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPenggunaByEmail', inputVars);
}
getPenggunaByEmailRef.operationName = 'GetPenggunaByEmail';
exports.getPenggunaByEmailRef = getPenggunaByEmailRef;

exports.getPenggunaByEmail = function getPenggunaByEmail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPenggunaByEmailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listGuruRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuru');
}
listGuruRef.operationName = 'ListGuru';
exports.listGuruRef = listGuruRef;

exports.listGuru = function listGuru(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listGuruRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuru', inputVars);
}
getGuruRef.operationName = 'GetGuru';
exports.getGuruRef = getGuruRef;

exports.getGuru = function getGuru(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGuruRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getLastNipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIP');
}
getLastNipRef.operationName = 'GetLastNIP';
exports.getLastNipRef = getLastNipRef;

exports.getLastNip = function getLastNip(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getLastNipRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getGuruByPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuruByPengguna', inputVars);
}
getGuruByPenggunaRef.operationName = 'GetGuruByPengguna';
exports.getGuruByPenggunaRef = getGuruByPenggunaRef;

exports.getGuruByPengguna = function getGuruByPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGuruByPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listSemuaSiswaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaSiswa');
}
listSemuaSiswaRef.operationName = 'ListSemuaSiswa';
exports.listSemuaSiswaRef = listSemuaSiswaRef;

exports.listSemuaSiswa = function listSemuaSiswa(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSemuaSiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listSiswaByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSiswaByKelas', inputVars);
}
listSiswaByKelasRef.operationName = 'ListSiswaByKelas';
exports.listSiswaByKelasRef = listSiswaByKelasRef;

exports.listSiswaByKelas = function listSiswaByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listSiswaByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswa', inputVars);
}
getSiswaRef.operationName = 'GetSiswa';
exports.getSiswaRef = getSiswaRef;

exports.getSiswa = function getSiswa(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getLastNisRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIS');
}
getLastNisRef.operationName = 'GetLastNIS';
exports.getLastNisRef = getLastNisRef;

exports.getLastNis = function getLastNis(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getLastNisRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getSiswaByPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswaByPengguna', inputVars);
}
getSiswaByPenggunaRef.operationName = 'GetSiswaByPengguna';
exports.getSiswaByPenggunaRef = getSiswaByPenggunaRef;

exports.getSiswaByPengguna = function getSiswaByPengguna(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSiswaByPenggunaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listSemuaKelasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaKelas');
}
listSemuaKelasRef.operationName = 'ListSemuaKelas';
exports.listSemuaKelasRef = listSemuaKelasRef;

exports.listSemuaKelas = function listSemuaKelas(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSemuaKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listKelasByTingkatRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListKelasByTingkat', inputVars);
}
listKelasByTingkatRef.operationName = 'ListKelasByTingkat';
exports.listKelasByTingkatRef = listKelasByTingkatRef;

exports.listKelasByTingkat = function listKelasByTingkat(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listKelasByTingkatRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listJurusanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListJurusan');
}
listJurusanRef.operationName = 'ListJurusan';
exports.listJurusanRef = listJurusanRef;

exports.listJurusan = function listJurusan(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listJurusanRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listMataPelajaranRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMataPelajaran');
}
listMataPelajaranRef.operationName = 'ListMataPelajaran';
exports.listMataPelajaranRef = listMataPelajaranRef;

exports.listMataPelajaran = function listMataPelajaran(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMataPelajaranRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getJadwalByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByKelas', inputVars);
}
getJadwalByKelasRef.operationName = 'GetJadwalByKelas';
exports.getJadwalByKelasRef = getJadwalByKelasRef;

exports.getJadwalByKelas = function getJadwalByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getJadwalByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getJadwalByGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByGuru', inputVars);
}
getJadwalByGuruRef.operationName = 'GetJadwalByGuru';
exports.getJadwalByGuruRef = getJadwalByGuruRef;

exports.getJadwalByGuru = function getJadwalByGuru(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getJadwalByGuruRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getNilaiBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiBySiswa', inputVars);
}
getNilaiBySiswaRef.operationName = 'GetNilaiBySiswa';
exports.getNilaiBySiswaRef = getNilaiBySiswaRef;

exports.getNilaiBySiswa = function getNilaiBySiswa(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNilaiBySiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getNilaiByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiByKelas', inputVars);
}
getNilaiByKelasRef.operationName = 'GetNilaiByKelas';
exports.getNilaiByKelasRef = getNilaiByKelasRef;

exports.getNilaiByKelas = function getNilaiByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNilaiByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listTugasHarianRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTugasHarian', inputVars);
}
listTugasHarianRef.operationName = 'ListTugasHarian';
exports.listTugasHarianRef = listTugasHarianRef;

exports.listTugasHarian = function listTugasHarian(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTugasHarianRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listTugasHarianByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTugasHarianByKelas', inputVars);
}
listTugasHarianByKelasRef.operationName = 'ListTugasHarianByKelas';
exports.listTugasHarianByKelasRef = listTugasHarianByKelasRef;

exports.listTugasHarianByKelas = function listTugasHarianByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTugasHarianByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getBobotNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBobotNilai', inputVars);
}
getBobotNilaiRef.operationName = 'GetBobotNilai';
exports.getBobotNilaiRef = getBobotNilaiRef;

exports.getBobotNilai = function getBobotNilai(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getBobotNilaiRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listBobotNilaiByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBobotNilaiByKelas', inputVars);
}
listBobotNilaiByKelasRef.operationName = 'ListBobotNilaiByKelas';
exports.listBobotNilaiByKelasRef = listBobotNilaiByKelasRef;

exports.listBobotNilaiByKelas = function listBobotNilaiByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listBobotNilaiByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getKehadiranByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranByKelas', inputVars);
}
getKehadiranByKelasRef.operationName = 'GetKehadiranByKelas';
exports.getKehadiranByKelasRef = getKehadiranByKelasRef;

exports.getKehadiranByKelas = function getKehadiranByKelas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getKehadiranByKelasRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getKehadiranBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranBySiswa', inputVars);
}
getKehadiranBySiswaRef.operationName = 'GetKehadiranBySiswa';
exports.getKehadiranBySiswaRef = getKehadiranBySiswaRef;

exports.getKehadiranBySiswa = function getKehadiranBySiswa(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getKehadiranBySiswaRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listPengumumanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengumuman');
}
listPengumumanRef.operationName = 'ListPengumuman';
exports.listPengumumanRef = listPengumumanRef;

exports.listPengumuman = function listPengumuman(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listPengumumanRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPrestasi', inputVars);
}
listPrestasiRef.operationName = 'ListPrestasi';
exports.listPrestasiRef = listPrestasiRef;

exports.listPrestasi = function listPrestasi(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listPrestasiRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAlumni', inputVars);
}
listAlumniRef.operationName = 'ListAlumni';
exports.listAlumniRef = listAlumniRef;

exports.listAlumni = function listAlumni(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listAlumniRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
