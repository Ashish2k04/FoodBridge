/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#059669', // emerald-600
          light: '#34D399', // emerald-400
        },
        dark: {
          DEFAULT: '#111827', // gray-900
          card: '#1F2937', // gray-800
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
