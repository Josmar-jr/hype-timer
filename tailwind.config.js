/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '940px',
    },
    extend: {},
    fontFamily: {
      body: ['"Inter"'],
      mono: ['"Rajdhani"', '"sans-serif"'],
    },
    colors: {
      red: colors.red,
      violet: colors.violet,
      transparent: colors.transparent,
      green: colors.green,
      emerald: colors.emerald,
      gray: {
        800: '#1C1C1C',
        700: '#232323',
        600: '#282828',
        500: '#2e2e2e',
        400: '#343434',
        300: '#505050',
        200: '#7e7e7e',
        150: '#a0a0a0',
        100: '#ededed',
      },
    },
  },
  plugins: [],
}
