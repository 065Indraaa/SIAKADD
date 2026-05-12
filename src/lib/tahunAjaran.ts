/**
 * Utility terpusat untuk tahun ajaran & semester.
 * - Tahun ajaran SMA di Indonesia: Juli tahun N – Juni tahun N+1.
 * - Semester Ganjil: Juli–Desember. Semester Genap: Januari–Juni.
 *
 * Dengan ini seluruh halaman bisa memakai tahun ajaran yang otomatis
 * update tiap kali kalender berganti, tanpa hardcode `2024/2025`.
 */

export type Semester = 'Ganjil' | 'Genap';

/** Mengembalikan tahun ajaran saat ini dalam format "YYYY/YYYY". */
export function currentTahunAjaran(now: Date = new Date()): string {
  const y = now.getFullYear();
  // Bulan 0-indexed. Juli = 6. Sebelum Juli → tahun ajaran sebelumnya.
  return now.getMonth() >= 6 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}

/** Mengembalikan semester saat ini berdasarkan bulan. */
export function currentSemester(now: Date = new Date()): Semester {
  return now.getMonth() >= 6 ? 'Ganjil' : 'Genap';
}

/**
 * Membangun daftar pilihan tahun ajaran untuk dropdown.
 * Default: 2 tahun ke belakang, tahun berjalan, 1 tahun ke depan.
 */
export function buildTahunAjaranOptions(
  now: Date = new Date(),
  opts: { past?: number; future?: number } = {},
): string[] {
  const past = opts.past ?? 2;
  const future = opts.future ?? 1;
  const currentY = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  const list: string[] = [];
  for (let i = past; i >= 1; i--) {
    const y = currentY - i;
    list.push(`${y}/${y + 1}`);
  }
  list.push(`${currentY}/${currentY + 1}`);
  for (let i = 1; i <= future; i++) {
    const y = currentY + i;
    list.push(`${y}/${y + 1}`);
  }
  return list;
}

/** Tahun lulus hipotetis untuk kelas 12 di tahun ajaran aktif. */
export function currentGraduationYear(now: Date = new Date()): number {
  // Kelas 12 lulus di akhir semester genap (Juni tahun kedua).
  return now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear();
}

/** Opsi tahun lulus untuk filter alumni: 5 tahun ke belakang + tahun aktif. */
export function buildTahunLulusOptions(
  now: Date = new Date(),
  opts: { past?: number } = {},
): number[] {
  const past = opts.past ?? 5;
  const curr = currentGraduationYear(now);
  const list: number[] = [];
  for (let i = past; i >= 0; i--) list.push(curr - i);
  return list;
}

/** Parse tahun ajaran "2024/2025" → [2024, 2025]. */
export function parseTahunAjaran(ta: string): [number, number] | null {
  const m = /^(\d{4})\/(\d{4})$/.exec(ta.trim());
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10)];
}
