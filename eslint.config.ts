import withNuxt from './.nuxt/eslint.config.mjs'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off', // Отключаем правило для односложных имен компонентов
      'vue/no-v-html': 'off',
      'no-new': 'off', // Конфликт с классами paper
    },
  },
  // Overrides для конкретных файлов, как в старом конфиге
  {
    files: ['types/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  prettierPluginRecommended,
)
