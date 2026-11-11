import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Root base path for clean hosting on Vercel
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'scroll-vendor': ['lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    open: false,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
