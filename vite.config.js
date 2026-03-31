import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // 🔥 IMPORTANT (true se better)
    allowedHosts: 'all',

    hmr: {
      clientPort: 3000, // 🔥 important for tunnel
    },

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})