/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#00C853', // The bright green from the screenshot
          darkGreen: '#2E7D32',
          blue: '#2196F3', // The blue from the screenshot
          yellow: '#FFEB3B', // The yellow from the screenshot
          bg: '#eef2f6', // Light gray background
        }
      }
    },
  },
  plugins: [],
}
