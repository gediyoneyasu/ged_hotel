import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Explicit root so asset URLs are always correct on Vercel (deploy from repo root or subfolder)
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        // 127.0.0.1 avoids Windows localhost → IPv6 (::1) proxy misses
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})
