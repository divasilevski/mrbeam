import withNuxt from './.nuxt/eslint.config.mjs'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      'vue/no-v-html': 'off',
      'no-new': 'off', // Conflicts with paper classes
    },
  },
  // Per-file overrides, as in the old config
  {
    files: ['types/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  prettierPluginRecommended,
)
