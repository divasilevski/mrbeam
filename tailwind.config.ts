import type { Config } from 'tailwindcss'
import colors from './constants/palette'
import layout from './constants/layout'

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],

  theme: {
    extend: {
      height: {
        canvas: `${layout.canvasHeight}px`,
        header: `${layout.headerHeight}px`,
      },
      colors: {
        background: colors.background,
        error: colors.error,

        primaryDark: colors.primaryDark,
        primary: colors.primary,
        primaryLight: colors.primaryLight,

        tertiary: colors.tertiary,
        tertiaryLight: colors.tertiaryLight,

        accent: colors.accent,
        secondary: colors.secondary,
        complementary: colors.complementary,
      },
      boxShadow: {
        bottomSheet: '0px -2px 20px -12px rgba(0,0,0,0.4)',
      },
    },
  },
}
