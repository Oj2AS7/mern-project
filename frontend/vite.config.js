import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // suppress warning up to 1 MB
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-project-l3h4.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
