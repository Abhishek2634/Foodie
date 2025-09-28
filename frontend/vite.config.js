import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps:{
    exclude:["lucide-react"],
  },
  build:{
    sourcemap:false,
  },
  esbuild:{
    sourcemap:false,
  }
});
