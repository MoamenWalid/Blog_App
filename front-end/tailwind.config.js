/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: 'var(--white-color)',
        gray: 'var(--gray-color)',
        dark: 'var(--dark-color)',
        black: 'var(--black-color)',
        blue: 'var(--blue-color)',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl' : '1400px'
      },
      fontFamily: {
        workSans: ["Work Sans", 'sans-serif']
      }
    },
  },
  plugins: [],
}

