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
        'white-gray': 'var(--white-gray)',
        gray: 'var(--gray-color)',
        dark: 'var(--dark-color)',
        black: 'var(--black-color)',
        blue: 'var(--blue-color)',
      },
      screens: {
        xsm: '350px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl' : '1400px'
      },
      fontFamily: {
        workSans: ["Work Sans", 'sans-serif'],
        rajdhani: ["Rajdhani", 'sans-serif']
      }
    },
  },
  plugins: [],
}

