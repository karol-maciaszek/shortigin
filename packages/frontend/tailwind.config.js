/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['serif'],
    },
  },
  plugins: [],
};
