const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      deepblue: '#0A2540',
      electricblue: '#007BFF',
      coolgray: '#B0BEC5',
      neoncyan: '#00E0FF',
      darkslate: '#1B1F24',
      black: '#000000',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['serif'],
    },
    textShadow: {
      sm: '0 0 20px var(--tw-shadow-color)',
      xl: '0 0 40px var(--tw-shadow-color)',
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') }
      )
    }),
  ],
};
