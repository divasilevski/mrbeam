import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: './tests/auto-imports.d.ts',
      imports: [
        'vitest',
        'vue',
        'vue-router',
        {
          // UI components rely on Nuxt auto-imports: list every VueUse
          // composable they use, otherwise specs fail on an undefined global.
          '@vueuse/core': [
            'onClickOutside',
            'useResizeObserver',
            'useWindowSize',
            'useDraggable',
          ],
        },
      ],
    }),
  ],
  test: {
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
      // Mirrors the Nuxt layer alias; keep in sync with layers/ui.
      '#layers/ui': path.resolve(import.meta.dirname, './layers/ui/'),
    },
  },
})
