import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true, // Fail if 5173 is taken
    open: true,      // Don't auto-open browser
    allowedHosts: ['.ngrok-free.app']
  },
})
