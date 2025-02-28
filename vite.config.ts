import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Force Vite to use a specific port
    port: 5173,
    // Open browser automatically
    open: true,
    // Log level
    logLevel: 'info',
  },
});