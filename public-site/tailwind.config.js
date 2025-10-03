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
        'primary': '#000',
        'accent': '#2B6CB0',
        'navBackground':'#E2DFD0',
        'footBackground':'#E2DFD0',
        'logocolor1':'#f16a09',
        'logocolor2':'#ff5683',
        'background': '#FAF8F1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}