/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'persian-green': '#00A693', // Persian Green hex code
      },
    },
  },
  plugins:[require("tailwind-scrollbar-hide")],

}
