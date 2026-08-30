/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        sans: ['var(--bs-font-sans-serif)', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary-color1)',
        title: 'var(--title-color)',
        body: 'var(--text-color)',
        black2: 'var(--black-color2)',
      }
    },
  },
  plugins: [],
}
