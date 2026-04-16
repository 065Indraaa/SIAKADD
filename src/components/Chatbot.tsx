import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot({ context }: { context: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya asisten SIAKAD. Ada yang bisa saya bantu?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getSystemInstruction = () => {
    const baseInstruction = "Anda adalah asisten virtual untuk Sistem Informasi Akademik (SIAKAD) SMA. Jawab pertanyaan dengan sopan, ringkas, dan jelas dalam bahasa Indonesia. Jika pertanyaan di luar konteks SIAKAD atau sekolah, jawab: 'Maaf, saya hanya dapat membantu pertanyaan seputar SIAKAD dan informasi sekolah. Silakan hubungi admin untuk bantuan lebih lanjut.'";
    
    if (context === 'admin') {
      return `${baseInstruction} Anda sedang berbicara dengan Admin. Anda dapat membantu menjelaskan cara approve akun, membagi kelas, atau mengelola data alumni.`;
    } else if (context === 'guru') {
      return `${baseInstruction} Anda sedang berbicara dengan Guru. Anda dapat membantu menjelaskan cara input nilai, mencatat prestasi, atau melihat data siswa.`;
    } else if (context === 'siswa') {
      return `${baseInstruction} Anda sedang berbicara dengan Siswa. Anda dapat membantu menjelaskan cara melihat nilai, jadwal, atau informasi penjurusan.`;
    }
    return `${baseInstruction} Anda sedang berbicara dengan pengunjung publik. Anda dapat memberikan informasi pendaftaran, kalender akademik, atau kontak sekolah.`;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API Key not found");
      }

      // Convert previous messages to the format expected by Gemini (if using chat session)
      // For simplicity, we'll just send the current prompt with system instructions
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: getSystemInstruction(),
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Maaf, saya tidak mengerti.' }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan atau API Key belum dikonfigurasi. Silakan coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-none px-4 py-2 text-sm shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-3 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 rounded-full bg-slate-100 border-transparent focus-visible:ring-blue-500"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
