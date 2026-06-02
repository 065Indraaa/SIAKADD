import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../contexts/AuthContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SCHOOL_KNOWLEDGE = `
INFORMASI SEKOLAH RESMI:
Nama: SMAIT Nur Hidayah (Sekolah Menengah Atas Islam Terpadu Nur Hidayah)
Alamat: Jl. Pandawa No.10, Dusun III, Kel. Pucangan, Kec. Kartasura, Kab. Sukoharjo, Provinsi Jawa Tengah 57168
Berdiri sejak: tahun 2005
Yayasan: Yayasan Nur Hidayah Surakarta
Jaringan: Anggota Jaringan Sekolah Islam Terpadu (JSIT) Indonesia
Akreditasi: A (Unggul)
Kurikulum: Kurikulum Merdeka terpadu dengan kurikulum keislaman khas JSIT
Motto: Membentuk Generasi Rabbani yang Berprestasi

SISTEM KELAS:
- Kelas 10: sepuluh kelas (X-1 s/d X-10) campur tanpa pemisahan gender.
  Setiap kelas berisi sekitar 30 siswa. Penempatan kelas berdasarkan gabungan nilai tes
  masuk dan nilai rapor sebelumnya, diproses oleh tim BK.
- Kelas 11: siswa dibagi ulang berdasarkan rumpun peminatan yang dipilih mulai kelas 10 semester 2.

PROGRAM PEMINATAN (mulai kelas 11):
KRITERIA PENJURUSAN:
- Kriteria diambil dari RATA-RATA NILAI KELAS 10 (semester Ganjil & Genap), bukan per mata pelajaran.
- Rumpun A — Kelompok Kesehatan (kuota ~60 siswa)
  Syarat: rata-rata nilai kelas 10 minimal 87.
  Mata pelajaran: Matematika, Fisika, Kimia, Biologi.
  Diarahkan untuk jalur kedokteran, farmasi, keperawatan, dan ilmu kesehatan lainnya.
- Rumpun B — Kelompok Teknik (kuota ~30 siswa)
  Syarat: siswa bebas memilih tanpa batasan nilai minimal.
  Mata pelajaran: Fisika, Matematika Tingkat Lanjut, Biologi, Kimia.
  Diarahkan untuk jalur teknik (informatika, sipil, mesin, industri, arsitektur).
- Rumpun C — Kelompok Sosial & Humaniora (kuota ~60 siswa)
  Syarat: siswa bebas memilih tanpa batasan nilai minimal.
  Mata pelajaran: Ekonomi, Sosiologi, Geografi, Sejarah.
  Diarahkan untuk jalur hukum, bisnis, hubungan internasional, komunikasi, dan dakwah.
KEBIJAKAN KUOTA:
- Jika kuota Teknik (B) penuh, siswa dengan nilai terendah di Teknik dipindahkan ke Sosial (C).
- Jika kuota Sosial (C) penuh, siswa dengan nilai terendah di Sosial dipindahkan ke Teknik (B).
- Siswa yang tidak memenuhi syarat A (rata-rata < 87) hanya bisa masuk B atau C.

DATA ALUMNI & TRACK RECORD:
- Alumni SMAIT Nur Hidayah banyak diterima di: UGM, UNS, UI, UNDIP, ITB, ITS, UIN, LIPIA,
  dan universitas di Timur Tengah (UniSz, UIM, dll).
- Jalur alumni: Kedokteran (FK UGM, FK UNS), Farmasi, Teknik (ITS, ITB), Hukum (UI, UGM),
  Psikologi, Manajemen, dan dakwah.
- Data alumni lengkap bisa dilihat di menu Alumni oleh admin, dan Jejak Alumni oleh siswa.

REKOMENDASI JURUSAN KAMPUS & KARIR:
- Rumpun A → Kedokteran (FK UGM/UNS/UI), Farmasi, Keperawatan, Gizi, Kesehatan Masyarakat,
  Bioteknologi, atau profesi dokter/spesialis.
- Rumpun B → Teknik Informatika (ITS, ITB), Teknik Sipil, Arsitektur, Teknik Industri,
  Teknik Mesin, Data Science, Aviasi, atau jadi programmer/startup founder.
- Rumpun C → Hukum (UI, UGM), Ilmu Pemerintahan, Manajemen, Akuntansi, Psikologi,
  Hubungan Internasional, Komunikasi, atau jadi pengacara, konsultan, diplomat, content creator.

FASILITAS:
- Masjid sekolah sebagai pusat ibadah dan halaqah
- Laboratorium IPA (Fisika, Kimia, Biologi)
- Laboratorium Komputer
- Perpustakaan Islami
- Lapangan olahraga (basket, futsal, voli, panahan)

KEBIJAKAN PERANGKAT:
Siswa TIDAK diperbolehkan membawa ponsel atau laptop ke sekolah.
Portal akademik diakses menggunakan tablet resmi yang diizinkan di sekolah,
atau dari perangkat pribadi di luar jam sekolah.

SISTEM AKADEMIK DARING:
- Pengisian nilai dilakukan oleh guru mata pelajaran langsung ke sistem.
  Wali kelas memantau dan memverifikasi nilai siswa di kelasnya tanpa setoran file manual.
- Rapor daring dapat diakses siswa setiap semester, menampilkan perkembangan nilai
  serta rekap semester.
- Rapor daring baru dapat dibuka jika administrasi sekolah sudah lunas.
- Pengambilan rapor fisik tetap dilakukan tatap muka antara orang tua dan wali kelas.
- Sistem juga mencatat prestasi siswa (akademik, olahraga, keagamaan),
  pelanggaran, frekuensi kunjungan ke BK, serta keanggotaan ekstrakurikuler.
- Penjadwalan pelajaran menggunakan sistem penjadwalan otomatis agar tidak bentrok
  antar guru maupun antar kelas.

AKSES PENGGUNA:
Akun portal akademik hanya tersedia untuk siswa, guru, dan administrator.
Belum tersedia akun khusus orang tua. Komunikasi sekolah dengan orang tua
masih dilakukan melalui wali kelas secara langsung, telepon, WhatsApp,
atau kunjungan ke rumah bila diperlukan.

EKSTRAKURIKULER UNGGULAN:
Tahfidz Al-Qur'an, Kajian Islam, Jurnalistik, Panahan (Olahraga Sunnah),
Pramuka SIT, Olimpiade Sains Klub, English & Arabic Club, Basket, Futsal, Desain Grafis.

PRESTASI:
- Juara KSN Matematika tingkat Nasional (2024)
- Juara 1 Lomba Tahfidz Al-Qur'an Jawa Tengah (2024)
- Juara 1 MTQ Pelajar Karesidenan Surakarta
- Medali Perunggu KSN Biologi Nasional (2023)
- Juara Robotik JSIT Nasional
- Banyak alumni diterima di UGM, UNS, UI, UNDIP, ITB, ITS, dan LIPIA/universitas Timur Tengah

KARAKTER LULUSAN (10 Muwashofat JSIT):
Salimul Aqidah, Shahihul Ibadah, Matinul Khuluq, Qowiyyul Jismi, Mutsaqqoful Fikri,
Mujahidun Linafsihi, Harishun 'ala Waqtihi, Munazzhamun fi Syu'unihi, Qodirun 'alal Kasbi, Nafi'un Lighairihi.

TENTANG APLIKASI SCOLA:
SCOLA adalah Sistem Informasi Akademik berbasis cloud untuk SMAIT Nur Hidayah.
Fitur: akses masuk berbagai peran (Administrator/Guru/Siswa), impor massal melalui Excel, ekspor PDF/Excel,
asisten virtual, Penjurusan Kurikulum Merdeka (Rumpun A/B/C), Pencatatan Nilai, Prestasi,
Pelanggaran & BK, Ekstrakurikuler, dan Data Alumni.
`;

export default function Chatbot({ context }: { context: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const displayName = user?.name?.trim() || '';
    const firstName = displayName.split(' ')[0];
    const greetings: Record<string, string> = {
      admin: displayName
        ? `Halo, ${firstName}. Saya Asisten SCOLA. Mau ngecek data, butuh panduan fitur, atau ada yang perlu diurus? Langsung aja tanya.`
        : `Halo. Saya Asisten SCOLA. Mau ngecek data, butuh panduan fitur, atau ada yang perlu diurus? Langsung aja tanya.`,
      guru: displayName
        ? `Halo, ${firstName}. Saya Asisten SCOLA. Mau tanya soal input nilai, jadwal, atau butuh bantuan administrasi kelas? Saya siap bantu.`
        : `Halo. Saya Asisten SCOLA. Mau tanya soal input nilai, jadwal, atau butuh bantuan administrasi kelas? Saya siap bantu.`,
      siswa: displayName
        ? `Halo, ${firstName}! Saya Asisten SCOLA, teman ngobrol virtualmu di sini. Mau tanya jadwal, nilai, rekomendasi kampus, butuh semangat, atau curhat soal sekolah? Gaskeun tanya aja.`
        : `Halo! Saya Asisten SCOLA, teman ngobrol virtualmu di sini. Mau tanya jadwal, nilai, rekomendasi kampus, butuh semangat, atau curhat soal sekolah? Gaskeun tanya aja.`,
      public: displayName
        ? `Halo, ${firstName}. Saya Asisten SCOLA. Bisa jelasin soal SMAIT Nur Hidayah, rumpun kelas, fasilitas, atau cara pakai portal akademik. Tanya aja.`
        : `Halo. Saya Asisten SCOLA. Bisa jelasin soal SMAIT Nur Hidayah, rumpun kelas, fasilitas, atau cara pakai portal akademik. Tanya aja.`,
    };
    setMessages([{ role: 'assistant', content: greetings[context] || greetings.public }]);
  }, [context, user?.name]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getSystemPrompt = (): string => {
    const roleContext: Record<string, string> = {
      admin: `Pengguna saat ini adalah ADMINISTRATOR sekolah.
TUGAS: bantu kelola data akademik, troubleshooting fitur SCOLA, dan kebijakan sekolah.
GAYA: to the point, efisien, solusi-oriented. Berikan langkah-langkah konkret jika diminta panduan teknis.`,
      guru: `Pengguna adalah GURU${user?.specialization ? ` mata pelajaran ${user.specialization}` : ''}${user?.jabatan && user.jabatan !== 'Guru' ? ` dengan jabatan ${user.jabatan}` : ''}.
TUGAS: bantu soal pengisian nilai, jadwal mengajar, kehadiran, prestasi siswa, dan tips mengajar.
GAYA: profesional tapi santai, menghargai waktu guru, berikan tips praktis.`,
      siswa: (() => {
        const rumpun = user?.peminatanName || user?.jurusanName || '';
        const rumpunLine = rumpun
          ? `RUMPUN PEMINATAN SISWA INI: ${rumpun}. Selalu kaitkan rekomendasi kampus/jurusan/karier dengan rumpun ini.`
          : `RUMPUN PEMINATAN SISWA INI: BELUM DIPILIH/BELUM DIVERIFIKASI. Jika siswa menanyakan kampus/jurusan, ingatkan dengan ramah untuk memilih rumpun dulu di menu "Rumpun Peminatan".`;
        return `Pengguna adalah SISWA${user?.className ? ` kelas ${user.className}` : ''}.
${rumpunLine}
TUGAS: jadi teman ngobrol yang asik — bisa bantu jadwal, nilai, rumpun peminatan, rekomendasi universitas/jurusan, tips belajar, motivasi, hingga curhat ringan soal sekolah.
GAYA: hangat seperti teman, santai, bisa bercanda ringan (tetap sopan), gunakan bahasa anak muda Indonesia yang natural. Jangan kaku seperti robot. Boleh pakai emoji di jawaban.
KETIKA ditanya soal kampus/jurusan: berikan rekomendasi realistis berdasarkan rumpun peminatan siswa ini dan prestasi sekolah.
PENTING — KESESUAIAN RUMPUN: Jika cita-cita / jurusan / karier yang ditanyakan siswa TIDAK SESUAI dengan rumpunnya (contoh: siswa Rumpun C — Sosial ingin jadi dokter yang jalurnya Rumpun A — Kesehatan, atau siswa Rumpun A ingin masuk Teknik Informatika yang jalur Rumpun B), JANGAN diamkan. Sampaikan dengan jujur tapi suportif bahwa pilihan itu kurang sejalan dengan rumpunnya saat ini, jelaskan rumpun mana yang sebenarnya cocok untuk cita-cita tersebut, lalu beri opsi realistis: tetap di rumpun sekarang dengan jalur alternatif yang relevan, atau pertimbangkan pindah rumpun lewat BK/kurikulum (jika syarat & kuota memungkinkan). Tetap memotivasi, jangan mematahkan semangat.
KETIKA diminta semangat/motivasi: berikan semangat yang genuine, boleh kutipan islami ringan atau quotes motivasi pelajar.
KETIKA ditanya alumni: arahkan ke menu Jejak Alumni (siswa) atau Data Alumni (admin).`;
      })(),
      public: `Pengguna adalah PENGUNJUNG/CALON SISWA.
TUGAS: jelaskan info sekolah, rumpun peminatan, fasilitas, PPDB, dan cara kerja portal akademik.
GAYA: ramah, informatif, dan meyakinkan.`,
    };

    return `Kamu adalah Asisten SCOLA, asisten virtual SMAIT Nur Hidayah Sukoharjo. Jawab dalam Bahasa Indonesia.

GAYA BAHASA:
- Sapa pengguna dengan nama jika tersedia. Jangan pakai panggilan formal seperti "Akhi", "Ukhti", "Ustadz", atau "Ustadzah".
- Untuk SISWA: bicara seperti teman sebaya yang pinter dan supportif. Boleh pakai slang ringan (gaskeun, mantap, wkwk, dll) asal tetap sopan dan tidak berlebihan.
- Untuk ADMIN & GURU: tetap profesional tapi tidak kaku.
- Nama pengguna: ${user?.name || 'belum diketahui'}.

${roleContext[context] || roleContext.public}

${SCHOOL_KNOWLEDGE}

PANDUAN JAWABAN:
- Jika pertanyaan tentang sekolah, gunakan data di atas sebagai sumber utama.
- Jika tidak ada datanya, jujur bilang tidak tahu dan sarankan hubungi TU sekolah.
- Jangan mengarang data siswa/guru/nilai spesifik — arahkan ke menu aplikasi yang tepat.
- Format rapi dengan bullet points jika berisi daftar.
- Maksimal 5-7 kalimat kecuali diminta detail panjang.
- Boleh kasih emoji sesekali untuk siswa agar terasa hidup.
- Boleh berikan tips belajar, time management, atau persiapan SNBT/UM jika diminta.`;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: getSystemPrompt() },
            ...newMessages.filter(m => m.role !== 'system').slice(-10),
          ],
          temperature: 0.75,
          max_tokens: 900,
          top_p: 1,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa menjawab saat ini.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e: any) {
      console.error('Kesalahan Groq:', e);
      setError(e.message || 'Terjadi kesalahan saat menghubungi asisten.');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi beberapa saat lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = context === 'public' ? [
    'Apa saja rumpun peminatannya?',
    'Bagaimana pembagian kelas 10?',
    'Apakah boleh bawa HP ke sekolah?',
    'Bagaimana cara melihat nilai?',
  ] : context === 'siswa' ? [
    'Rekomendasi kampus buat rumpun A?',
    'Tips belajar efektif dong',
    'Alumni SMAITNH biasa lanjut ke mana?',
    'Semangat buat ujian besok',
    'Gimana sih pilih rumpun yang bener?',
  ] : context === 'guru' ? [
    'Cara mengisi nilai harian?',
    'Bagaimana catat prestasi siswa?',
    'Tips mengajar biar siswa paham',
  ] : [
    'Impor siswa melalui Excel?',
    'Ekspor akun ke PDF?',
    'Buat data demo',
  ];

  return (
    <div className="flex flex-col h-full bg-card overflow-hidden">
      {/* Area pesan — scroll native */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
        style={{ scrollBehavior: 'smooth' }}
      >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm border border-border'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-start">
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Pertanyaan Populer
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="text-xs px-3 py-1.5 rounded-lg bg-muted hover:bg-accent border border-border text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 border-t border-border bg-background">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pertanyaan..."
            className="flex-1 rounded-xl h-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <Button type="submit" size="icon"
            className="rounded-xl h-10 w-10 bg-blue-600 hover:bg-blue-500 shrink-0 text-white"
            disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
          Asisten otomatis. Jawaban dapat meleset; untuk info akurat hubungi TU sekolah.
        </p>
      </div>
    </div>
  );
}
