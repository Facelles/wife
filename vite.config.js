import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/wife/',
  build: {
    outDir: './',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/database'],
          'chart': ['chart.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
