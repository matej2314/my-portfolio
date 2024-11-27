/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'content': '95vh',
      },
      width: {
        'content': '95vw',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      screens: {
        ...defaultTheme.screens,
        indirect: '450px',     
      },
    },
  },
  plugins: [],
};
