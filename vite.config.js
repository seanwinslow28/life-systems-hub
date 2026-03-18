import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  cacheDir: '/tmp/vite-cache-lsh',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: false,
  },
})
