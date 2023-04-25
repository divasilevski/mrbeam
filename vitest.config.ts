import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: './tests/auto-imports.d.ts',
      imports: ['vitest', 'vue', 'vue-router'],
    }),
  ],
  test: {
    environmentMatchGlobs: [['./tests/**', 'jsdom']],
    coverage: {
      reportsDirectory: './tests/coverage',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './'),
    },
  },
})
