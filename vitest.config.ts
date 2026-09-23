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
    threads: false,
    coverage: {
      reportsDirectory: './tests/coverage',
    },
    projects: [
      {
        test: {
          name: 'tests',
          environment: 'jsdom',
          include: ['./tests/**/*.spec.ts'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './app/'),
      '@': path.resolve(import.meta.dirname, './app/'),
    },
  },
})
