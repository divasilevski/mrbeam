import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        primary: '#0284c7',
        canvas: '#f2f7f2',
      },
    },
  },
}
