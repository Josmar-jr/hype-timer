/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      body: ['"Roboto"'],
    },
    colors: {
      red: colors.red,
      violet: colors.violet,
      transparent: colors.transparent,
      gray: {
        800: '#1C1C1C',
        700: '#232323',
        600: '#282828',
        500: '#2e2e2e',
        400: '#343434',
        300: '#505050',
        200: '#7e7e7e',
        100: '#ededed',
      },
    },
  },
  plugins: [],
}
