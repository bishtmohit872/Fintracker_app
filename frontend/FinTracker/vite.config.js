import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  build:{
    chunkSizeWarningLimit:2000
  },
  plugins: [
    react(),
  ],
  server: {
    host: true,
  },
})
