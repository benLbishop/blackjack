const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
        height: {
            '1/3': '33.33333%'
        },
        colors: {
            red: {
                ...colors.red,
                'opaque': 'rgba(96,40,40,0.25)',
            },
            green: {
                ...colors.green,
                'opaque': 'rgba(28,73,47,0.25)'
            }
        }
    },
  },
  variants: {},
  plugins: [],
}
