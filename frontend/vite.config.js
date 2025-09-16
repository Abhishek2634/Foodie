import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html in dist folder
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  
  // Performance optimizations
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          // React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI libraries
          'ui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          // Utility libraries
          'utils-vendor': ['axios', 'react-hot-toast', 'gsap'],
          // Icons and assets
          'icons-vendor': ['react-icons', 'lucide-react'],
        },
      },
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable sourcemaps in development
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Minification options
    minify: 'esbuild',
    target: 'es2015',
    
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb
  },
  
  // Development server optimizations
  server: {
    // Enable HMR
    hmr: true,
    // Optimize dependencies
    fs: {
      strict: false,
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'react-hot-toast',
      '@mui/material',
      'react-icons',
    ],
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
  build: {
    sourcemap: false,
  },
  esbuild: {
    sourcemap: false,
  }
});
