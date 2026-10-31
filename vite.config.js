import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: 'index.html',
        'interactive-portrait': 'interactive-portrait.html',
      },
    },
  },
  server: {
    host: '0.0.0.0', // Allows access from other devices
    port: 5173,
  }
})
