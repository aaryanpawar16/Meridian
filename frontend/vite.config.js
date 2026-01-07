import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all local IPs (0.0.0.0)
    port: 5173,
    open: true, // Automatically open browser on server start
    strictPort: true, // Fail if port 5173 is already in use
    watch: {
      usePolling: true, // Fixes file watch issues on Windows/WSL
    },
    hmr: {
      clientPort: 5173, // Forces browser to connect to this specific port
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
})