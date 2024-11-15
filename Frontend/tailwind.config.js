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
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
        },
        backgroundImage: {
          'contact-image' : "url('src/assets/contact-bg.jpg')",
        },
       
      },
    },
    plugins: [],
  }