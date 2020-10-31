const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    container: {
      center: true
    },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    extend: {
        colors: {
            'blue': '#1DA1F2',
            'darkblue': '#2795D9',
            'lightblue': '#EFF9FF',
            'dark': '#657786',
            'light': '#AAB8C2',
            'lighter': '#E1E8ED',
            'lightest': '#F5F8FA',
        }
    },
  },
  variants: {},
  plugins: [],
};