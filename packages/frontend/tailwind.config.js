/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      green: {
        100: '#DBF6EA',
        500: '#71C09D',
        600: '#59B18A',
        700: '#5BB28C',
      },
      blue: {
        100: '#F5F8FF',
        200: '#E8F6FD',
        300: '#8AD1F5',
        600: '#45798E',
        700: '#106C9C',
        900: '#12323F',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
      red: {
        500: '#EF7790',
        600: '#EC617E',
        700: '#DE5471',
        800: '#DD5471',
      },
      black: '#000000',
      border: '#448199',
      yellow: {
        600: '#FFD028',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['serif'],
    },
  },
  plugins: [],
}
