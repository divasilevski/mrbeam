import type { Config } from 'tailwindcss'
import constants from './constants'

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],

  theme: {
    extend: {
      height: {
        canvas: `${constants.canvasHeight}px`,
        header: `${constants.headerHeight}px`,
      },
      colors: {
        background: constants.background,
        error: constants.error,

        primaryDark: constants.primaryDark,
        primary: constants.primary,
        primaryLight: constants.primaryLight,

        tertiary: constants.tertiary,
        tertiaryLight: constants.tertiaryLight,

        accent: constants.accent,
        secondary: constants.secondary,
        complementary: constants.complementary,
      },
      boxShadow: {
        bottomSheet: '0px -2px 20px -12px rgba(0,0,0,0.4)',
      },
    },
  },
}
