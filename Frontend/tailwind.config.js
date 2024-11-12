/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        height: {
          'content' : '95vh'
        },
        width: {
          'content' : '95vw'
        },
        boxShadow: {
          'portfolio-image' : '0px 14px 28px -11px rgba(66, 68, 90, 1)'
        },
        colors: {
          'bright-red': '	#DC143C'
        },
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }