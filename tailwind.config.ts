import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],

  theme: {
    extend: {
      height: {
        canvas: '198px',
      },
      colors: {
        bg: '#ffffff',
        primary: '#33475b',
        accent: '#3b82f6',
        'accent-dark': '#2876f5',
        secondary: '#b1cefb',
        'secondary-light': '#e9eef6',
        error: '#ff3333',
      },
      boxShadow: {
        bottomSheet: '0px -2px 20px -12px rgba(0,0,0,0.4)',
      },
    },
  },
}
