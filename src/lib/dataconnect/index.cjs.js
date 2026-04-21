const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

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
  return executeMutation(createPenggunaRef(dcOrVars, vars));
};

const updatePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePengguna', inputVars);
}
updatePenggunaRef.operationName = 'UpdatePengguna';
exports.updatePenggunaRef = updatePenggunaRef;

exports.updatePengguna = function updatePengguna(dcOrVars, vars) {
  return executeMutation(updatePenggunaRef(dcOrVars, vars));
};

const deletePenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengguna', inputVars);
}
deletePenggunaRef.operationName = 'DeletePengguna';
exports.deletePenggunaRef = deletePenggunaRef;

exports.deletePengguna = function deletePengguna(dcOrVars, vars) {
  return executeMutation(deletePenggunaRef(dcOrVars, vars));
};

const createGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuru', inputVars);
}
createGuruRef.operationName = 'CreateGuru';
exports.createGuruRef = createGuruRef;

exports.createGuru = function createGuru(dcOrVars, vars) {
  return executeMutation(createGuruRef(dcOrVars, vars));
};

const updateGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuru', inputVars);
}
updateGuruRef.operationName = 'UpdateGuru';
exports.updateGuruRef = updateGuruRef;

exports.updateGuru = function updateGuru(dcOrVars, vars) {
  return executeMutation(updateGuruRef(dcOrVars, vars));
};

const createSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSiswa', inputVars);
}
createSiswaRef.operationName = 'CreateSiswa';
exports.createSiswaRef = createSiswaRef;

exports.createSiswa = function createSiswa(dcOrVars, vars) {
  return executeMutation(createSiswaRef(dcOrVars, vars));
};

const updateSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSiswa', inputVars);
}
updateSiswaRef.operationName = 'UpdateSiswa';
exports.updateSiswaRef = updateSiswaRef;

exports.updateSiswa = function updateSiswa(dcOrVars, vars) {
  return executeMutation(updateSiswaRef(dcOrVars, vars));
};

const createKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateKelas', inputVars);
}
createKelasRef.operationName = 'CreateKelas';
exports.createKelasRef = createKelasRef;

exports.createKelas = function createKelas(dcOrVars, vars) {
  return executeMutation(createKelasRef(dcOrVars, vars));
};

const updateKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateKelas', inputVars);
}
updateKelasRef.operationName = 'UpdateKelas';
exports.updateKelasRef = updateKelasRef;

exports.updateKelas = function updateKelas(dcOrVars, vars) {
  return executeMutation(updateKelasRef(dcOrVars, vars));
};

const deleteKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteKelas', inputVars);
}
deleteKelasRef.operationName = 'DeleteKelas';
exports.deleteKelasRef = deleteKelasRef;

exports.deleteKelas = function deleteKelas(dcOrVars, vars) {
  return executeMutation(deleteKelasRef(dcOrVars, vars));
};

const createJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJurusan', inputVars);
}
createJurusanRef.operationName = 'CreateJurusan';
exports.createJurusanRef = createJurusanRef;

exports.createJurusan = function createJurusan(dcOrVars, vars) {
  return executeMutation(createJurusanRef(dcOrVars, vars));
};

const deleteJurusanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJurusan', inputVars);
}
deleteJurusanRef.operationName = 'DeleteJurusan';
exports.deleteJurusanRef = deleteJurusanRef;

exports.deleteJurusan = function deleteJurusan(dcOrVars, vars) {
  return executeMutation(deleteJurusanRef(dcOrVars, vars));
};

const createJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJadwal', inputVars);
}
createJadwalRef.operationName = 'CreateJadwal';
exports.createJadwalRef = createJadwalRef;

exports.createJadwal = function createJadwal(dcOrVars, vars) {
  return executeMutation(createJadwalRef(dcOrVars, vars));
};

const deleteJadwalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteJadwal', inputVars);
}
deleteJadwalRef.operationName = 'DeleteJadwal';
exports.deleteJadwalRef = deleteJadwalRef;

exports.deleteJadwal = function deleteJadwal(dcOrVars, vars) {
  return executeMutation(deleteJadwalRef(dcOrVars, vars));
};

const upsertNilaiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNilai', inputVars);
}
upsertNilaiRef.operationName = 'UpsertNilai';
exports.upsertNilaiRef = upsertNilaiRef;

exports.upsertNilai = function upsertNilai(dcOrVars, vars) {
  return executeMutation(upsertNilaiRef(dcOrVars, vars));
};

const recordKehadiranRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordKehadiran', inputVars);
}
recordKehadiranRef.operationName = 'RecordKehadiran';
exports.recordKehadiranRef = recordKehadiranRef;

exports.recordKehadiran = function recordKehadiran(dcOrVars, vars) {
  return executeMutation(recordKehadiranRef(dcOrVars, vars));
};

const createPengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePengumuman', inputVars);
}
createPengumumanRef.operationName = 'CreatePengumuman';
exports.createPengumumanRef = createPengumumanRef;

exports.createPengumuman = function createPengumuman(dcOrVars, vars) {
  return executeMutation(createPengumumanRef(dcOrVars, vars));
};

const deletePengumumanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePengumuman', inputVars);
}
deletePengumumanRef.operationName = 'DeletePengumuman';
exports.deletePengumumanRef = deletePengumumanRef;

exports.deletePengumuman = function deletePengumuman(dcOrVars, vars) {
  return executeMutation(deletePengumumanRef(dcOrVars, vars));
};

const createPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePrestasi', inputVars);
}
createPrestasiRef.operationName = 'CreatePrestasi';
exports.createPrestasiRef = createPrestasiRef;

exports.createPrestasi = function createPrestasi(dcOrVars, vars) {
  return executeMutation(createPrestasiRef(dcOrVars, vars));
};

const deletePrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrestasi', inputVars);
}
deletePrestasiRef.operationName = 'DeletePrestasi';
exports.deletePrestasiRef = deletePrestasiRef;

exports.deletePrestasi = function deletePrestasi(dcOrVars, vars) {
  return executeMutation(deletePrestasiRef(dcOrVars, vars));
};

const createAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAlumni', inputVars);
}
createAlumniRef.operationName = 'CreateAlumni';
exports.createAlumniRef = createAlumniRef;

exports.createAlumni = function createAlumni(dcOrVars, vars) {
  return executeMutation(createAlumniRef(dcOrVars, vars));
};

const updateAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAlumni', inputVars);
}
updateAlumniRef.operationName = 'UpdateAlumni';
exports.updateAlumniRef = updateAlumniRef;

exports.updateAlumni = function updateAlumni(dcOrVars, vars) {
  return executeMutation(updateAlumniRef(dcOrVars, vars));
};

const deleteAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAlumni', inputVars);
}
deleteAlumniRef.operationName = 'DeleteAlumni';
exports.deleteAlumniRef = deleteAlumniRef;

exports.deleteAlumni = function deleteAlumni(dcOrVars, vars) {
  return executeMutation(deleteAlumniRef(dcOrVars, vars));
};

const listPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengguna', inputVars);
}
listPenggunaRef.operationName = 'ListPengguna';
exports.listPenggunaRef = listPenggunaRef;

exports.listPengguna = function listPengguna(dcOrVars, vars) {
  return executeQuery(listPenggunaRef(dcOrVars, vars));
};

const getPenggunaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPengguna', inputVars);
}
getPenggunaRef.operationName = 'GetPengguna';
exports.getPenggunaRef = getPenggunaRef;

exports.getPengguna = function getPengguna(dcOrVars, vars) {
  return executeQuery(getPenggunaRef(dcOrVars, vars));
};

const getPenggunaByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPenggunaByEmail', inputVars);
}
getPenggunaByEmailRef.operationName = 'GetPenggunaByEmail';
exports.getPenggunaByEmailRef = getPenggunaByEmailRef;

exports.getPenggunaByEmail = function getPenggunaByEmail(dcOrVars, vars) {
  return executeQuery(getPenggunaByEmailRef(dcOrVars, vars));
};

const listGuruRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuru');
}
listGuruRef.operationName = 'ListGuru';
exports.listGuruRef = listGuruRef;

exports.listGuru = function listGuru(dc) {
  return executeQuery(listGuruRef(dc));
};

const getGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuru', inputVars);
}
getGuruRef.operationName = 'GetGuru';
exports.getGuruRef = getGuruRef;

exports.getGuru = function getGuru(dcOrVars, vars) {
  return executeQuery(getGuruRef(dcOrVars, vars));
};

const getLastNipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIP');
}
getLastNipRef.operationName = 'GetLastNIP';
exports.getLastNipRef = getLastNipRef;

exports.getLastNip = function getLastNip(dc) {
  return executeQuery(getLastNipRef(dc));
};

const listSemuaSiswaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaSiswa');
}
listSemuaSiswaRef.operationName = 'ListSemuaSiswa';
exports.listSemuaSiswaRef = listSemuaSiswaRef;

exports.listSemuaSiswa = function listSemuaSiswa(dc) {
  return executeQuery(listSemuaSiswaRef(dc));
};

const listSiswaByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSiswaByKelas', inputVars);
}
listSiswaByKelasRef.operationName = 'ListSiswaByKelas';
exports.listSiswaByKelasRef = listSiswaByKelasRef;

exports.listSiswaByKelas = function listSiswaByKelas(dcOrVars, vars) {
  return executeQuery(listSiswaByKelasRef(dcOrVars, vars));
};

const getSiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSiswa', inputVars);
}
getSiswaRef.operationName = 'GetSiswa';
exports.getSiswaRef = getSiswaRef;

exports.getSiswa = function getSiswa(dcOrVars, vars) {
  return executeQuery(getSiswaRef(dcOrVars, vars));
};

const getLastNisRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLastNIS');
}
getLastNisRef.operationName = 'GetLastNIS';
exports.getLastNisRef = getLastNisRef;

exports.getLastNis = function getLastNis(dc) {
  return executeQuery(getLastNisRef(dc));
};

const listSemuaKelasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSemuaKelas');
}
listSemuaKelasRef.operationName = 'ListSemuaKelas';
exports.listSemuaKelasRef = listSemuaKelasRef;

exports.listSemuaKelas = function listSemuaKelas(dc) {
  return executeQuery(listSemuaKelasRef(dc));
};

const listKelasByTingkatRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListKelasByTingkat', inputVars);
}
listKelasByTingkatRef.operationName = 'ListKelasByTingkat';
exports.listKelasByTingkatRef = listKelasByTingkatRef;

exports.listKelasByTingkat = function listKelasByTingkat(dcOrVars, vars) {
  return executeQuery(listKelasByTingkatRef(dcOrVars, vars));
};

const listJurusanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListJurusan');
}
listJurusanRef.operationName = 'ListJurusan';
exports.listJurusanRef = listJurusanRef;

exports.listJurusan = function listJurusan(dc) {
  return executeQuery(listJurusanRef(dc));
};

const getJadwalByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByKelas', inputVars);
}
getJadwalByKelasRef.operationName = 'GetJadwalByKelas';
exports.getJadwalByKelasRef = getJadwalByKelasRef;

exports.getJadwalByKelas = function getJadwalByKelas(dcOrVars, vars) {
  return executeQuery(getJadwalByKelasRef(dcOrVars, vars));
};

const getJadwalByGuruRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJadwalByGuru', inputVars);
}
getJadwalByGuruRef.operationName = 'GetJadwalByGuru';
exports.getJadwalByGuruRef = getJadwalByGuruRef;

exports.getJadwalByGuru = function getJadwalByGuru(dcOrVars, vars) {
  return executeQuery(getJadwalByGuruRef(dcOrVars, vars));
};

const getNilaiBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiBySiswa', inputVars);
}
getNilaiBySiswaRef.operationName = 'GetNilaiBySiswa';
exports.getNilaiBySiswaRef = getNilaiBySiswaRef;

exports.getNilaiBySiswa = function getNilaiBySiswa(dcOrVars, vars) {
  return executeQuery(getNilaiBySiswaRef(dcOrVars, vars));
};

const getNilaiByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNilaiByKelas', inputVars);
}
getNilaiByKelasRef.operationName = 'GetNilaiByKelas';
exports.getNilaiByKelasRef = getNilaiByKelasRef;

exports.getNilaiByKelas = function getNilaiByKelas(dcOrVars, vars) {
  return executeQuery(getNilaiByKelasRef(dcOrVars, vars));
};

const getKehadiranByKelasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranByKelas', inputVars);
}
getKehadiranByKelasRef.operationName = 'GetKehadiranByKelas';
exports.getKehadiranByKelasRef = getKehadiranByKelasRef;

exports.getKehadiranByKelas = function getKehadiranByKelas(dcOrVars, vars) {
  return executeQuery(getKehadiranByKelasRef(dcOrVars, vars));
};

const getKehadiranBySiswaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetKehadiranBySiswa', inputVars);
}
getKehadiranBySiswaRef.operationName = 'GetKehadiranBySiswa';
exports.getKehadiranBySiswaRef = getKehadiranBySiswaRef;

exports.getKehadiranBySiswa = function getKehadiranBySiswa(dcOrVars, vars) {
  return executeQuery(getKehadiranBySiswaRef(dcOrVars, vars));
};

const listPengumumanRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPengumuman');
}
listPengumumanRef.operationName = 'ListPengumuman';
exports.listPengumumanRef = listPengumumanRef;

exports.listPengumuman = function listPengumuman(dc) {
  return executeQuery(listPengumumanRef(dc));
};

const listPrestasiRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPrestasi', inputVars);
}
listPrestasiRef.operationName = 'ListPrestasi';
exports.listPrestasiRef = listPrestasiRef;

exports.listPrestasi = function listPrestasi(dcOrVars, vars) {
  return executeQuery(listPrestasiRef(dcOrVars, vars));
};

const listAlumniRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAlumni', inputVars);
}
listAlumniRef.operationName = 'ListAlumni';
exports.listAlumniRef = listAlumniRef;

exports.listAlumni = function listAlumni(dcOrVars, vars) {
  return executeQuery(listAlumniRef(dcOrVars, vars));
};
