import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    vanillaExtractPlugin(), 
    mkcert(),
  ],
  build: {
    target: 'es2017',
  },
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
});
