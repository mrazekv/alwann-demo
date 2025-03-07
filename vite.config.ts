import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url' 
import path from 'path';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
    build: {
      rollupOptions: {
        // https://rollupjs.org/configuration-options/
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      }
    },
    base: "./",
  })

