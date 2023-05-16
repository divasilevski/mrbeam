import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],

  theme: {
    extend: {
      height: {
        canvas: '150px',
      },
      colors: {
        primary: '#0284c7',
        secondary: '#ccc',
      },
      boxShadow: {
        bottomSheet: '0px -2px 20px -12px rgba(0,0,0,0.4)',
      },
    },
  },
}
