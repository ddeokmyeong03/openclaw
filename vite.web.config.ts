import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone web build (no Electron) — used for GitHub Pages deployment
export default defineConfig({
  root: 'src',
  base: '/openclaw/',
  build: {
    outDir: '../web-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve('src/index.html')
    }
  },
  resolve: {
    alias: {
      '@renderer': resolve('src')
    }
  },
  plugins: [react()]
})
