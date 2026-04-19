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
    const baseInstruction = "Anda adalah asisten virtual untuk Sistem Informasi Akademik (SIAKAD) SMA. Jawab pertanyaan dengan sopan, ringkas, dan jelas dalam bahasa Indonesia.";
    
    if (context === 'admin') return `${baseInstruction} Anda sedang berbicara dengan Admin. Anda dapat membantu menjelaskan cara approve akun, membagi kelas, atau mengelola data alumni.`;
    if (context === 'guru') return `${baseInstruction} Anda sedang berbicara dengan Guru. Anda dapat membantu menjelaskan cara input nilai, mencatat prestasi, atau melihat data siswa.`;
    if (context === 'siswa') return `${baseInstruction} Anda sedang berbicara dengan Siswa. Anda dapat membantu menjelaskan cara melihat nilai, jadwal, atau informasi penjurusan.`;
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
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-x border-b border-white/5">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-900/20'
                    : 'bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 bg-slate-900 border-t border-white/10">
        <form onSubmit={handleSend} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya sesuatu..."
            className="flex-1 rounded-full bg-slate-950 border-white/10 text-white focus-visible:ring-blue-500 placeholder:text-slate-500"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full bg-blue-600 hover:bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}