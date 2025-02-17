import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    exclude: ['electron']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron', 'path', 'fs', 'os', 'child_process'],
    }
  }
})