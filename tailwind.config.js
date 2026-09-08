/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'Sarabun', 'sans-serif'],
      },
      colors: {
        swu: {
          light: '#fdf2f2',
          DEFAULT: '#e02424',
          dark: '#9b1c1c',
        },
        ku: {
          light: '#f0fdf4',
          DEFAULT: '#057a55',
          dark: '#03543f',
        },
        tu: {
          light: '#fffbeb',
          DEFAULT: '#d97706',
          dark: '#92400e',
        },
        su: {
          light: '#eff6ff',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        }
      }
    },
  },
  plugins: [],
}
