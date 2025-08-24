import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {port: 5173, compress: true},
  build: {

    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'carousel': ['react-responsive-carousel'],
          'ui-libs': ['lucide-react'] 
        }
      }
    },
    
    
    chunkSizeWarningLimit: 500
  },
  
})
