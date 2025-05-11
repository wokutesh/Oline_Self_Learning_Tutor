/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'k12-blue': '#0066CC',
        'k12-dark-blue': '#004C99',
        'k12-light-blue': '#E6F0F9',
        'k12-yellow': '#FFB81C',
        'k12-orange': '#FF6B00',
        'k12-green': '#4CAF50',
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

