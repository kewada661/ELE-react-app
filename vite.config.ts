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
      '^/auth/.*': {
        target: 'http://localhost:5000'
      },
      '^/db/.*': {
        target: 'http://localhost:5000'
      },
      '^/audiomack/.*': {
        target:'http://localhost:5000'
      },
    },
  },
});
