import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../contexts/AuthContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ;
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
  masuk dan nilai rapot sebelumnya, diproses oleh tim BK.
- Kelas 11: siswa dibagi ulang berdasarkan rumpun peminatan yang dipilih mulai kelas 10 semester 2.

PROGRAM PEMINATAN (mulai kelas 11):
1. Rumpun A — Kelompok Kesehatan (2 kelas)
   Mata pelajaran: Matematika, Fisika, Kimia, Biologi.
   Diarahkan untuk jalur kedokteran, farmasi, keperawatan, dan ilmu kesehatan lainnya.
   Merupakan rumpun paling diminati sehingga seleksinya ketat.
2. Rumpun B — Kelompok Teknik (1 kelas)
   Mata pelajaran: Fisika, Matematika Tingkat Lanjut, Biologi, Kimia.
   Diarahkan untuk jalur teknik (informatika, sipil, mesin, industri, arsitektur).
3. Rumpun C — Kelompok Sosial & Humaniora (2 kelas)
   Mata pelajaran: Ekonomi, Sosiologi, Geografi, Sejarah.
   Diarahkan untuk jalur hukum, bisnis, hubungan internasional, komunikasi, dan dakwah.
Jika siswa memilih rumpun A namun tidak lolos, akan ditawarkan pindah ke rumpun B atau C.

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

SISTEM AKADEMIK ONLINE:
- Input nilai dilakukan oleh guru mata pelajaran langsung ke sistem.
  Wali kelas memantau dan memverifikasi nilai siswa di kelasnya tanpa setoran file manual.
- Rapot online dapat diakses siswa setiap semester, menampilkan tren naik/turun nilai
  serta peta persaingan dengan siswa lain yang menargetkan jurusan kampus yang sama.
- Rapot online baru dapat dibuka jika administrasi sekolah sudah lunas.
- Pengambilan rapot fisik tetap dilakukan tatap muka antara orang tua dan wali kelas.
- Sistem juga mencatat prestasi siswa (akademik, olahraga, keagamaan),
  pelanggaran, frekuensi kunjungan ke BK, serta keanggotaan ekstrakurikuler.
- Penjadwalan pelajaran menggunakan sistem penjadwalan otomatis agar tidak bentrok
  antar guru maupun antar kelas.

DATA ALUMNI:
Track record alumni mulai dirapikan sejak tahun 2023. Data lulusan lama masih dalam
proses digitalisasi dari arsip Excel ke sistem.

AKSES PENGGUNA:
Akun portal akademik hanya tersedia untuk siswa, guru, dan admin.
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
Fitur: Login multi-role (Admin/Guru/Siswa), Import massal via Excel, Export PDF/Excel,
Chatbot AI, Penjurusan Kurikulum Merdeka (Rumpun A/B/C), Pencatatan Nilai, Prestasi,
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
    // Sapaan awal berbasis nama pengguna (bukan Akhi/Ukhti).
    const displayName = user?.name?.trim() || '';
    const greetings: Record<string, string> = {
      admin: `Halo${displayName ? `, ${displayName}` : ''}. Saya SCOLA AI, asisten SMAIT Nur Hidayah. Ada yang bisa saya bantu — misalnya kelola data siswa, guru, jadwal, atau info sekolah?`,
      guru: `Halo${displayName ? `, ${displayName}` : ''}. Saya SCOLA AI. Saya bisa bantu urusan input nilai, penjadwalan, atau informasi kelas. Ada yang ingin ditanyakan?`,
      siswa: `Halo${displayName ? `, ${displayName}` : ''}. Saya SCOLA AI. Silakan tanyakan soal jadwal, nilai, rumpun peminatan, atau info SMAIT Nur Hidayah.`,
      public: `Halo${displayName ? `, ${displayName}` : ''}. Saya SCOLA AI dan bisa menjelaskan tentang SMAIT Nur Hidayah Sukoharjo, sistem pembagian kelas, rumpun peminatan, dan cara kerja portal akademik.`,
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
      admin: 'Pengguna saat ini adalah ADMINISTRATOR sekolah. Bantu menjawab tentang manajemen data akademik, penggunaan fitur SCOLA, dan kebijakan sekolah.',
      guru: `Pengguna adalah GURU${user?.specialization ? ` mata pelajaran ${user.specialization}` : ''}${user?.jabatan && user.jabatan !== 'Guru' ? ` dengan jabatan ${user.jabatan}` : ''}. Bantu dengan pertanyaan input nilai, absensi, dan administrasi kelas.`,
      siswa: `Pengguna adalah SISWA${user?.className ? ` kelas ${user.className}` : ''}. Bantu dengan info pelajaran, jadwal, nilai, dan info sekolah.`,
      public: 'Pengguna adalah PENGUNJUNG/CALON SISWA. Bantu dengan info sistem pembagian kelas, rumpun peminatan A/B/C, fasilitas, dan cara kerja portal akademik SMAIT Nur Hidayah Sukoharjo.',
    };

    return `Kamu adalah SCOLA AI, asisten virtual SMAIT Nur Hidayah Sukoharjo. Jawab dalam Bahasa Indonesia yang hangat, profesional, dan ringkas.

GAYA BAHASA:
- Sapa pengguna dengan nama yang sudah diberikan di bawah. Jangan gunakan panggilan "Akhi", "Ukhti", "Ustadz", atau "Ustadzah".
- Jika nama pengguna tidak diketahui, sapa secara netral tanpa kata ganti spesifik.
${user?.name ? `- Nama pengguna saat ini: ${user.name}.` : '- Nama pengguna belum diketahui.'}

${roleContext[context] || roleContext.public}

${SCHOOL_KNOWLEDGE}

PANDUAN JAWABAN:
- Gunakan bahasa Indonesia yang mudah dipahami.
- Jika pertanyaan tentang sekolah, gunakan data di atas sebagai sumber utama.
- Untuk pertanyaan yang tidak ada datanya, katakan dengan jujur bahwa kamu tidak punya info tersebut dan sarankan hubungi TU sekolah.
- Jangan mengarang data siswa/guru/nilai spesifik — arahkan ke menu yang tepat di aplikasi.
- Format jawaban rapi dengan bullet points jika berisi daftar.
- Jangan terlalu panjang, maksimal 4-5 kalimat kecuali diminta detail.
- Boleh menyisipkan kutipan Al-Qur'an/Hadits singkat hanya jika pengguna secara eksplisit meminta motivasi atau bertanya hal keislaman.`;
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
            ...newMessages.filter(m => m.role !== 'system').slice(-10), // last 10 for context
          ],
          temperature: 0.7,
          max_tokens: 800,
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
      console.error('Groq error:', e);
      setError(e.message || 'Terjadi kesalahan saat menghubungi AI.');
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Maaf, saya sedang mengalami gangguan. Silakan coba lagi sebentar.' }]);
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
    'Cara lihat rapot online?',
    'Bagaimana memilih rumpun A/B/C?',
    'Cara cek persaingan jurusan kampus',
  ] : context === 'guru' ? [
    'Cara input nilai harian?',
    'Bagaimana catat prestasi siswa?',
    'Cara catat poin BK siswa?',
  ] : [
    'Import siswa via Excel?',
    'Export akun ke PDF?',
    'Seed data demo',
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
          Powered by Groq AI (Llama 3.3) • SMAIT Nur Hidayah Sukoharjo
        </p>
      </div>
    </div>
  );
}
