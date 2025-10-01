/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        'primary': '#E7F2EF',
        'accent': '#2B6CB0',
        'navBackground':'#000',
        'logocolor1':'#f16a09',
        'logocolor2':'#ff5683',
        'footBackground':'#1A1A1D',
        'background': '#FAF8F1',
        'background2': '#1A1A1D',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}