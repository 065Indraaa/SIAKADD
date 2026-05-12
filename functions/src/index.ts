/**
 * SCOLA — Firebase Cloud Functions v5
 * Project: uassiakad (SMAIT Nur Hidayah Sukoharjo)
 *
 * Fungsi:
 * 1. autoGraduateSiswa  — Cron job setiap 30 Juni jam 01:00 WIB.
 * 2. manualGraduateSiswa — HTTP endpoint untuk dipanggil admin dari dashboard.
 */

import * as functions from 'firebase-functions/v2';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { logger } from 'firebase-functions/v2';

initializeApp();

const REGION = 'asia-southeast2';
const PROJECT_ID = 'uassiakad';
const LOCATION = 'asia-southeast2';
const SERVICE_ID = 'uassiakad-service';
const CONNECTOR_ID = 'uassiakad-connector';

const DC_BASE_URL =
  `https://firebasedataconnect.googleapis.com/v1beta/projects/${PROJECT_ID}` +
  `/locations/${LOCATION}/services/${SERVICE_ID}/connectors/${CONNECTOR_ID}`;

async function callDataConnect(
  operationName: string,
  variables: Record<string, unknown>,
  type: 'query' | 'mutation' = 'query',
): Promise<{ data: Record<string, unknown>; errors?: unknown[] }> {
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const endpoint = type === 'query'
    ? `${DC_BASE_URL}:executeQuery`
    : `${DC_BASE_URL}:executeMutation`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({ name: operationName, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Data Connect error ${res.status}: ${text}`);
  }

  return res.json() as Promise<{ data: Record<string, unknown>; errors?: unknown[] }>;
}

function currentTahunAjaran(now: Date = new Date()): string {
  const y = now.getFullYear();
  return now.getMonth() >= 6 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}

function currentGraduationYear(now: Date = new Date()): number {
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear();
}

async function processGraduation(now: Date = new Date()): Promise<{
  processed: number;
  skipped: number;
  errors: string[];
}> {
  const tahunAjaran = currentTahunAjaran(now);
  const tahunLulus = currentGraduationYear(now);

  logger.info(`[graduation] Memulai T.A. ${tahunAjaran}, tahun lulus ${tahunLulus}`);

  const siswaRes = await callDataConnect('ListSemuaSiswa', {}, 'query');
  const allSiswa = (siswaRes.data as any).siswas as Array<{
    id: string;
    nis: string;
    pengguna: { nama: string; email: string };
    kelas: { id: string; nama: string; tingkat: number; tahunAjaran: string } | null;
    peminatan: { nama: string } | null;
  }>;

  const kelas12 = allSiswa.filter(
    (s) => s.kelas?.tingkat === 12 && s.kelas?.tahunAjaran === tahunAjaran,
  );

  logger.info(`[graduation] ${kelas12.length} siswa kelas 12 ditemukan`);

  const alumniRes = await callDataConnect('ListAlumni', {}, 'query');
  const existingNis = new Set(
    ((alumniRes.data as any).alumnis as Array<{ nis: string }>).map((a) => a.nis),
  );

  let processed = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const siswa of kelas12) {
    if (existingNis.has(siswa.nis)) {
      skipped++;
      continue;
    }
    try {
      await callDataConnect('CreateAlumni', {
        nis: siswa.nis,
        nama: siswa.pengguna.nama,
        tahunLulus,
        status: 'Lainnya',
        institusi: null,
        jabatanAtauJurusan: siswa.peminatan?.nama ?? null,
        email: siswa.pengguna.email ?? null,
        telepon: null,
        alamat: null,
        prestasi: null,
      }, 'mutation');
      processed++;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${siswa.nis}: ${msg}`);
    }
  }

  logger.info(`[graduation] Selesai — ${processed} diproses, ${skipped} dilewati, ${errors.length} error`);
  return { processed, skipped, errors };
}

// ─── Scheduled: 30 Juni 01:00 WIB (18:00 UTC) ────────────
export const autoGraduateSiswa = onSchedule(
  {
    schedule: '0 18 30 6 *',
    timeZone: 'UTC',
    region: REGION,
    memory: '256MiB',
    timeoutSeconds: 300,
  },
  async () => {
    logger.info('[autoGraduateSiswa] Cron dipicu');
    await processGraduation(new Date());
  },
);

// ─── HTTP: dipanggil manual dari dashboard admin ──────────
export const manualGraduateSiswa = onRequest(
  {
    region: REGION,
    memory: '256MiB',
    timeoutSeconds: 300,
    cors: true,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
    const adminKey = process.env.GRADUATION_ADMIN_KEY;
    if (adminKey && req.body?.adminKey !== adminKey) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }
    try {
      const result = await processGraduation(new Date());
      res.status(200).json({ success: true, ...result });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      res.status(500).json({ success: false, error: msg });
    }
  },
);

// Suppress unused import warning
void functions;
