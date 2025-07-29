/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f1f1f',   // Dark Gray
        secondary: '#fca311', // Light Orange
      },
    },
  },
  plugins: [],
}
