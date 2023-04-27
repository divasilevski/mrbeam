import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        primary: '#0284c7',
      },
    },
  },
}
