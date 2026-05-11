import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Tingkatkan batas peringatan ukuran chunk untuk Vercel
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Pisahkan vendor besar agar loading lebih cepat
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/data-connect'],
          'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
          'vendor-xlsx': ['xlsx', 'file-saver', 'jspdf', 'jspdf-autotable'],
        },
      },
    },
  },
});
